import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import '@/main.css'
import store from '@/store/index.js'
Vue.config.productionTip = false
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios
const token = localStorage.getItem('token')
Vue.prototype.$token = token
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
