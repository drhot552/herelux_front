import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NowUIKit from './plugins/now-ui-kit';

Vue.use(NowUIKit);
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
