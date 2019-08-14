import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/util/auth';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的baseUrl
  timeout: 5000, // 请求超时时间
});

// request 请求拦截器
service.interceptors.request.use((config) => {
  // 在发送请求前做什么
  // 可以自定义一些config配置
  // loading + 1
  if (store.getters.token) {
    // eslint-disable-next-line no-param-reassign
    config.headers['X-Token'] = getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  store.dispatch('SetLoading', true);
  return config;
}, (error) => {
  // 对请求错误做些什么
  // loading 清 0
  setTimeout(() => {
    store.dispatch('SetLoading', 0);
  }, 300);
  return Promise.reject(error);
});

// response 响应拦截器
service.interceptors.response.use((response) => {
  // 添加响应拦截器
  const res = response.data;
  // 这里处理一些response 正常放回时的逻辑
  // loading - 1
  store.dispatch('SetLoading', false);
  return res;
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
}, (error) => {
  // 这里处理一些response 出错时的逻辑
  // loading - 1
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000,
  });
  store.dispatch('SetLoading', false);
  return Promise.reject(error);
});

export default service;
