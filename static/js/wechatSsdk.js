import axios from 'axios';

const onloadSsdk = (url) => {
  return new Promise((resolve, reject) => {
    let removeScript = function (scriptElement) {
      document.body.removeChild(scriptElement);
    }
    var scriptElement = document.createElement('script');
    document.body.appendChild(scriptElement);
    scriptElement.addEventListener('load', e => {
      removeScript(scriptElement);
      resolve(e);
    }, false);

    scriptElement.addEventListener('error', e => {
      removeScript(scriptElement);
      reject(e);
    }, false);
    scriptElement.src = url;
  });
}

const getSsdk = (data) => {
  return new Promise(async (resolve, reject) => {
    if (!(window.__wxjs_environment === 'miniprogram' || window.navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1 || window.navigator.wxuserAgent)) {
      //return reject('need wechat dev');
    }
    axios({
      method: 'GET',
      url: 'http://wx.sumsoar.com/api.php/wechat/index/getJssdk/wechat/1/?url=' + encodeURIComponent(window.location.href.split('#')[0])
    }).then(response => {
      let res = response.data;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: [ //需要使用的网页服务接口
          'checkJsApi', //判断当前客户端版本是否支持指定JS接口
          'scanQRCode',
        ]
      });
    })
    wx.ready(function () {
      wx.scanQRCode({
        needResult: 1,
        scanType: ["qrCode", "barCode"],
        success: function (res) {
          var result = JSON.parse(res.resultStr);
          if (result.code === 'mt') {
            var id = result.data.id;
            window.location.href = `/erp/#/meeting?id=${id}`;
          }
          return result;
        },
        fail: function (res) {
          console.log(res);
        }
      })
    });
  });
}


const getLocation = () => {
  return new Promise(async (resolve, reject) => {
    if (!(window.__wxjs_environment === 'miniprogram' || window.navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1 || window.navigator.wxuserAgent)) {
      //return reject('need wechat dev');
    }
    axios({
      method: 'GET',
      url: 'http://wx.sumsoar.com/api.php/wechat/index/getJssdk/wechat/1/?url=' + encodeURIComponent(window.location.href.split('#')[0])
    }).then(response => {
      let res = response.data;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: [ //需要使用的网页服务接口
          'getLocation'
        ]
      });
    })
    wx.ready(function () {
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          resolve(res);
        },
        cancel: function (res) {
          alert('用户拒绝授权获取地理位置');
        }
      });
    });
  });
}

export const wxSsdkOnload = (data) => {
  if (window.wx) {
    return getSsdk(data);
  }
  onloadSsdk("http://res.wx.qq.com/open/js/jweixin-1.3.0.js").then(res => {
    return getSsdk(data);
  });
}
export const getLocal = (callback) => {
  if (window.wx) {
    callback(getLocation());
  }
  onloadSsdk("http://res.wx.qq.com/open/js/jweixin-1.3.0.js").then(res => {
    callback(getLocation());
  });
}
