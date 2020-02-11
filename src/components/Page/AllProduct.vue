<template>
  <div>
    <div class="section" style="padding:51px 0;">
      <div class="container" style="padding-left: 0px; padding-right: 0px;">

        <ul class="product_tabs" ref="tabbar">
           <div class="tabitem" :class="index === productlistActivetab ? 'active' : ''"  v-for="(tab, index) in items" @click="switchtab(index)" :key="index" ref="tab">
             {{tab.descript}}
           </div>
           <div class="slider" :style="'transform:translateX('+productlistActivetab*tabwidth+'px)'">
           </div>
         </ul>
        <div ref="tcon" class="tabcontainer">
          <div style="border-bottom: 3px solid rgb(0,0,0); height:50px; margin-left:15px; margin-right:15px;">
            <h6 style="float:right; margin-top:15px; margin-right:15px;">
              <a v-if="this.category_middle.length > 0" v-on:click="popup()">
                <img src="/public/img/btn_filter.png" style="height:18px;"/>
                <b>필터링</b>
              </a>
            </h6>

          </div>
          <div style="text-align:right; margin-right:30px; margin-bottom:20px;">

          </div>
          <transition :name="transition" v-for="(tab, index) in items" :key="index">
             <div class="tabpane_product" v-if="index === productlistActivetab">
               <AllProductCard>
               </AllProductCard>
             </div>
          </transition>
        </div>
      </div>
    </div>
    <modal :show.sync="modalShow" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up"></h4>
      <div class="modal-view">
        <div style="text-align:center; border-bottom:1px solid hsla(0,0%,53%,.3); padding:5px;" v-for="item in category_middle">
          <a v-on:click="categorySelect(item.minor_key, item.descript)">{{item.descript}}</a>
        </div>
      </div>
    </modal>
    <loading :active.sync="this.$store.state.isLoading"
              :can-cancel="true"
              :is-full-page="true"
              :z-index="1060">
    </loading>
  </div>
</template>

