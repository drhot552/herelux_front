<template>
  <div>
    <div class="section" v-bind:class="{ main_web_page: webFlag, main_app_page: !webFlag }">
      <div class="container" style="padding-left: 0px; padding-right: 0px; height: 80vh; overflow:auto;">
        <div class="container">
          <div class="row">
            <article class="col-md-8 ml-auto mr-auto" style="padding:0;">
              <ul class="mylisttabs_category" ref="tabbar">
                 <div class="tabitem_category" :class="index === mylisttab ? 'active' : ''"  v-for="(tab, index) in mylisttab" @click="switchtab(index)" :key="index" ref="tab">
                   {{tab}}
                 </div>
               </ul>
               <div class="slider_category" :style="'transform:translateX('+detailactivetab*tabwidth+'%)'">
               </div>
               <div ref="tcon" class="tabcontainer_sex">
                 <transition :name="transition" v-for="(loop, index) in detailtab" :key="index">
                    <div class="tabpane_category" v-if="index === 0 && index === detailactivetab">

                    </div>
                </transition>
               </div>
              <br/>
              <br/>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { info } from '../../api';

import { mapState } from 'vuex';

export default{
  props:{
    item:Array
  },
  computed:{
    ...mapState('hereluxAll', {
      webFlag: 'webFlag'
    }),
    ...mapState('boardList', {
      boardFlag: 'boardFlag'
    }),
    ...mapState('myList', {
      myList_readFlag: 'myList_readFlag',
      myList_category_type : 'myList_category_type',
      myboardList_type : 'myboardList_type'
    })

  },
  data() {
    return {
      listFlag : 0,
      userId:String,
      myinfo:[],
      mylisttab : ['관심상품','작성글','댓글단 글','좋아요한 글']
    }
  },
  created(){
   this.userId = localStorage.getItem('id');
   info.myinfo(this.userId).then(data=>{
     if(data.length == 0){

     }
     else{
       this.myinfo = data;
     }
     this.$store.commit('ISLOADING', false);
   }).catch(error =>{
     console.log("error",error);
     //alert 후 페이지 이동
     this.errorAlert();
   });
   //게시판전체가져오기
   this.$store.commit('ISLOADING', true);
 },
 methods: {
    listChange(listType){
      if(listType== 1){
        this.listFlag = 1;
      } else if(listType==2){
        this.listFlag = 2;
      }
    },
    errorAlert(){
      this.$router.push(this.$route.query.returnPath || '/error');
    },
    onScroll () {
      if (Math.round( $(window).scrollTop()) == $(document).height() - $(window).height() && this.myList_readFlag) {
        if(this.listFlag ==  1){
          this.$store.dispatch('myList/FETCH_MYLIST_READMORE',{userid:this.userId, category_type:this.myList_category_type, category:this.myList_category});
        } else {
          this.$store.dispatch('myList/FETCH_MYBOARDLIST_READMORE',{userid:this.userid, myboardlist_type:this.myboardList_type});
        }
      }
    }
 }
}
</script>

<style>
.mylisttabs_category{
  display:flex;
  height:48px;
  overflow-x:scroll;
  white-space:nowrap;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  z-index: 1;
  padding:0;
  margin:0;
}
.tabs::-webkit-scrollbar  {
  width: 0 !important;
  height:0 !important;
}
.tabitem_category{
  font-size: 15px;
  font-weight: 700;
  color: #888;
  display:flex;
  background:white;
  align-items:center;
  justify-content:center;
  width:100%;
  cursor:pointer;
}
.tabitem_category.active{
  font-size: 15px;
  font-weight: 700;
  background:white;
  color: black;
}
.slider_category{
  height:2px;
  width:25%;
  background:black;
  transition:.5s ease;
}
.tabcontainer_category {
  height:480px;
  position: relative;
  min-height: 100%;
  width: 100%;
  z-index: 0;
  touch-action: pan-y !important;
}
.tabpane_category{
    width: 100%;
    align-items:center;
    justify-content:center;
}
.main_web_page{
  padding: 100px 0 53px;
  background: #fff;
}
.main_product_app_page{
  padding: 50px 0 53px;
  background: #fff;
}
</style>
