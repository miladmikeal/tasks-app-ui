"use strict";

import Vue from 'vue';
import axios from "axios";
import store from '../store';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = '';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.headers.common['X-Requested-With'] = 'XmlHttpRequest';

let config = {
  baseURL: "https://mikeal-tasks-manager.herokuapp.com/",
  timeout: 60 * 1000, // Timeout
  withCredentials: false, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let token = store.getters.getToken;

    if (token) {
      config.headers.common.Authorization = token;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    // let token = store.getters.getToken;

    // if (token) {
    //   response.headers = "application/json"
    // }
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
