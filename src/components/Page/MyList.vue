<template>
  <div>
    <div class="section" style="padding:51px 0; overflow:auto; -webkit-overflow-scrolling: touch;">
      <div class="container" style="padding-left: 0px; padding-right: 0px; height: 80vh;">
        <div style="position:fixed; background-color:white; z-index:1; width:100%; height:60px;">
          <div v-if="listFlag" style="margin-top:15px;" v-on:click="listChange(1)">
            <span class="board_span_style" style="color:black;">내가 선택한 명품</span>
            <span class="board_span_style">내가 작성한 글</span>
          </div>
          <div v-else style="margin-top:13px;" v-on:click="listChange(2)">
            <span class="board_span_style">내가 선택한 명품</span>
            <span class="board_span_style" style="color:black;">내가 작성한 글</span>
          </div>
        </div>

        <!-- mulist product 부분-->
        <div v-if="listFlag">
          <Mylistproduct></Mylistproduct>
        </div>
        <!--myListBoradCard -->
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
      listFlag : true
    }
  },
 created(){
   if(this.$route.params.pagetype == 0){
     this.listFlag = true
   } else {
     this.listFlag = false
   }
 },
 methods: {
    listChange(type){
      if(this.listFlag && type == 1){
        this.listFlag = false;
      } else {
        this.listFlag = true;

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
</style>
