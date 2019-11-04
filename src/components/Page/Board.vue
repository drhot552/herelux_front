<template>
    <div class="section" style="padding:51px 0; overflow:auto; -webkit-overflow-scrolling:touch;">
    <div class="container" style="padding-left:0px; padding-right:0px; height:80vh;">

      <ul class="tabs_board" ref="tabbar">
         <div class="tabitem_board" :class="index === boardactivetab ? 'active' : ''"  v-for="(tab, index) in items" @click="switchtab(index)" :key="index" ref="tab">
           {{tab.descript}}
         </div>
         <div class="slider" :style="'transform:translateX('+boardactivetab*tabwidth+'px)'">
         </div>
       </ul>

      <div ref="tcon" class="tabcontainer_board">
        <transition :name="transition" v-for="(tab, index) in items" :key="index">
           <div class="tabpane_board" v-if="index === boardactivetab">
             <BoardCard>
             </BoardCard>
           </div>
        </transition>
      </div>
    </div>
    <loading :active.sync="this.$store.state.isLoading"
              :can-cancel="true"
              :is-full-page="true"
              :z-index="1060">
    </loading>
  </div>
</template>

<script>
import BoardCard from '../Card/BoardCard';
import { code } from '../../api';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default{
  props:{
    item:Array
  },
  components:{
    BoardCard,
    Loading
  },
  data() {
    return {
      transition: "slide-next",
      boardactivetab: 0,
      tabwidth: 90,
      boardtype: 0,
      items:[],
      initialX : null,
      initialY : null,
      category_middle:[]
    }
  },
 created(){
   //게시판 초기 세팅 ->
   //this.$store.commit('SET_INIT_BOARD', this.$store.state.boardtype);\
   this.$store.commit('ISLOADING', true);
   code.category(3).then(data=>{
     if(data.length == 0){

     }
     else{
       this.items = data;
       this.fetch();
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
  document.addEventListener('touchstart', this.startboardTouch, false);
  document.addEventListener("touchmove", this.moveboardTouch, false);
 },
 beforeDestroy () {
   document.removeEventListener('touchstart', this.startboardTouch, false);
   document.removeEventListener("touchmove", this.moveboardTouch, false);
 },
 computed:{
   pointer(){
      if(window.PointerEvent) return true
      else return false
   }
 },
 methods: {
   startboardTouch(e) {
   this.initialX = e.touches[0].clientX;
   this.initialY = e.touches[0].clientY;
  },
 moveboardTouch(e) {
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
       if(this.boardactivetab == undefined)
       {
       }
       else if(this.boardactivetab >= 0 && this.boardactivetab < 4)
       {
         this.switchtab(this.boardactivetab + 1);
         console.log("switchTab", this.boardactivetab);
         if(this.boardactivetab == 0){
         }
       }
       else{
       }
     } else {
       // swiped right
       if(this.boardactivetab == undefined)
       {
         this.switchtab(1);
       }
       else if(this.boardactivetab >= 1)
       {
         this.switchtab(this.boardactivetab - 1);
         if(this.boardactivetab == 0){
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
  /* boardmoveTouch(direction) {
    if(Math.abs(direction.deltaX) >  Math.abs(direction.deltaY)) {
       if(direction.deltaX < direction.deltaY){
         console.log("board swiped left");
         if(this.boardactivetab == undefined)
         {
         }
         else if(this.boardactivetab >= 0 && this.boardactivetab < 4)
         {
           this.switchtab(this.boardactivetab + 1);
           console.log("board switchTab", this.boardactivetab);
           if(this.boardactivetab == 0){
           }
         }
         else{
         }
       }
       else if (direction.deltaX > direction.deltaY){
         // swiped right
         if(this.boardactivetab == undefined)
         {
           this.switchtab(1);
         }
         else if(this.boardactivetab >= 1)
         {
           this.switchtab(this.boardactivetab - 1);
           if(this.boardactivetab == 0){
             //this.switchtab(0);
           }
         }
         else{
           //this.switchtab(0);
         }
         console.log("board swiped right");
       }
     }
  },
  */
   switchtab(n){
      let scroll, scond

      if(this.boardactivetab >n){
        this.transition = "slide-prev"
         scroll = n-1
        if(scond)
          this.$refs.tab[scroll].scrollIntoView({behavior:'smooth'})
      }else  if(this.boardactivetab<n){
         this.transition = "slide-next"
         scroll = n+1
      }
      scond = scroll>=0 && scroll < this.items.length
      if(scond && this.$refs.tab[scroll])
        this.$refs.tab[scroll].scrollIntoView({behavior:'smooth'})

      this.$nextTick(function() {
      	this.boardactivetab = n;
        this.boardtype = n;
        this.$store.state.boardTabStatus = n;
        this.fetch();
      })
    },
    fetch(){

      this.$store.commit('SET_INIT_BOARD', this.boardtype);
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_BOARD_READMORE',{boardtype:this.boardtype});
    },
    errorAlert(){
      alert("서버와의 통신 에러가 발생하였습니다.");
      this.$router.push(this.$route.query.returnPath || '/error');
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
.tabs_board{
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
.tabitem_board{
  display:flex;
  background:black;
  align-items:center;
  justify-content:center;
  min-width:var(--tabwidth);
  cursor:pointer;
  font-size:14px;

}
.tabitem_board.active{
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
.tabcontainer_board {
  height:480px;
  position: relative;
  min-height: 100%;
  width: 100%;
  z-index: 0;
  padding-top: 47px;
  touch-action: pan-y !important;
}
.tabpane_board{
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
