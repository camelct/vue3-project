import axios from "axios";

import { baseURL } from "../configs/env";
import { APICODE } from "../configs/constData";
// import { generateHeaderParams } from "./signature";

const ajax = axios.create({
  baseURL,
  responseType: "json",
  timeout: 1000 * 20,
});
ajax.defaults.withCredentials = true;

const queue = [];
const cancelToken = axios.CancelToken;
// 拼接请求的url和方法，同样的url+方法可以视为相同的请求
const token = config => {
  return `${config.url}_${config.method}`;
};

// 中断重复的请求，并从队列中移除
const removeQueue = config => {
  for (let i = 0, size = queue.length; i < size; i++) {
    const task = queue[i] || {};
    if (task.token === token(config)) {
      task.cancel();
      queue.splice(i, 1);
    }
  }
};

//添加请求拦截器
ajax.interceptors.request.use(
  config => {
    config.headers = {
      ...config.headers,
      // ...generateHeaderParams(),
    };

    removeQueue(config); // 中断之前的同名请求
    // 添加cancelToken
    config.cancelToken = new cancelToken(c => {
      queue.push({ token: token(config), cancel: c });
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

/**
 * 拦截网络响应，处理网络错误，未认证等错误
 */
ajax.interceptors.response.use(
  response => {
    removeQueue(response.config);

    const { code } = response.data;
    if (code === APICODE.USER_INVALID_IDENTITY) {
      return toRegict({
        code: APICODE.USER_INVALID_IDENTITY,
        message: "身份验证失败，请重新登录！",
      });
    } else {
      return response;
    }
  },
  error => {
    let errorObj = {};
    if (/401$/.test(error)) {
      return toRegict({
        code: APICODE.TOKEN_EXPIRY,
        message: "您的账号已过期，请重新登录！",
      });
    }

    if (/404$/.test(error)) {
      errorObj = {
        type: "error",
        content: "您请求的接口已关闭！",
      };
    }

    if (/Network Error$/.test(error)) {
      errorObj = {
        type: "error",
        content: "请检查您当前网络状态是否连接！",
      };
    }

    if (/timeout/.test(error)) {
      errorObj = {
        type: "error",
        content: "您的请求已超时，请检查网络，稍后再试！",
      };
    }

    console.log("errorObj", errorObj);
    return Promise.reject(error);
  },
);

const toRegict = ({ code, message }) => {
  // window.location.href = baseURL;
  return {
    data: {
      code,
      message,
    },
  };
};

export default ajax;
