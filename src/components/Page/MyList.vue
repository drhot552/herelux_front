<template>
  <div>
    <div class="section" style="padding:51px 0; overflow:auto; -webkit-overflow-scrolling: touch;">
      <div class="container" style="padding-left: 0px; padding-right: 0px; height: 80vh;">
        <div style="position:fixed; background-color:white; z-index:1; width:100%; height:60px;">
          <div v-if="listFlag" style="margin-top:15px;" v-on:click="listChange()">
            <span class="board_span_style" style="color:black; text-decoration: underline;">내가 선택한 명품</span>
            <span class="board_span_style">내가 작성한 글</span>
          </div>
          <div v-else style="margin-top:13px;" v-on:click="listChange()">
            <span class="board_span_style">내가 선택한 명품</span>
            <span class="board_span_style" style="color:black; text-decoration: underline;">내가 작성한 글</span>
          </div>
        </div>

        <!-- mulist product 부분-->
        <div v-if="listFlag" >
          <ul class="tabs" ref="mylisttabbar" style="margin-top:60px;">
             <div class="tabitem" :class="index === mylistActivetab ? 'active' : ''"  v-for="(tab, index) in items" @click="switchtab(index)" :key="index" ref="mylisttab">
               {{tab.descript}}
             </div>
             <div class="slider" :style="'transform:translateX('+mylistActivetab*tabwidth+'px)'">
             </div>
           </ul>
           <div v-hammer:swipe="mylistmoveTouch" ref="tcon" class="tabcontainer">
             <div style="border-bottom: 3px solid rgb(0,0,0); height:50px; margin-left:15px; margin-right:15px;">
               <h5 style="float:left;">
                   내가 선택한 상품 리스트
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
                <div class="tabpane_mylist" v-if="index === mylistActivetab">
                  <MyListCard>
                  </MyListCard>
                </div>
             </transition>
           </div>
        </div>
        <!--myListBoradCard -->
        <div v-else>
          <ul class="tabs" ref="mylisttabbar" style="margin-top:60px;">
             <div class="tabitem" :class="index === mylistboardactivetab ? 'active' : ''"  v-for="(tab, index) in boarditems" @click="boardswitchtab(index)" :key="index" ref="boardtab">
               {{tab.descript}}
             </div>
             <div class="slider" :style="'transform:translateX('+mylistboardactivetab*tabwidth+'px)'">
             </div>
           </ul>

          <div v-hammer:swipe="mylistboardmoveTouch" ref="tcon" class="tabcontainer">
            <transition :name="transition" v-for="(tab, index) in boarditems" :key="index">
               <div class="tabpane_mylist" v-if="index === mylistboardactivetab">
                 <MyListBoardCard>
                 </MyListBoardCard>
               </div>
            </transition>
          </div>
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
import MyListCard from '../Card/MyListCard';
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
    MyListCard,
    Modal,
    Loading,
    MyListBoardCard
  },
  data() {
    return {
      transition: "slide-next",
      mylistActivetab: 0,
      mylistboardactivetab : 0,
      tabwidth: 90,
      data: 0,
      items:[],
      boarditems:[],
      initialX : null,
      initialY : null,
      modalShow: false,
      category_middle:[],
      subject : "전체",
      userid : "",
      listFlag:true
    }
  },
 created(){

   this.$store.state.myList_category_type = 0;
   this.mylistActivetab = this.$store.state.myList_category;

   this.userid = localStorage.getItem('id');
   this.$store.commit('ISLOADING', true);
   this.$store.commit('SET_MYLIST_INIT');
   if(this.$route.params.pagetype == 0){
     this.listFlag = true
   } else {
     this.listFlag = false
   }
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
//  this.$refs.mylistboardtabbar.style.setProperty('--tabwidth', this.tabwidth+'px')
 },
 computed:{
   pointer(){
      if(window.PointerEvent) return true
      else return false
   }
 },
 methods: {
  mylistmoveTouch(direction) {
    if(Math.abs(direction.deltaX) >  Math.abs(direction.deltaY)) {
       if(direction.deltaX < direction.deltaY){
         console.log("swiped left");
         if(this.mylistActivetab == undefined)
         {
         }
         else if(this.mylistActivetab >= 0 && this.mylistActivetab < this.items.length - 1)
         {
           this.switchtab(this.mylistActivetab + 1);
           console.log("switchTab", this.mylistActivetab);
           if(this.mylistActivetab== 0){
           }
         }
         else{
         }
       }
       else if (direction.deltaX > direction.deltaY){
         if(this.mylistActivetab == undefined)
         {
           this.switchtab(1);
         }
         else if(this.mylistActivetab >= 1)
         {
           this.switchtab(this.mylistActivetab - 1);
           if(this.mylistActivetab == 0){
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
  mylistboardmoveTouch(direction) {
    if(Math.abs(direction.deltaX) >  Math.abs(direction.deltaY)) {
       if(direction.deltaX < direction.deltaY){
         console.log("swiped left");
         if(this.mylistboardactivetab == undefined)
         {
         }
         else if(this.mylistboardactivetab >= 0 && this.mylistboardactivetab < this.items.length - 1)
         {
           this.boardswitchtab(this.mylistboardactivetab + 1);
           if(this.mylistActivetab== 0){
           }
         }
         else{
         }
       }
       else if (direction.deltaX > direction.deltaY){
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
       }
     }
  },
   switchtab(n){
      let scroll, scond

      if(this.mylistActivetab > n){
        this.transition = "slide-prev"
         scroll = n-1
        if(scond && this.$refs.mylisttab[scroll])
          this.$refs.mylisttab[scroll].scrollIntoView({behavior:'smooth'})
      }else  if(this.mylistActivetab < n){
         this.transition = "slide-next"
         scroll = n+1
      }
      scond = scroll>=0 && scroll < this.items.length

      if(scond && this.$refs.mylisttab[scroll])
        this.$refs.mylisttab[scroll].scrollIntoView({behavior:'smooth'})

      this.$nextTick(function() {
      	this.mylistActivetab = n
        this.subject = this.items[n].descript;

        this.data = n;
        this.$store.state.myList_category = n;

        this.fetch();
        this.categoryMiddle();
      })
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
    fetch(){
      // 카테고리 타입이 1이면 대 카테고리로 set한다
      this.$store.state.myList_category_type = 1;
      this.$store.commit('SET_MYLIST_INIT');
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_MYLIST_READMORE',{userid:this.userid, category_type:this.$store.state.myList_category_type, category:this.$store.state.myList_category});
      // console.log(this.$store.state.readFlag)
    },
    myboardFetch(){
      // 카테고리 타입이 1이면 대 카테고리로 set한다
      this.$store.commit('SET_INIT_MYLIST_BOARD', this.mylistboardactivetab);
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_MYBOARDLIST_READMORE',{userid:this.userid, myboardlist_type:this.$store.state.myboardList_type});
      // console.log(this.$store.state.readFlag)
    },
    categorySelect(key, descript){
      // 카테고리 타입이 2이면 부카테고리로 set한다
      this.subject = descript;
      this.$store.state.myList_category_type = 2;
      this.$store.state.myList_category = key;
      this.$store.commit('SET_MYLIST_INIT');
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_MYLIST_READMORE',{userid:this.userid, category_type:this.$store.state.myList_category_type, category:this.$store.state.myList_category});
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
    errorAlert(){
      alert("서버와의 통신 에러가 발생하였습니다.");
      this.$router.push(this.$route.query.returnPath || '/error');
    },
    popup(){
        this.modalShow = true;
    },
    listChange(){
      if(this.listFlag){
        this.listFlag = false;
      } else {
        this.listFlag = true;

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
.tabcontainer {
  height:480px;
  position: relative;
  min-height: 100%;
  width: 100%;
  z-index: 0;
  padding-top: 110px;
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
.board_span_style{
  font-size:1.5em;
  margin-left: 10px;
  color:rgb(136, 136, 136);
}
</style>
