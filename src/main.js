import Vue from 'vue'
import App from './App.vue'
import router from './router'
import NowUIKit from './plugins/now-ui-kit'
import axios from 'axios'
import VueUp from 'vueup'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import Notifications from 'vue-notification'
import VueScroll from 'vue-scroll'
import AdFit from 'vue-adfit-component'
import Ripple from 'vue-ripple-directive'
import Vue2TouchEvents from 'vue2-touch-events'
import VueImg from 'v-img';

const vueImgConfig = {
  // Use `alt` attribute as gallery slide title
  altAsTitle: false,
  // Display 'download' button near 'close' that opens source image in new tab
  sourceButton: false,
  // Event listener to open gallery will be applied to <img> element
  openOn: 'click',
  // Show thumbnails for all groups with more than 1 image
  thumbnails: false,
}

Vue.use(VueImg, vueImgConfig);
Vue.use(Vue2TouchEvents)
VueClipboard.config.autoSetContainer = true // add this line

Ripple.color = 'rgba(0, 0, 0, 0.1)';
Vue.directive('ripple', Ripple);

Vue.use(AdFit.Banner)
Vue.use(Notifications)
Vue.use(VueClipboard)
Vue.use(VueUp)
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
