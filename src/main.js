import Vue from 'vue'
import App from './App.vue'
import router from './router'
import NowUIKit from './plugins/now-ui-kit'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import VueUp from 'vueup'
import store from './store'
import { VueHammer } from 'vue2-hammer'
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true // add this line

Vue.use(VueClipboard)
Vue.use(VueHammer)
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
