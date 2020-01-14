import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'

const Event = () => import('../components/Page/Event.vue');
const About = () => import('../components/About/About.vue');
const License = () => import('../components/About/License.vue');
const Service = () => import('../components/Service/Service.vue');
const Product = () => import('../components/Page/Product.vue');
const Contact = () => import('../components/About/Contact.vue');
const Responsibilty = () => import('../components/Service/Responsibilty.vue');
const Privacy = () => import('../components/Service/Privacy.vue');
const Login = () => import('../components/Page/Login.vue');
const MainNavbar = () => import('../components/Layout/MainNavbar.vue');
const FooterNavbar = () => import('../components/Layout/FooterNavbar.vue');
const WriteNavbar = () => import('../components/Layout/WriteNavbar.vue');
const BoardNavbar = () => import('../components/Layout/BoardNavbar.vue');
const SearchNavbar = () => import('../components/Layout/SearchNavbar.vue');
const ProductNavbar = () => import('../components/Layout/ProductNavbar.vue');

const Home =() => import('../components/Page/Home.vue');
const MyList = () => import('../components/Page/MyList.vue');
const AllProduct = () => import('../components/Page/AllProduct.vue');
const Detail = () => import('../components/Page/ProductDetail.vue');
const Ranking = () => import('../components/Page/Ranking.vue');
const Board = () => import('../components/Page/Board.vue');
const Write = () => import('../components/Page/Write.vue');
const Register = () => import('../components/Page/Register.vue');
const Search = () => import('../components/Page/Search.vue');
const BoardDetail = () => import('../components/Page/BoardDetail.vue');
const Error = () => import('../components/Page/Error.vue');
const Ready = () => import('../components/Page/Ready.vue');
const Brand = () => import('../components/Page/Brand.vue');
const Withdrawal = () => import('../components/About/Withdrawal.vue');
const PasswordChg = () => import('../components/About/PasswordChg.vue');
const Callback = () => import('../components/Page/Callback.vue');

//테스트
const Test = () => import('../components/Test.vue');


//네비게이션 라우팅
const requireAuth = (to, from, next) =>{
  const isAuth = localStorage.getItem('token')
  const id  = localStorage.getItem('id')
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
  //토큰값이 있으면 라우팅수행 그렇지 않으면 로그인 경로로 바로 이동
  if(isAuth && id){
    next()
  } else {
    next(loginPath)
  }
}

Vue.use(Router)
//Named Vue
const router = new Router({
  mode:'history',
  routes:[
    {
      path:'/',
      name:'Home',
      components:{default:Home, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0,pageName:"Home"},
        footer:{pageName:"Home"}
      }
    },
    {
      path: '/event',
      name: 'Event',
      components: {default:Event, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0, pageName:"Event"}
      }
    },
    {
      path:'/about',
      name:'About',
      components:{default:About, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0,pageName:"About"}
      }
    },
    {
      path:'/contact',
      name:'Contact',
      components:{default:Contact, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0,pageName:"Contact"}
      }
    },
    {
      path:'/license',
      name:'License',
      components:{default:License, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0, pageName:"License"}
      }
    },
    {
      path:'/service',
      name:'Service',
      components:{default:Service, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0, pageName:"Service"}
      }
    },
    {
      path:'/privacy',
      name:'Privacy',
      components:{default:Privacy, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0, pageName:"Privacy"}
      }
    },
    {
      path:'/responsibilty',
      name:'Responsibilty',
      components:{default:Responsibilty, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0, pageName:"Responsibilty"}
      }
    },
    {
      path:'/product',
      name:'Product',
      components:{default:Product, header:MainNavbar, footer:FooterNavbar},
      beforeEnter:requireAuth,
      props:{
        header:{colorOnScroll:0},
        footer:{pageName:"Product", pageName:"Product"}
      }
    },
    {
      path:'/login',
      name:'Login',
      components:{default:Login, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0, pageName:"Login"}
      }
    },
    {
      path:'/register',
      name:'Register',
      components:{default:Register, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0, pageName:"Register"}
      }
    },
    {
      path:'/mylist/:pagetype',
      name:'MyList',
      components:{default:MyList, header:MainNavbar, footer:FooterNavbar},
      beforeEnter:requireAuth,
      props:{
        header:{colorOnScroll:0, pageName:"MyList"},
        footer:{pageName:"MyList"}
      }
    },
    {
      path:'/detail/:id/:pagetype',
      name:'Detail',
      components:{default:Detail, header:ProductNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0, pageName:"Detail"}
      }
    },
    {
      path:'/ranking',
      name:'Ranking',
      components:{default:Ranking, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0, pageName:"Ranking"},
        footer:{pageName:"Rank"}
      }
    },
    {
      path:'/board',
      name:'Board',
      components:{default:Board, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0, pageName:"Board"},
        footer:{pageName:"Board"}
      }
    },
    {
      path:'/boarddetail/:board_idx/:pagetype',
      name:'BoardDetail',
      components:{default:BoardDetail, header:BoardNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0, pageName:"BoardDetail"}
      }
    },
    {
      path:'/write',
      name:'Write',
      components:{default:Write, header:WriteNavbar, footer:FooterNavbar},
      beforeEnter:requireAuth,
      props:{
        header:{colorOnScroll:0,pageName:"Write"}
      }
    },
    {
      path:'/search/:word',
      name:'Search',
      components:{default:Search, header:SearchNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0,pageName:"Search"}
      }
    },
    {
      path:'/error',
      name:'Error',
      components:{default:Error, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0,pageName:"Error"}
      }
    },
    {
      path:'/test',
      name:'Test',
      components:{default:Test, header:MainNavbar, footer:FooterNavbar},
      beforeEnter:requireAuth,
      props:{
        header:{colorOnScroll:0,pageName:"Test"}
      }
    },
    {
      path:'/ready',
      name:'Ready',
      components:{default:Ready, header:MainNavbar, footer:FooterNavbar},
      beforeEnter:requireAuth,
      props:{
        header:{colorOnScroll:0,pageName:"Ready"}
      }
    },
    {
      path:'/brand/:brand_id',
      name:'Brand',
      components:{default:Brand, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0,pageName:"Brand"}
      }
    },
    {
      path:'/withdrawal',
      name:'Withdrawal',
      components:{default:Withdrawal, header:MainNavbar, footer:FooterNavbar},
      beforeEnter:requireAuth,
      props:{
        header:{colorOnScroll:0,pageName:"Withdrawal"}
      }
    },
    {
      path:'/passwordchg',
      name:'PasswordChg',
      components:{default:PasswordChg, header:MainNavbar, footer:FooterNavbar},
      beforeEnter:requireAuth,
      props:{
        header:{colorOnScroll:0,pageName:"PasswordChg"}
      }
    },
    {
      path:'/callback',
      name:'Callback',
      components:{default:Callback, header:MainNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0,pageName:"Callback"}
      }
    },
    {
      path:'/allproduct/:pagetype',
      name:'AllProduct',
      components:{default:AllProduct, header:ProductNavbar, footer:FooterNavbar},
      props:{
        header:{colorOnScroll:0,pageName:"AllProduct"}
      }
    }
  ],
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  },
})

export default router;
