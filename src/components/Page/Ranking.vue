<template>
  <div>
    <div class="section" style="padding:51px 0; overflow:auto; -webkit-overflow-scrolling: touch;">
      <div class="container" style="padding-left:0px; padding-right:0px; padding-right:0px; height:80vh;">

        <ul class="tabs" ref="tabbar">
           <div class="tabitem" :class="index === activetab ? 'active' : ''"  v-for="(tab, index) in items" @click="switchtab(index)" :key="index" ref="tab">
             {{tab.descript}}
           </div>
           <div class="slider" :style="'transform:translateX('+activetab*tabwidth+'px)'">
           </div>
         </ul>
        <div v-hammer:swipe="rankmoveTouch" ref="tcon" class="tabcontainer" >
          <div style="border-bottom: 3px solid rgb(0, 0, 0); height: 50px; margin-left: 15px; margin-right: 15px;">
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
          <!--<div style="text-align:right; margin-right:30px; margin-bottom:20px;">

          </div> -->
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

export default{
  props:{
    item:Array
  },
  components:{
    RankingCard,
    Modal,
    Loading
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
 created(){
   //Tab가져오기
   this.$store.commit('SET_INIT');
   this.$store.commit('ISLOADING', true);
   this.activetab = this.$store.state.rankTabStatus;

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
 mounted(){
  this.$refs.tabbar.style.setProperty('--tabwidth', this.tabwidth+'px')

 },
 computed:{
   pointer(){
      if(window.PointerEvent) return true
      else return false
   }
 },
 methods: {
  rankmoveTouch(direction) {

    if(Math.abs(direction.deltaX) >  Math.abs(direction.deltaY)) {
       if(direction.deltaX < direction.deltaY){
         console.log("rank swiped left");
         if(this.activetab == undefined)
         {
         }
         else if(this.activetab >= 0 && this.activetab < this.items.length - 1)
         {
           this.switchtab(this.activetab + 1);
           console.log("rank switchTab", this.activetab);
           if(this.activetab == 0){
           }
         }
         else{
         }
       } else if (direction.deltaX > direction.deltaY){
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
       }
     }


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
        console.log("rank this.activetab12",this.$store.state.rankActivetab, n, this.$store.state.rankActivetab*this.$store.state.rankTabwidth);
        this.data = n;
        this.$store.state.rankTabStatus = n;

        this.fetch();
        this.categoryMiddle();
      //  this.eventstartlistener();
      })
    },
    fetch(){
      // 카테고리 타입이 1이면 대 카테고리로 set한다
      this.category_type  = 1;
      this.$store.commit('SET_INIT');
      this.$store.commit('ISLOADING', true);
      console.log("rank 패치데이터", this.data, this.category_type, this.$store.state.product.length);
      this.$store.dispatch('FETCH_RANK_READMORE',{category_type:this.category_type, category:this.data});

      //this.eventlistener();
      // console.log(this.$store.state.readFlag)
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
        //  this.$refs['modal-category'].show()
        }
        this.$store.commit('ISLOADING', false);
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
  padding-top: 47px;
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
</style>
