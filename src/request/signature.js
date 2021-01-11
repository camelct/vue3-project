import md5 from "md5";

let authkey = "";
let platform = "";
platform = "center";
authkey = "*0C7SoxnU6101Wr@^mr&Obc06MPLWZjv";

const method = "md5";

export const serialize = params => {
  return Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join("&");
};

export const generateSignParams = (params = {}) => {
  params = Object.assign({}, params, {
    timestamp: Math.floor(Date.now() / 1000),
    platform,
  });

  let strForSign = serialize(params);
  let sign = md5(strForSign + authkey);
  return {
    sign,
    method,
    ...params,
  };
};

export const generateHeaderParams = () => {
  let createtime = Math.floor(Date.now() / 1000);
  let token = md5(authkey + createtime);
  return {
    token,
    platform,
    createtime,
  };
};

export const generateSignParamsStr = params => {
  return serialize(generateSignParams(params));
};
