import '../assets/sass/now-ui-kit.scss';
import '../assets/sass/demo.scss';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import globalMixins from './globalMixins';
import globalDirectives from './globalDirectives';
import VueLazyload from 'vue-lazyload'

locale.use(lang);

export default {
    install(Vue) {
        Vue.use(globalMixins);
        Vue.use(globalDirectives);
        Vue.use(VueLazyload, {
          observer: true,
          // optional
          observerOptions: {
            rootMargin: '0px',
            threshold: 0.1,
            preLoad: 1.3,
          }
        });
    }
}
