import { isAndroid, isIOS } from "../utils";
export const initBridge = (callback) => {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  }

  if (isIOS()) {
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    const WVJBIframe = document.createElement("iframe");
    WVJBIframe.style.display = "none";
    WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  }
};

export const iniAndBridge = (callback) => {
  setTimeout(() => {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge);
    } else {
      document.addEventListener(
        "WebViewJavascriptBridgeReady",
        function () {
          callback(WebViewJavascriptBridge);
        },
        false
      );
    }
  }, 1);
};

export const bridgeRegisterHandler = (option) => {
  initBridge(function (bridge) {
    bridge.registerHandler(option.method, function (data, responseCallback) {
      if (option.callback) {
        option.callback(isAndroid() ? JSON.parse(data) : data);
      }
    });
  });
};

export const bridgeCallHandler = (option) => {
  initBridge(function (bridge) {
    try {
      bridge.callHandler(
        option.method,
        option.data || {},
        function (responseData) {
          if (option.callback) {
            option.callback(
              isAndroid() ? JSON.parse(responseData) : responseData
            );
          }
        }
      );
    } catch (e) {
      alert(e);
    }
  });
};

export const invoke = (option) => {
  option.data.method = option.method;
  initBridge(function (bridge) {
    bridge.callHandler("invoke", option.data || {}, function (responseData) {
      if (option.callback) {
        option.callback(isAndroid() ? JSON.parse(responseData) : responseData);
      }
    });

    bridge.registerHandler("invoke", function (data, responseCallback) {
      responseCallback(`tNative ${data}`);
    });
  });
};
