const u = navigator.userAgent;
export const isAndroid = () => {
  return (
    u.indexOf("android") > -1 ||
    u.indexOf("Adr") > -1 ||
    u.indexOf("Android") > -1
  );
};

export const isIOS = () => {
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};

export const printLog = (params, is_alert = false) => {
  if (is_alert) alert(JSON.stringify(params));
};

export const checkDebug = (sdk) => {
  return "undefined" !== typeof sdk.apiConfig.debug &&
    sdk.apiConfig.debug === true
    ? true
    : false;
};

export const isFunction = (p) => {
  return Object.prototype.toString.call(p) === "[object Function]";
};
