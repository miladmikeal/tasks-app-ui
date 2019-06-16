import Vue from 'vue'
import axios from "axios"
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.headers.get['Accepts'] = "application/json";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(function (config) {
  let token = store.getters.getToken;

  if (token) {
    config.headers.common.Authorization = token;
  }

  return config;
}, function (err) {
  return Promise.reject(err);
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
