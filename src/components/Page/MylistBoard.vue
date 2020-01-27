<template>
  <div>
    <ul class="mylisttabs" ref="mylisttabbar">
       <div class="tabitem" :class="index === mylistboardactivetab ? 'active' : ''"  v-for="(tab, index) in boarditems" @click="boardswitchtab(index)" :key="index" ref="boardtab">
         {{tab.descript}}
       </div>
       <div class="slider" :style="'transform:translateX('+mylistboardactivetab*tabwidth+'px)'">
       </div>
     </ul>

    <div ref="tcon" class="tabcontainer_mylist">
      <transition :name="transition" v-for="(tab, index) in boarditems" :key="index">
         <div class="tabpane_mylist" v-if="index === mylistboardactivetab">
           <MyListBoardCard>
           </MyListBoardCard>
         </div>
      </transition>
    </div>
    <loading :active.sync="this.$store.state.isLoading"
              :can-cancel="true"
              :is-full-page="true"
              :z-index="1060">
    </loading>
  </div>
</template>

<script>
import MyListBoardCard from '../Card/MyListBoardCard';
import Modal from '../Component/Modal';
import { code } from '../../api';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default{
  props:{
    item:Array
  },
  components:{
    Modal,
    Loading,
    MyListBoardCard
  },
  data() {
    return {
      transition: "slide-next",
      mylistboardactivetab : 0,
      tabwidth: 90,
      data: 0,
      boarditems:[],
      initialboardX : null,
      initialboardY : null,
      modalShow: false,
      userid : ""
    }
  },
 created(){

   this.userid = localStorage.getItem('id');

   this.$store.commit('ISLOADING', true);
   //게시판전체가져오기
   code.category(3).then(data=>{
     if(data.length == 0){

     }
     else{
       this.boarditems = data;
       this.myboardFetch();
     }
     this.$store.commit('ISLOADING', false);
   }).catch(error =>{
     console.log("error",error);
     //alert 후 페이지 이동
     this.errorAlert();
   });
 },
 mounted(){
  this.$refs.mylisttabbar.style.setProperty('--tabwidth', this.tabwidth+'px')
  document.addEventListener('touchstart', this.startmyboardTouch, false);
  document.addEventListener('touchmove', this.movemyboardTouch, false);
//  this.$refs.mylistboardtabbar.style.setProperty('--tabwidth', this.tabwidth+'px')
 },
beforeDestroy () {
   document.removeEventListener('touchstart', this.startmyboardTouch, false);
   document.removeEventListener('touchmove', this.movemyboardTouch, false);
 },
 computed:{
   pointer(){
      if(window.PointerEvent) return true
      else return false
   }
 },
 methods: {
  startmyboardTouch(e) {
   this.initialboardX = e.touches[0].clientX;
   this.initialboardY = e.touches[0].clientY;

  },
  movemyboardTouch(e) {
    if (this.initialboardX === null) {
      return;
    }

    if (this.initialboardY === null) {
      return;
    }

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = this.initialboardX - currentX;
    var diffY = this.initialboardY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // sliding horizontally
      if (diffX > 0) {
        // swiped left
        console.log("swiped left");
        if(this.mylistboardactivetab == undefined)
        {
        }
        else if(this.mylistboardactivetab >= 0 && this.mylistboardactivetab < this.boarditems.length - 1)
        {
          this.boardswitchtab(this.mylistboardactivetab + 1);
          console.log("switchTab", this.mylistboardactivetab);
          if(this.mylistboardactivetab == 0){
          }
        }
        else{
        }
      } else {
        // swiped right
        if(this.mylistboardactivetab == undefined)
        {
          this.boardswitchtab(1);
        }
        else if(this.mylistboardactivetab >= 1)
        {
          this.boardswitchtab(this.mylistboardactivetab - 1);
          if(this.mylistboardactivetab == 0){
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

    this.initialboardX = null;
    this.initialboardY = null;
  },
    boardswitchtab(n){
      let scroll, scond

      if(this.mylistboardactivetab > n){
        this.transition = "slide-prev"
         scroll = n-1
        if(scond && this.$refs.boardtab[scroll])
          this.$refs.boardtab[scroll].scrollIntoView({behavior:'smooth'})
      } else  if(this.mylistboardactivetab < n){
         this.transition = "slide-next"
         scroll = n+1
      }
      scond = scroll>=0 && scroll < this.boarditems.length

      if(scond && this.$refs.boardtab[scroll])
        this.$refs.boardtab[scroll].scrollIntoView({behavior:'smooth'})

      this.$nextTick(function() {
      	this.mylistboardactivetab = n
        this.$store.state.myboardList_type = n;

        this.myboardFetch();
      })
    },
    myboardFetch(){
      // 카테고리 타입이 1이면 대 카테고리로 set한다
      this.$store.commit('SET_INIT_MYLIST_BOARD', this.mylistboardactivetab);
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_MYBOARDLIST_READMORE',{userid:this.userid, myboardlist_type:this.$store.state.myboardList_type});
      // console.log(this.$store.state.readFlag)
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
.mylisttabs{
  display:flex;
  color: #f1f1f1;
  height:48px;
  width:100%;
  overflow-x:scroll;
  white-space:nowrap;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  z-index: 1;
  position:relative;
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
  min-width:90px;
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
  width:90px;
  background:white;
  transition:.5s ease;
}
.tabcontainer_mylist {
  height:100vh;
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
