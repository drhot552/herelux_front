<template>
  <div>
    <div class="section" style="padding:51px 0;">
      <div v-scroll:throttle="{fn: onBrandScroll, throttle: 500 }" class="container" style="padding-left: 0px; padding-right: 0px; overflow:auto; height: 79vh;">

        <ul class="tabs" ref="tabbar">
           <div class="tabitem" :class="index === brandlistActivetab ? 'active' : ''"  v-for="(tab, index) in items" @click="switchtab(index)" :key="index" ref="tab">
             {{tab.descript}}
           </div>
           <div class="slider" :style="'transform:translateX('+brandlistActivetab*tabwidth+'px)'">
           </div>
         </ul>
        <div ref="tcon" class="tabcontainer">
          <div style="border-bottom: 3px solid rgb(0,0,0); height:50px; margin-left:15px; margin-right:15px;">
            <h5 style="float:left;" >
                {{this.brandList_name}}
            </h5>
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
             <div class="tabpane_mylist" v-if="index === brandlistActivetab">
               <BrandCard>
               </BrandCard>
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
import BrandCard from '../Card/BrandCard';
import Modal from '../Component/Modal';
import { code } from '../../api';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default{
  props:{
    item:Array
  },
  components:{
    BrandCard,
    Modal,
    Loading
  },
  data() {
    return {
      transition: "slide-next",
      brandlistActivetab: 0,
      tabwidth: 90,
      data: 0,
      items:[],
      initialX : null,
      initialY : null,
      modalShow: false,
      category_middle:[],
      subject : "전체",
      brandId : 0,
      brandList_name : ""
    }
  },
 created(){

   this.brandId = this.$route.params.brand_id;
   this.$store.state.brandId = this.$route.params.brand_id;
   this.brandlistActivetab = this.$store.state.brandList_category;

   this.$store.commit('ISLOADING', true);
   this.$store.commit('SET_BRANDLIST_INIT');
   //전체가져오기
   code.category(2).then(data=>{
     if(data.length == 0){

     }
     else{
       this.items = data;
       this.brandName();
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
 mounted(){
  this.$refs.tabbar.style.setProperty('--tabwidth', this.tabwidth+'px')
  document.addEventListener('touchstart', this.startbrandTouch, false);
  document.addEventListener("touchmove", this.movebrandTouch, false);
 },
 beforeDestroy () {
   document.removeEventListener('touchstart', this.startbrandTouch, false);
   document.removeEventListener("touchmove", this.movebrandTouch, false);
 },
 computed:{
   pointer(){
      if(window.PointerEvent) return true
      else return false
   }
 },
 methods: {
  startbrandTouch(e) {
   this.initialX = e.touches[0].clientX;
   this.initialY = e.touches[0].clientY;
  },
  movebrandTouch(e) {
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
        if(this.brandlistActivetab == undefined)
        {
        }
        else if(this.brandlistActivetab >= 0 && this.brandlistActivetab < this.items.length - 1)
        {
          this.switchtab(this.brandlistActivetab + 1);
          console.log("switchTab", this.brandlistActivetab);
          if(this.brandlistActivetab == 0){
          }
        }
        else{
        }
      } else {
        // swiped right
        if(this.brandlistActivetab == undefined)
        {
          this.switchtab(1);
        }
        else if(this.brandlistActivetab >= 1)
        {
          this.switchtab(this.brandlistActivetab - 1);
          if(this.brandlistActivetab == 0){
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
  brandmoveTouch(direction) {
    if(Math.abs(direction.deltaX) >  Math.abs(direction.deltaY)) {
       if(direction.deltaX < direction.deltaY){
         console.log("swiped left");
         if(this.brandlistActivetab == undefined)
         {
         }
         else if(this.brandlistActivetab >= 0 && this.brandlistActivetab < this.items.length - 1)
         {
           this.switchtab(this.brandlistActivetab + 1);
           console.log("switchTab", this.brandlistActivetab);
           if(this.brandlistActivetab== 0){
           }
         }
         else{
         }
       }
       else if (direction.deltaX > direction.deltaY){
         if(this.brandlistActivetab == undefined)
         {
           this.switchtab(1);
         }
         else if(this.brandlistActivetab >= 1)
         {
           this.switchtab(this.brandlistActivetab - 1);
           if(this.brandlistActivetab == 0){
             //this.switchtab(0);
           }
         }
         else{
           //this.switchtab(0);
         }
         console.log("swiped right");
       }
     }
  },
   switchtab(n){
      let scroll, scond

      if(this.brandlistActivetab > n){
        this.transition = "slide-prev"
         scroll = n-1
        if(scond && this.$refs.tab[scroll])
          this.$refs.tab[scroll].scrollIntoView({behavior:'smooth'})
      }else  if(this.brandlistActivetab < n){
         this.transition = "slide-next"
         scroll = n+1
      }
      scond = scroll>=0 && scroll < this.items.length

      if(scond && this.$refs.tab[scroll])
        this.$refs.tab[scroll].scrollIntoView({behavior:'smooth'})

      this.$nextTick(function() {
      	this.brandlistActivetab = n
        this.subject = this.items[n].descript;

        this.data = n;
        this.$store.state.brandList_category = n;

        this.fetch();
        this.categoryMiddle();
      })
    },
    fetch(){
      // 카테고리 타입이 1이면 대 카테고리로 set한다
      this.$store.state.brandList_category_type = 1;
      this.$store.commit('SET_BRANDLIST_INIT');
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_BRANDLIST_READMORE',{brandid:this.brandId, category_type:this.$store.state.brandList_category_type, category:this.$store.state.brandList_category});
      // console.log(this.$store.state.readFlag)
    },
    categorySelect(key, descript){
      // 카테고리 타입이 2이면 부카테고리로 set한다
      this.subject = descript;
      this.$store.state.brandList_category_type = 2;
      this.$store.state.brandList_category = key;
      this.$store.commit('SET_BRANDLIST_INIT');
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_BRANDLIST_READMORE',{brandid:this.brandId, category_type:this.$store.state.brandList_category_type, category:this.$store.state.brandList_category});
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
        this.errorAlert();
      });
    },
    brandName(){
      this.$store.commit('ISLOADING', true);
      //전체가져오기
      code.brand(this.brandId).then(data=>{
        if(data.length == 0){

        } else {
          this.brandList_name = data[0].descript;
        }
      }).catch(error =>{
        console.log("error",error);
        //alert 후 페이지 이동
        this.errorAlert();
      });
    },
    errorAlert(){
      alert("서버와의 통신 에러가 발생하였습니다.");
      this.$router.push(this.$route.query.returnPath || '/error');
    },
    popup(){
        this.modalShow = true;
    },
    onBrandScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
      if (Math.round(scrollTop + clientHeight) >= scrollHeight && this.$store.state.brandList_readFlag) {
	this.$store.commit('ISLOADING', true);
        this.$store.dispatch('FETCH_BRANDLIST_READMORE',{brandid:this.brandId, category_type:this.$store.state.brandList_category_type, category:this.$store.state.brandList_category});
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
  position:sticky;
  padding:0;
  top:0;
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
.tabpane_mylist{
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