<script>
import AllProductCard from '../Card/AllProductCard';
import Modal from '../Component/Modal';
import { code } from '../../api';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default{
  props:{
    item:Array
  },
  components:{
    AllProductCard,
    Modal,
    Loading
  },
  data() {
    return {
      transition: "slide-next",
      productlistActivetab: 0,
      tabwidth: 90,
      data: 0,
      items:[],
      initialX : null,
      initialY : null,
      modalShow: false,
      category_middle:[],
      subject : "전체",
      categoryId : 0,
      pageType : ''
    }
  },
  watch: {
      '$route' (to, from) {
        if(to.path !== from.path) {
          if(from.path.match(/detail/gi)){

          } else if(from.path.match(/allproduct/gi)){

          } else {
            this.tabwidth = 90
            this.data = 0
            this.productlistActivetab = 0
            this.subject ='전체'
            this.categoryId = 0
            this.items = []
            this.pageType = to.params.pagetype
            this.categoryId = to.params.id
            this.allproductInit()
            //this.rankfetch();
          }
        }
      }
  },
 created(){
   this.pageType = this.$route.params.pagetype;
   this.categoryId = this.$route.params.id;
   this.allproductInit();
 },
 activated(){
  this.$refs.tabbar.style.setProperty('--tabwidth', this.tabwidth+'px')
  document.addEventListener('touchstart', this.startproductTouch, false);
  document.addEventListener('touchmove', this.moveproductTouch, false);
  document.addEventListener('scroll', this.onScroll);
 },
 deactivated() {
   document.removeEventListener('touchstart', this.startproductTouch, false);
   document.removeEventListener('touchmove', this.moveproductTouch, false);
   document.removeEventListener('scroll', this.onScroll);
 },
 mounted(){
  this.$refs.tabbar.style.setProperty('--tabwidth', this.tabwidth+'px')
  document.addEventListener('touchstart', this.startproductTouch, false);
  document.addEventListener('touchmove', this.moveproductTouch, false);
  document.addEventListener('scroll', this.onScroll);
 },
 beforeDestroy () {
   document.removeEventListener('touchstart', this.startproductTouch, false);
   document.removeEventListener('touchmove', this.moveproductTouch, false);
   document.removeEventListener('scroll', this.onScroll);
 },
 computed:{
   pointer(){
      if(window.PointerEvent) return true
      else return false
   }
 },
 methods: {
   allproductInit(){
     this.productlistActivetab = this.$store.state.productList_category;
     if(this.pageType == 'search'){
       this.$store.state.productList_category = this.categoryId;
       this.productlistActivetab = this.$store.state.productList_category;
     }

     this.$store.commit('ISLOADING', true);
     this.$store.commit('SET_PRODUCTLIST_INIT');
     //전체가져오기
     code.category(2).then(data=>{
       if(data.length == 0){

       }
       else{
         this.items = data;
         this.fetch();
         this.categoryMiddle();
       }
       this.$store.commit('ISLOADING', false);
     }).catch(error =>{
       console.log("error",error);
       //alert 후 페이지 이동
       this.errorAlert();
     });
   },
  startproductTouch(e) {
   this.initialX = e.touches[0].clientX;
   this.initialY = e.touches[0].clientY;
  },
  moveproductTouch(e) {
    if (this.initialX === null) {
      return;
    }

    if (this.initialY === null) {
      return;
    }

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = this.initialX - currentX;
    var diffY = this.initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // sliding horizontally
      if (diffX > 0) {
        // swiped left
        if(this.productlistActivetab == undefined)
        {
        }
        else if(this.productlistActivetab >= 0 && this.productlistActivetab < this.items.length - 1)
        {
          this.switchtab(this.productlistActivetab + 1);
          if(this.productlistActivetab == 0){
          }
        }
        else{
        }
      } else {
        // swiped right
        if(this.productlistActivetab == undefined)
        {
          this.switchtab(1);
        }
        else if(this.productlistActivetab >= 1)
        {
          this.switchtab(this.productlistActivetab - 1);
          if(this.productlistActivetab == 0){
            //this.switchtab(0);
          }
        }
        else{
        }
      }
    } else {
      // sliding vertically
      if (diffY > 0) {
        // swiped up
      } else {
        // swiped down
      }
    }

    this.initialX = null;
    this.initialY = null;
  },
  productmoveTouch(direction) {
    if(Math.abs(direction.deltaX) >  Math.abs(direction.deltaY)) {
       if(direction.deltaX < direction.deltaY){
         if(this.productlistActivetab == undefined)
         {
         }
         else if(this.productlistActivetab >= 0 && this.productlistActivetab < this.items.length - 1)
         {
           this.switchtab(this.productlistActivetab + 1);
           if(this.productlistActivetab== 0){
           }
         }
         else{
         }
       }
       else if (direction.deltaX > direction.deltaY){
         if(this.productlistActivetab == undefined)
         {
           this.switchtab(1);
         }
         else if(this.productlistActivetab >= 1)
         {
           this.switchtab(this.productlistActivetab - 1);
           if(this.productlistActivetab == 0){
             //this.switchtab(0);
           }
         }
         else{
           //this.switchtab(0);
         }
       }
     }
  },
   switchtab(n){
      let scroll, scond

      if(this.productlistActivetab > n){
        this.transition = "slide-prev"
         scroll = n-1
        if(scond && this.$refs.tab[scroll])
          this.$refs.tab[scroll].scrollIntoView({behavior:'smooth'})
      }else  if(this.productlistActivetab < n){
         this.transition = "slide-next"
         scroll = n+1
      }
      scond = scroll>=0 && scroll < this.items.length

      if(scond && this.$refs.tab[scroll])
        this.$refs.tab[scroll].scrollIntoView({behavior:'smooth'})

      this.$nextTick(function() {
      	this.productlistActivetab = n
        this.subject = this.items[n].descript;

        this.data = n;
        this.$store.state.productList_category = n;

        this.fetch();
        this.categoryMiddle();
      })
    },
    fetch(){
      // 카테고리 타입이 1이면 대 카테고리로 set한다

      this.$store.state.productList_category_type = 1;
      this.$store.commit('SET_PRODUCTLIST_INIT');
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_ALLPRODUCT_LIST_READMORE',{category_type:this.$store.state.productList_category_type, category:this.$store.state.productList_category});
      // console.log(this.$store.state.readFlag)
    },
    categorySelect(key, descript){
      // 카테고리 타입이 2이면 부카테고리로 set한다
      this.subject = descript;
      this.$store.state.productList_category_type = 2;
      this.$store.state.productList_category = key;
      this.$store.commit('SET_PRODUCTLIST_INIT');
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_ALLPRODUCT_LIST_READMORE',{category_type:this.$store.state.productList_category_type, category:this.$store.state.productList_category});
      this.modalShow = false;
    },
    categoryMiddle(){
      //category key = 1
      var idx = 0;
      this.category_middle = [];
      if(this.data != 0){
        idx = (this.data * 10) + 1;
      }
      else
      {
        idx = 99;
      }
      this.$store.commit('ISLOADING', true);
      code.category(idx).then(result=>{
        if(result.length == 0){

        }
        else{
          this.category_middle = result;
        //  this.modalShow = true;
        //  this.$refs['modal-category'].show()
        }
        this.$store.commit('ISLOADING', false);
      }).catch(error =>{
        console.log("error",error);
        //alert 후 페이지 이동
      });
    },
    popup(){
        this.modalShow = true;
    },
    onScroll () {
      if (Math.round( $(window).scrollTop()) == $(document).height() - $(window).height() && this.$store.state.productList_readFlag) {
        this.$store.commit('ISLOADING', true);
        this.$store.dispatch('FETCH_ALLPRODUCT_LIST_READMORE',{category_type:this.$store.state.productList_category_type, category:this.$store.state.productList_category});
      }
    }
 }
}
</script>

<style>
.slide-next-leave-active, .slide-next-enter-active, .slide-prev-enter-active, .slide-prev-leave-active {
}
.slide-next-enter,.slide-next-leave, .slide-prev-leave-to
{
}

.slide-next-leave-to, .slide-prev-enter, .slide-prev-leave {
}
.product_tabs{
  display:flex;
  color: #f1f1f1;
  height:48px;
  width:100%;
  overflow-x:scroll;
  white-space:nowrap;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  z-index: 1;
  position:fixed;
  padding:0;
}
.tabs::-webkit-scrollbar  {
width: 0 !important;
height:0 !important;
}
.tabitem{
  display:flex;
  background:black;
  align-items:center;
  justify-content:center;
  min-width:var(--tabwidth);
  cursor:pointer;
  font-size:14px;
}
.tabitem.active{
  font-weight: 500;
  background:black;
  color: white;
}
.slider{
  position:absolute;
  bottom:0px;
  height:2px;
  width:var(--tabwidth);
  background:white;
  transition:.5s ease;
}
.tabcontainer {
  height:480px;
  position: relative;
  min-height: 100%;
  width: 100%;
  z-index: 0;
  padding-top:47px;
  touch-action: pan-y !important;
}
.tabpane_product{
    position: absolute;
    width: 100%;
    align-items:center;
    justify-content:center;
}
.modal-view{
  width: 100%;
  height: 200px;
  overflow-y: scroll;
}
</style>
