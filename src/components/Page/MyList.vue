<template>
  <div>
    <div class="section" v-bind:class="{ main_web_page: webFlag, main_app_page: !webFlag }">
      <div class="container" style="padding-left: 0px; padding-right: 0px; height: 80vh; overflow:auto;">
        <div style="margin-top:15px; border-bottom:1px solid; padding-bottom: 15px;">
          <div v-for="item in myinfo" style="display:inline-block; width:33%; text-align:center;">
            <div class="icon icon-circle" style="text-align:center; margin-left: 15px; display: block; margin: 0px auto;" v-if="item.type=='선호브랜드'">
              <img class="img-raised" style="border-radius:50%;" v-lazy="`/public/img/brand/${item.sub_name}.png`"/>

            </div>
            <div v-else>
              <h5>{{item.cnt}}</h5>

            </div>
            <h5 style="margin-left:4px;">{{item.type}}</h5>
          </div>
        </div>
        <div class="sticky">
          <div v-if="listFlag==1">
            <span class="board_span_style" style="color:black;" v-on:click="listChange(1)">내가 선택한 명품</span>
            <span class="board_span_style" v-on:click="listChange(2)">내가 작성한 글</span>
            <span style="font-size:10px; color:red;" v-if="boardFlag">N</span>
          </div>
          <div v-else-if="listFlag==2">
            <span class="board_span_style" v-on:click="listChange(1)">내가 선택한 명품</span>
            <span class="board_span_style" style="color:black;" v-on:click="listChange(2)">내가 작성한 글</span>
            <span style="font-size:10px; color:red;" v-if="boardFlag">N</span>
          </div>
        </div>
        <div v-if="listFlag == 1">
          <Mylistproduct></Mylistproduct>
        </div>
        <div v-else>
          <MylistBoard></MylistBoard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MylistBoard from '../Page/MylistBoard';
import Mylistproduct from '../Page/Mylistproduct';
import { info } from '../../api';
import { mapState } from 'vuex'

export default{
  props:{
    item:Array
  },
  components:{
    Mylistproduct,
    MylistBoard
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
      position: { scrollTop: 0, scrollLeft: 0 }
    }
  },
  mounted(){
    document.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy(){
    document.removeEventListener('scroll', this.onScroll);
  },
  activated(){
    document.addEventListener('scroll', this.onScroll);
  },
  deactivated(){
    document.removeEventListener('scroll', this.onScroll);
  },
 created(){
   if(this.$route.params.pagetype == 0){
     this.listFlag = 1
   } else if (this.$route.params.pagetype == 1){
     this.listFlag = 2
   } else {
     this.listFlag = 3
   }
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
.board_span_style{
  font-size:1.2em;
  margin-left: 10px;
  color:rgb(136, 136, 136);
}
.icon.icon-circle{
  max-width: 80px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 9px 35px -6px rgba(0,0,0,.3);
    font-size: .7142em;
    background-color: #fff;
    position: relative;
}/* The sticky class is added to the header with JS when it reaches its scroll position */
.sticky {
  background-color: white;
    z-index: 1;
    width: 100%;
    height: 50px;
    padding-top: 15px;
    position: sticky;
    position: -webkit-sticky;
    top: 1px;
}
.lazy-img-fadein[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
}

.main_web_page{
  padding: 100px 0 53px;
  background: #fff;
}
.main_app_page{
  padding: 70px 0 53px;
  background: #fff;
}
</style>
