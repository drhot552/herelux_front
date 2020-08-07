import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('../page/Login.vue');
const MainNavbar = () => import('../layout/MainNavbar.vue');

Vue.use(Router)

//Named Vue
const router = new Router({
  mode:'history',
  routes:[
    {
      path:'/',
      name:'Login',
      components:{default:Login, header:MainNavbar},
      props:{
        header:{colorOnScroll:0,pageName:"Login"}
      }
    }
  ]
})

export default router;
