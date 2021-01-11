export const judgeIsEmptyObj = obj => {
  if (!obj) return false;
  return JSON.stringify(obj) === "{}";
};

export const deSerialize = params => {
  return params
    .replace("?", "")
    .split("&")
    .reduce((cur, item) => {
      const [key, val] = item.split("=");
      return {
        ...cur,
        [key]: val,
      };
    }, {});
};

export const serialize = params => {
  return Object.keys(params)
    .sort()
    .map(key => {
      if (
        params[key] === undefined ||
        params[key] === null ||
        params[key] === ""
      )
        return "";
      return `${key}=${params[key]}`;
    })
    .filter(Boolean)
    .join("&");
};

// 转化为 params
export const parseJSON2String = (data, pre = "") => {
  if (!data || judgeIsEmptyObj(data)) return "";
  const serStr = serialize(data);
  return serStr ? `${pre}${serStr}` : "";
};
