import ajax from "./ajax";
import { APICODE } from "../configs/constData";
import { parseJSON2String } from "../configs/utils";
// import store from "../redux";
// import { toggleSpin } from "../redux/action/commonAction";

/**
 * url: string
 * json?: obj  post 必填
 * params?: obj get 必填
 * search?: obj get 可选
 * message?: string
 * isLoading?: true
 * successCb?:  func
 * customerError?: bool
 */
const request = async ({
  url,
  json = null,
  params = null,
  search = null,
  message,
  isLoading = true,
  successCb,
  customerNotice = false,
  hiddenNotice = false,
}) => {
  // isLoading && store.dispatch(toggleSpin(true));

  try {
    let resp = {};
    if (json) {
      resp = await ajax["post"](url, json);
    } else {
      const tempParams = parseJSON2String(
        {
          ...params,
          ...search,
        },
        "?",
      );

      const tempUrl = `${url}${tempParams}`;
      resp = await ajax["get"](tempUrl);
    }

    const { data } = resp;
    if (data.code !== APICODE.SUCCESS) throw data;
    successCb && successCb(data.data);

    // (!customerNotice || !hiddenNotice) &&
    //   message &&
    //   showNotification({
    //     description: message,
    //     type: "success",
    //   });

    // isLoading && store.dispatch(toggleSpin(false));
    if (customerNotice) return data;

    return data.data || true;
  } catch (err) {
    // isLoading && store.dispatch(toggleSpin(false));

    const { message: errmsg, code } = err;
    if (!errmsg) return;

    if (errmsg.toString() === "Cancel") return;

    const config = {
      description: errmsg,
      type: "error",
    };

    if (
      code === APICODE.USER_INVALID_IDENTITY ||
      code === APICODE.ACCOUNTOVERDUE
    ) {
      config.key = "dueDate";
    }

    if (customerNotice) return err;
    // showNotification(config);
    return false;
  }
};

export default request;
