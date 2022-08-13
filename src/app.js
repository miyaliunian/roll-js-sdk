import { printLog, checkDebug, isFunction, isAndroid } from "./utils/index.js";
import {
  bridgeRegisterHandler,
  bridgeCallHandler,
  invoke,
  iniAndBridge,
} from "./lib/index.js";

if (isAndroid()) {
  iniAndBridge((bridge) => bridge.init());
}

const jssdk = {
  config: (params) => {
    const data = {
      debug: params?.debug ? params.debug : false,
      appid: params?.appid ? params.appid : "",
      timestamp: params?.timestamp ? params.timestamp : "",
      nonce: params?.nonce ? params.nonce : "",
      signType: params?.signType ? params.signType : "",
      sign: params?.sign ? params.sign : "",
      jsApiList: params?.jsApiList ? params.jsApiList : [],
    };
    jssdk.apiConfig = data;
    bridgeCallHandler({
      method: "jsApiConfig",
      data: data,
      callback: (responseData) => {
        if (checkDebug(jssdk)) printLog(responseData, true);
        if (responseData.errno) {
          if (isFunction(jssdk.readyFun)) {
            jssdk.readyFun();
          }
        } else {
          if (isFunction(jssdk.errorFun)) {
            jssdk.errorFun(responseData);
          }
        }
      },
    });
  },
  ready: (fun) => {
    jssdk.readyFun = fun;
  },
  error: (fun) => {
    jssdk.errorFun = fun;
  },
  uniteFaceVerify: (params) => {
    if (
      params?.pre_verify_id === undefined ||
      params.pre_verify_id === "" ||
      params.pre_verify_id === null
    ) {
      alert("预认证标识为空");
    }
    bridgeRegisterHandler({
      method: "successFaceVerify",
      callback: isFunction(params.success) ? params.success : (res) => {},
    });
    bridgeRegisterHandler({
      method: "failFaceVerify",
      callback: isFunction(params.fail) ? params.fail : (res) => {},
    });
    bridgeRegisterHandler({
      method: "cancelFaceVerify",
      callback: isFunction(params.cancel) ? params.cancel : (res) => {},
    });
    invoke({
      method: "uniteFaceVerify",
      data: {
        pre_verify_id: params.pre_verify_id,
      },
      callback: (responseData) => {},
    });
  },
  getUserToken: (params = {}) => {
    const callback = {
      success: isFunction(params.success) ? params.success : {},
      error: isFunction(params.error) ? params.error : {},
    };
    invoke({
      method: "getUserToken",
      data: {},
      callback: (responseData) => {
        if (checkDebug(jssdk)) printLog(responseData, true);
        if (responseData.errno) {
          if (callback.success) {
            callback.success(responseData);
          }
        } else {
          if (callback.error) {
            callback.error(responseData);
          }
        }
      },
    });
  },
  myczScan: (params = {}) => {
    bridgeRegisterHandler({
      method: "successScan",
      callback: isFunction(params.success) ? params.success : (res) => {},
    });
    bridgeRegisterHandler({
      method: "cancelScan",
      callback: isFunction(params.cancel) ? params.cancel : (res) => {},
    });
    invoke({
      method: "myczScan",
      data: {},
      callback: (responseData) => {
        if (checkDebug(jssdk)) printLog(responseData, true);
      },
    });
  },
  updateShareData: (params = {}) => {
    if (params.shareMenu === undefined) {
      const shareType = ["wxShare", "wxMomentsShare", "QQ", "QQZone"];
    } else if (params.shareMenu instanceof Array) {
      const shareType = params.shareMenu;
    } else {
      const shareType = [];
    }
    const shareParams = {
      shareType: shareType,
      title: params.title || document.title,
      desc: params.desc || "",
      link: params.link || location.href,
      icon: params.icon || "",
    };
    const callback = {
      success: isFunction(params.success) ? params.success : {},
      error: isFunction(params.error) ? params.error : {},
      cancel: isFunction(params.cancel) ? params.cancel : {},
    };
    invoke({
      method: "updateShareData",
      data: shareParams,
      callback: (responseData) => {
        if (checkDebug(jssdk)) printLog(responseData, true);
        if (responseData.errno) {
          if (callback.success) {
            callback.success(responseData);
          }
        } else {
          if (callback.error) {
            callback.error(responseData);
          }
        }
      },
    });
  },
  downloadFile: (params = {}) => {
    const callback = {
      error: isFunction(params.error) ? params.error : {},
    };
    if (params.url === undefined || params.url === "") {
      callback.error({
        errno: 10000,
        message: "链接无效",
      });
    }
    invoke({
      method: "downloadFile",
      data: params,
      callback: (responseData) => {
        if (checkDebug(jssdk)) printLog(responseData, true);
        if (responseData.errno) {
          if (callback.success) {
            callback.success(responseData);
          }
        } else {
          if (callback.error) {
            callback.error(responseData);
          }
        }
      },
    });
  },
  closeWebView: (params = {}) => {
    invoke({
      method: "closeWebView",
      data: {},
      callback: (responseData) => {
        if (checkDebug(jssdk)) printLog(responseData, true);
        if (responseData.errno) {
          if (callback.success) {
            callback.success(responseData);
          }
        } else {
          if (callback.error) {
            callback.error(responseData);
          }
        }
      },
    });
  },
  showPictures: (params) => {
    invoke({
      method: "showPictures",
      data: params,
    });
  },

  /*************************** 内部桥 ***************************/
  // 获取最近使用
  fetchUsedService: (params = {}) => {
    const callback = {
      success: isFunction(params.success) ? params.success : {},
      error: isFunction(params.error) ? params.error : {},
    };
    invoke({
      method: "fetchUsedService",
      data: params,
      callback: (responseData) => {
        if (responseData.errno) {
          if (callback.success) {
            callback.success(responseData);
          }
        } else {
          if (callback.error) {
            callback.error(responseData);
          }
        }
      },
    });
  },
  // 打开模态 **********************
  openModule: (params = {}) => {
    bridgeRegisterHandler({
      method: "successOpenModule",
      callback: isFunction(params.success) ? params.success : (res) => {},
    });
    bridgeRegisterHandler({
      method: "cancelOpenModule",
      callback: isFunction(params.cancel) ? params.cancel : (res) => {},
    });
    bridgeRegisterHandler({
      method: "errorOpenModule",
      callback: isFunction(params.error) ? params.error : (res) => {},
    });
    invoke({
      method: "openModule",
      data: params,
      callback: (responseData) => {},
    });
  },

  // 获取accessToken
  fetchAccessToken: (params = {}) => {
    const callback = {
      success: isFunction(params.success) ? params.success : {},
      error: isFunction(params.error) ? params.error : {},
    };
    invoke({
      method: "fetchAccessToken",
      data: params,
      callback: (responseData) => {
        if (responseData.errno) {
          if (callback.success) {
            callback.success(responseData);
          }
        } else {
          if (callback.error) {
            callback.error(responseData);
          }
        }
      },
    });
  },
};

export default jssdk;
