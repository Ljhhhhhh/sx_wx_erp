import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import {
  API_ADS
} from './config'
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
import store from '@/store'

const myAxios = axios.create({
  baseURL: API_ADS,
  // timeout: 50,
});
//设置全局的请求次数，请求的间隙
// myAxios.defaults.retry = 4;
// myAxios.defaults.retryDelay = 10;
// 请求的拦截器
myAxios.interceptors.request.use(function (config) {
  const token = store.getters.userinfo ? store.getters.userinfo.token : '';
  // 判断请求的类型
  // 如果是post请求就把默认参数拼到data里面
  // 如果是get请求就拼到params里面
  if (config.method === 'put' || config.method === 'post') {
    let data = qs.parse(config.data);
    config.data = qs.stringify({
      type:'wechat',
      token: token,
      ...data
    })
  } else if (config.method === 'get') {
    config.params = {
      type: 'wechat',
      token: token,
      ...config.params
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
myAxios.interceptors.response.use(function (response) {
  if (200 === response.status) {
    console.log('111111:', response);
    response = response.data;
    if (response.status !== 200) {
      // console.info('axios.config.js:',response)
    }
  } else {
    return Promise.reject(response)
  }
  return response;
  // let config = response.config;
  // // If config does not exist or the retry option is not set, reject
  // if (!config || !config.retry) {
  //   return Promise.reject(response)
  // }
  //
  // // Set the variable for keeping track of the retry count
  // config.__retryCount = config.__retryCount || 0;
  // // Check if we've maxed out the total number of retries
  // if (config.__retryCount >= config.retry) {
  //   // Reject with the error
  //   return Promise.reject(response);
  // }
  //
  // // Increase the retry count
  // config.__retryCount += 1;
  // // Create new promise to handle exponential backoff
  // let backoff = new Promise(function (resolve) {
  //   setTimeout(function () {
  //     resolve();
  //   }, config.retryDelay || 1);
  // });
  //
  // // Return the promise in which recalls axios to retry the request
  // return backoff.then(function () {
  //   // 对响应数据做点什么
  //
  // });

}, function (error) {
  Vue.$vux.toast.show({
    text: '网络请求错误,请刷新或稍后重试',
    type: 'warn'
  });
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default myAxios;
