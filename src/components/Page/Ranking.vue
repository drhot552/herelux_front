<template>
  <div>
    <div class="section" style="padding:51px 0;">
      <back-to-top bottom="20px" right="20px">
        <button type="button" class="goTop">
          <i class="fa fa-chevron-up"></i>
        </button>
      </back-to-top>
      <div class="container" style="padding-left:0px; padding-right:0px; padding-right:0px;">
        <ul class="tabs" ref="tabbar">
           <div class="tabitem" :class="index === activetab ? 'active' : ''"  v-for="(tab, index) in items" @click="switchtab(index)" :key="index" ref="tab">
             {{tab.descript}}
           </div>
           <div class="slider" :style="'transform:translateX('+activetab*tabwidth+'px)'">
           </div>
         </ul>
        <div ref="tcon" class="tabcontainer" >
          <div style="border-bottom: 3px solid rgb(0, 0, 0); height: 100px; margin-left: 15px; margin-right: 15px; padding-top: 50px;">
            <h5 style="float:left;">
              {{subject}}
            </h5>
            <h6 style="float: right; margin-top: 15px; margin-right: 15px;">
              <a v-if="this.category_middle.length > 0" v-on:click="popup()">
                <img src="/public/img/btn_filter.png" style="height:18px;"/>
                <b>필터링</b>
              </a>
            </h6>
          </div>
          <transition :name="transition" v-for="(tab, index) in items" :key="index">
             <div class="tabpane" v-if="index === activetab">
               <RankingCard v-bind:category_type="category_type">
               </RankingCard>
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
    <!-- loading -->
    <loading :active.sync="this.$store.state.isLoading"
              :can-cancel="true"
              :is-full-page="true"
              :z-index="1060">
    </loading>
  </div>
</template>

<script>
import RankingCard from '../Card/RankingCard';
import Modal from '../Component/Modal';
import { code } from '../../api';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import BackToTop from 'vue-backtotop'

