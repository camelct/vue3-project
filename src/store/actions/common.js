import request from "../../request";
import api from "../api";

export const getTestList = () => async () => {
  const config = {
    url: api.test.a,
    successCb: data => {
      // console.log('dosometing', dosometing);
    },
  };

  return await request(config);
};
