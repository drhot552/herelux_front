<template>
  <div>
    <ul class="mylisttabs" ref="mylisttabbar">
       <div class="tabitem" :class="index === mylistActivetab ? 'active' : ''"  v-for="(tab, index) in items" @click="switchtab(index)" :key="index" ref="mylisttab">
         {{tab.descript}}
       </div>
       <div class="slider" :style="'transform:translateX('+mylistActivetab*tabwidth+'px)'">
       </div>
     </ul>
     <div  ref="tcon" class="tabcontainer_mylist">
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
   <modal :show.sync="modalShow" headerClasses="justify-content-center">
       <h4 slot="header" class="title title-up"></h4>
       <div class="modal-view">
         <div style="text-align:center; border-bottom:1px solid hsla(0,0%,53%,.3); padding:5px;" v-for="item in category_middle">
           <a v-on:click="categorySelect(item.minor_key, item.descript)">{{item.descript}}</a>
         </div>
       </div>
     </modal>

</div>
</template>

<script>
import MyListCard from '../Card/MyListCard';
import Modal from '../Component/Modal';
import { code } from '../../api';
import { mapState } from 'vuex'

export default{
  props:{
    item:Array
  },
  components:{
    MyListCard,
    Modal
  },
  data() {
    return {
      transition: "slide-next",
      mylistActivetab: 0,
      tabwidth: 90,
      data: 0,
      items:[],
      initialX : null,
      initialY : null,
      modalShow: false,
      category_middle:[],
      subject : "전체",
      userid : ""
    }
  },
 created(){
   this.$store.commit('myList/SET_MYLIST_CATEGORY_TYPE', 0);
   this.mylistActivetab = this.myList_category;

   this.userid = localStorage.getItem('id');
   this.$store.commit('myList/SET_MYLIST_INIT');

   //전체가져오기
   code.category(2).then(data=>{
     if(data.length == 0){

     }
     else{
       this.items = data;
       this.fetch();
       this.categoryMiddle();
     }
   }).catch(error =>{
     console.log("error",error);
     //alert 후 페이지 이동
     this.errorAlert();
   });
 },
 mounted(){
  this.$refs.mylisttabbar.style.setProperty('--tabwidth', this.tabwidth+'px')
  document.addEventListener('touchstart', this.startmylistTouch, false);
  document.addEventListener('touchmove', this.movemylistTouch, false);
//  this.$refs.mylistboardtabbar.style.setProperty('--tabwidth', this.tabwidth+'px')
 },
beforeDestroy () {
   document.removeEventListener('touchstart', this.startmylistTouch, false);
   document.removeEventListener('touchmove', this.movemylistTouch, false);
 },
 computed:{
   pointer(){
      if(window.PointerEvent) return true
      else return false
   },
   ...mapState('myList', {
     myList_category: 'myList_category',
     myList_category_type : 'myList_category_type'
   })
 },
 methods: {
  startmylistTouch(e) {
   this.initialX = e.touches[0].clientX;
   this.initialY = e.touches[0].clientY;

  },
  movemylistTouch(e) {
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
        if(this.mylistActivetab == undefined)
        {
        }
        else if(this.mylistActivetab >= 0 && this.mylistActivetab < this.items.length - 1)
        {
          this.switchtab(this.mylistActivetab + 1);
          console.log("switchTab", this.mylistActivetab);
          if(this.mylistActivetab == 0){
          }
        }
        else{
        }
      } else {
        // swiped right
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
        this.$store.commit('myList/SET_MYLIST_CATEGORY', n);

        this.fetch();
        this.categoryMiddle();
      })
    },
    fetch(){
      // 카테고리 타입이 1이면 대 카테고리로 set한다
      this.$store.commit('myList/SET_MYLIST_CATEGORY_TYPE', 1);
      this.$store.commit('myList/SET_MYLIST_INIT');
      this.$store.dispatch('myList/FETCH_MYLIST_READMORE',{userid:this.userid, category_type:this.myList_category_type, category:this.myList_category});
      // console.log(this.$store.state.readFlag)
    },
    categorySelect(key, descript){
      // 카테고리 타입이 2이면 부카테고리로 set한다
      this.subject = descript;
      this.$store.commit('myList/SET_MYLIST_CATEGORY_TYPE', 2);
      this.$store.commit('myList/SET_MYLIST_CATEGORY', key);
      this.$store.commit('myList/SET_MYLIST_INIT');
      this.$store.dispatch('myList/FETCH_MYLIST_READMORE',{userid:this.userid, category_type:this.myList_category_type, category:this.myList_category});
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
      code.category(idx).then(result=>{
        if(result.length == 0){

        }
        else{
          this.category_middle = result;
        //  this.modalShow = true;
        //  this.$refs['modal-category'].show()
        }
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
  padding:0;
  position: relative;
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
