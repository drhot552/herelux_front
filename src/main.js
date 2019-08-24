import Vue from 'vue'
import App from './App.vue'
import router from './router'
import NowUIKit from './plugins/now-ui-kit'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import VueUp from 'vueup'
import store from './store'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents)
Vue.use(VueUp)
Vue.use(VeeValidate)
Vue.use(NowUIKit)


Vue.prototype.$http = axios
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
