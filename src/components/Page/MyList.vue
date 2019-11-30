<template>
  <div>
    <div v-scroll:throttle="{fn: onScroll, throttle: 500 }" class="section" style="padding:51px 0; overflow:auto; -webkit-overflow-scrolling: touch;" id="test">
      <div class="container" style="padding-left: 0px; padding-right: 0px; height: 80vh; overflow:auto;">
        <div style="margin-top:15px; border-bottom:1px solid;">
          <table style="width:95%; margin-left:15px; margin-bottom:15px;">
            <tbody>
              <tr>
                <td v-for="item in myinfo">
                  <div class="icon icon-circle" style="text-align:center;" v-if="item.type=='선호브랜드'">
                    <img class="img-raised" style="border-radius:50%;" v-lazy="`/public/img/brand/${item.sub_name}.png`"/>

                  </div>
                  <div v-else>
                    <h5>{{item.cnt}}</h5>

                  </div>
                  <h5>{{item.type}}</h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="sticky">
          <div v-if="listFlag==1">
            <span class="board_span_style" style="color:black;" v-on:click="listChange(1)">내가 선택한 명품</span>
            <span class="board_span_style" v-on:click="listChange(2)">내가 작성한 글</span>
            <span style="font-size:10px; color:red;" v-if="this.$store.state.boardFlag">N</span>
          </div>
          <div v-else-if="listFlag==2">
            <span class="board_span_style" v-on:click="listChange(1)">내가 선택한 명품</span>
            <span class="board_span_style" style="color:black;" v-on:click="listChange(2)">내가 작성한 글</span>
            <span style="font-size:10px; color:red;" v-if="this.$store.state.boardFlag">N</span>
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

export default{
  props:{
    item:Array
  },
  components:{
    Mylistproduct,
    MylistBoard
  },
  data() {
    return {
      listFlag : 0,
      userId:String,
      myinfo:[],
      position: { scrollTop: 0, scrollLeft: 0 }
    }
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
   //별처리
   var arrayId = this.userId.split("@");
   var str = "";
   var hideId = "";
   if(arrayId.length == 2){
     for(var j =0; j < arrayId[0].length / 2; j++){
       str += "*";
     }
     hideId = arrayId[0].substr(0,arrayId[0].length/2) + str;
     hideId = hideId + "@" + arrayId[1];
     this.userId = hideId;
   }
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
      alert("서버와의 통신 에러가 발생하였습니다.");
      this.$router.push(this.$route.query.returnPath || '/error');
    },
    onScroll: function(e, position) {
      this.position = position;

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
    width: 80px;
    height: 80px;
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
}.lazy-img-fadein[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
}
</style>
