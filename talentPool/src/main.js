import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from "./assets/js/api"
import './assets/css/base.css';
import './assets/css/public.scss';

Vue.use(ElementUI)


Vue.config.productionTip = false
Vue.prototype.$http = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
