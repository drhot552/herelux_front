<template>
    <div class="content">
        <div class="container">
          <div class="row" style="padding-bottom: 15px; border-bottom: 7px solid hsla(0,0%,53%,.3);"
                v-for="(item,i) in this.$store.state.board">
            <div style="width:89%;">
              <div class="div_board_1" style="margin-left:10px; margin-right:10px; float:left;">
                <!--순위대로 색을 다르게 check-->
                  <div class="layer">
                    <!--브랜드 이름 -->
                    <h5 v-if="item.boardtype < 2">
                      <b>{{`[` + item.forum + `]`}}</b>
                    </h5>
                    <h5 v-else-if ="item.boardtype == 2">
                      <b>{{`[뭐살까?]`}}</b>
                    </h5>
                    <h5 v-else ="item.boardtype == 3">
                      <b>{{`[자유게시판]`}}</b>
                    </h5>
                  </div>
              </div>
              <div class="div_board_2">
                <div class="layer">
                  <h5>
                    <b>{{item.subject}}</b>
                  </h5>
                </div>
              </div>
              <div class="div_board_2">
                <div class="layer" style="margin-left:10px; margin-bottom:35px;">
                  <h6>
                    {{item.descript}}
                  </h6>
                </div>
              </div>
              <div style="margin-left:10px">
                <div>
                  <h6 class="h6_style"> {{item.name}} </h6>
                  <h6 class="h6_style"> | </h6>
                  <h6 class="h6_style"> {{`작성시간 : ` + item.reg_date}} </h6>
                  <h6 class="h6_style"> | </h6>
                  <h6 class="h6_style"> {{`조회수 : ` + item.views}} </h6>
                </div>
              </div>
            </div>
            <div style="margin-top:35px; position: relative;">
              <img src="/public/img/board_icon_reply.png" style="height:30px;"/>
              <div class="board_view">
                <h6> {{item.comment}} </h6>
              </div>
            </div>
            <router-link class="div_board_4" v-bind:to="`/boarddetail/`+item.board_idx">
            </router-link>
          </div>
          <div v-if="this.$store.state.board_readFlag" style="text-align:center; height:50px;">
            <a style="color:#000000;" v-on:click="readMore()">
              <span>더보기..</span>
            </a>
          </div>
          <router-link class="write_button" v-bind:to="`/write`">
            <img src="/public/img/btn_write3.png"/>
          </router-link>
        </div>
  </div>
</template>
<script>
import { board } from '../../api'
//import InfiniteLoading from 'vue-infinite-loading';
export default {
  props: {
    boardtype:Number
  },
  data(){
    return{
      descript:'',
      title:''
    }
  },
  created(){
    this.readMore();
  },
  methods:{
    readMore(){
      //처음은 일단 0으로 set
      this.$store.dispatch('FETCH_BOARD_READMORE',{boardtype:this.$store.state.boardTabStatus/2});

    },
    write(){

    }
  }

}
</script>
<style>
.div_board_1{
  text-align:left;
}
.div_board_1:before {
   content: '';
   display: inline-block;
   width: 0;
   height: 25%;
   vertical-align: middle;
   margin-right: -4px;
}
.div_board_2{
  width:100%;
  text-align:left;
}
.div_board_2:before {
   content: '';
   display: inline-block;
   width: 0;
   height: 25%;
   vertical-align: middle;
   margin-right: -4px;
}
.div_board_3{
  width: 40%;
}
.div_board_4{
  width: 100%;
  height:150px;
  position: absolute;
  z-index:0;
}
.h6_style{
  float:left;
  margin-right:10px;
  font-size :10px;
}
.board_view{
   right: 0px;
   transform: translate(0%,-150%);
   z-index: 2;
   text-align: center;
}
.write_button {
  border-radius: 50px;
  background-color: #ffffff;
  position: fixed;
  width: 45px;
  height: 45px;
  display: block;
  right: 20px;
  bottom: 75px;
  border: none;
}
</style>
