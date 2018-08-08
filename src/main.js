import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import store from './store'
import router from './router'

import './styles/styles.scss';

axios.defaults.baseURL='http://localhost/javascript/vue/vuephpcrud'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
