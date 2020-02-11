import Vue from 'vue'
import App from './App.vue'
import router from './router'
import NowUIKit from './plugins/now-ui-kit'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import VueUp from 'vueup'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import Notifications from 'vue-notification'
import VueScroll from 'vue-scroll'
import AdFit from 'vue-adfit-component'
import Ripple from 'vue-ripple-directive'
import Ads from 'vue-google-adsense'

VueClipboard.config.autoSetContainer = true // add this line

Ripple.color = 'rgba(0, 0, 0, 0.1)';
Vue.directive('ripple', Ripple);

Vue.use(require('vue-script2')) 
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)
Vue.use(AdFit.Banner)
Vue.use(Notifications)
Vue.use(VueClipboard)
Vue.use(VueUp)
Vue.use(VeeValidate)
Vue.use(VueScroll)
Vue.use(NowUIKit)

/*
Vue.use(VueLazyload, {
  preLoad: 10,
  error: 'public/img/11st.png',
  loading: 'public/img/11st.png',
  attempt: 1,
  listenEvents: [ 'scroll' ]
})
*/
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