export default{
  props:{
    item:Array
  },
  components:{
    RankingCard,
    Modal,
    Loading,
    BackToTop
  },
  data() {
    return {
      transition: "slide-next",
      activetab: 0,
      tabwidth: 90,
      category_type : 1,
      data: 0,
      items:[],
      initialX : null,
      initialY : null,
      modalShow: false,
      category_middle:[],
      subject : "전체",
      flag : true
    }
  },
  watch: {
      '$route' (to, from) {
        if(to.path !== from.path) {
          console.log(to.path, from.path);
          if(from.path.match(/detail/gi)){

          } else if(from.path.match(/ranking/gi)){

          } else {
            this.$store.commit('SET_INIT');
            this.activetab = 0
            this.tabwidth = 90
            this.category_type = 1
            this.subject ='전체'
            this.data = 0
            this.$store.state.rankTabStatus = 0
            this.items = []
            this.rankingInit()
            //this.rankfetch();
          }
        }
      }
  },
 created(){
   this.rankingInit()
 },
 mounted(){
   this.$refs.tabbar.style.setProperty('--tabwidth', this.tabwidth+'px')
   document.addEventListener('touchstart', this.startTouch, false);
   document.addEventListener('touchmove', this.moveTouch, false);
 },
 beforeDestroy(){
   document.removeEventListener('touchstart', this.startTouch, false);
   document.removeEventListener('touchmove', this.moveTouch, false);
 },
 activated(){
  this.$refs.tabbar.style.setProperty('--tabwidth', this.tabwidth+'px')
  document.addEventListener('touchstart', this.startTouch, false);
  document.addEventListener('touchmove', this.moveTouch, false);

 },
 deactivated() {
   document.removeEventListener('touchstart', this.startTouch, false);
   document.removeEventListener('touchmove', this.moveTouch, false);
 },
 computed:{
   pointer(){
      if(window.PointerEvent) return true
      else return false
   }
 },
 methods: {
   rankingInit(){
     //Tab가져오기
     //this.$store.state.pageKeepAlive = true
     this.$store.commit('SET_INIT');
     this.$store.commit('ISLOADING', true);
     this.activetab = this.$store.state.rankTabStatus;

     code.category(2).then(data=>{
       if(data.length == 0){

       }
       else{
         this.items = data;
         this.subject = this.items[this.activetab].descript;
         console.log('check');
         this.rankfetch();
         this.categoryMiddle();
       }
       this.$store.commit('ISLOADING', false);
     }).catch(error =>{
       console.log("error",error);
       //alert 후 페이지 이동
       this.errorAlert();
     });
   },
   startTouch(e) {
   this.initialX = e.touches[0].clientX;
   this.initialY = e.touches[0].clientY;
 },
 moveTouch(e) {
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
       console.log("swiped left");
       if(this.activetab == undefined)
       {
       }
       else if(this.activetab >= 0 && this.activetab < this.items.length - 1)
       {
         this.switchtab(this.activetab + 1);
         console.log("switchTab", this.activetab);
         if(this.activetab == 0){
         }
       }
       else{
       }
     } else {
       // swiped right
       if(this.activetab == undefined)
       {
         this.switchtab(1);
       }
       else if(this.activetab >= 1)
       {
         this.switchtab(this.activetab - 1);
         if(this.activetab == 0){
           //this.switchtab(0);
         }
       }
       else{
         //this.switchtab(0);
       }
       console.log("swiped right");
     }
   } else {
     // sliding vertically
     if (diffY > 0) {
       // swiped up
       console.log("swiped up");
     } else {
       // swiped down
       console.log("swiped down");
     }
   }

   this.initialX = null;
   this.initialY = null;
 },
 switchtab(n){
      let scroll, scond

      if(this.activetab>n){
        this.transition = "slide-prev"
         scroll = n-1
        if(scond && this.$refs.tab[scroll]){
          this.$refs.tab[scroll].scrollIntoView({behavior:'smooth'})
          console.log("slide-prev");
        }
      } else  if(this.activetab < n){
         this.transition = "slide-next"
         scroll = n+1
      }
      scond = scroll>=0 && scroll < this.items.length

      if(scond && this.$refs.tab[scroll])
        this.$refs.tab[scroll].scrollIntoView({behavior:'smooth'})

      this.$nextTick(function() {
      	this.activetab = n
        this.subject = this.items[n].descript;
        this.data = n;
        this.$store.state.rankTabStatus = n;

        this.rankfetch();
        this.categoryMiddle();
      //  this.eventstartlistener();
      })
    },
    rankfetch(){
      // 카테고리 타입이 1이면 대 카테고리로 set한다
      this.category_type  = 1;
      this.$store.commit('SET_INIT');
      this.$store.commit('ISLOADING', true);
      console.log("rank 패치데이터", this.data, this.category_type, this.$store.state.product.length, this.$store.state.rankTabStatus);
      this.$store.dispatch('FETCH_RANK_READMORE',{category_type:this.category_type, category:this.$store.state.rankTabStatus});
    },
    categorySelect(key, descript){
      // 카테고리 타입이 2이면 부카테고리로 set한다
      this.subject = descript;
      this.category_type = 2;
      this.$store.commit('SET_INIT');
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_RANK_READMORE',{category_type:this.category_type, category:key});
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
        }
        this.$store.commit('ISLOADING', false);
      }).catch(error =>{
        console.log("error",error);
        //alert 후 페이지 이동
        this.errorAlert();
      });
    },
    errorAlert(){
      this.$router.push(this.$route.query.returnPath || '/error');
    },
    popup(){
        this.modalShow = true;
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
.tabs{
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
  touch-action: pan-y !important;
}
.tabpane{
  position: absolute;
  width: 100%;
  align-items:center;
  justify-content:center;
  margin-top:30px;
}
.modal-view{
  width: 100%;
  height: 200px;
  overflow-y: scroll;
}
.goTop {
  border-radius: 50px;
  background-color: rgba(31,45,61,.11);
  position: fixed;
  width: 45px;
  height: 45px;
  display: block;
  right: 20px;
  bottom: 75px;
  border: none;
}
</style>
