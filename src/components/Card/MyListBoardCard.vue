<template>
    <div class="content">
        <div v-if="this.$store.state.myboardList.length > 0" class="container" style="margin-bottom:80px">
          <div class="row" style="padding-bottom: 15px; border-bottom: 7px solid hsla(0,0%,53%,.3);"
                v-for="(item,i) in this.$store.state.myboardList">
            <div style="width:100%;">
              <div class="div_board_1" style="margin-left:10px; margin-right:10px;">
                <!--순위대로 색을 다르게 check-->
                  <div class="layer">
                    <!--브랜드 이름 -->
                    <span v-if="item.boardtype < 3">
                      <b>{{`[` + item.forum + `]`}}</b>
                    </span>
                    <span v-else-if ="item.boardtype == 3">
                      <b>{{`[뭐살까?]`}}</b>
                    </span>
                    <span v-else ="item.boardtype == 4">
                      <b>{{`[자유게시판]`}}</b>
                    </span>
                    <span>
                      <b>{{item.subject}}</b>
                    </span>
                    <span v-if="item.img_cnt > 0" style="float:right;">
                      <img v-lazy ="item.imgurl" style="width:80px; height:80px;"/>
                    </span>
                    <h6 v-html="item.descript" class="write_ellipsis" style="margin-top: 25px;">
                    </h6>
                  </div>
              </div>
              <div class="div_board_1" style="margin-left:10px">
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
            
            </div>
            <router-link class="div_board_4" v-bind:to="`/boarddetail/`+item.board_idx + `/mylist`">
            </router-link>
          </div>
          <div v-if="this.$store.state.myboardList_flag" style="text-align:center; height: 7vh; padding-top: 15px;">
            <a style="color:#000000;" v-on:click="readMore()">
              <img src="/public/img/btn_arrow_down.png" style="height:20px;margin-top: 10px;"/>
            </a>
          </div>
          <router-link class="write_button" v-bind:to="`/write`">
            <img src="/public/img/btn_write3.png"/>
          </router-link>
        </div>
        <div v-else class="container" style="margin-bottom:80px">
          <div v-if="!this.$store.state.isLoading" class="row" >
              <div class="col-md-8 ml-auto mr-auto text-center">
                  <h4 class="title">내가 작성한 글이 없습니다.</h4>
              </div>
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
      title:'',
      userid :''
    }
  },
  created(){
    //this.readMore();
    this.userid = localStorage.getItem('id');
  },
  methods:{
    readMore(){
      //처음은 일단 0으로 set
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_MYBOARDLIST_READMORE',{userid:this.userid, myboardlist_type:this.$store.state.myboardList_type});

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
.write_ellipsis{
  width: 230px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.9em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
