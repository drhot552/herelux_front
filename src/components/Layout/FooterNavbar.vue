<template>
  <div>
    <div v-if="talk_flag">
      <!--대댓글 글쓰기(Write) -->
      <div v-if="talkCommentFlag" class="talkcommentdown navbar-expand-lg bg-white">
        <div class="container" style="padding-right:0px; padding-left:0px;">
          <a v-on:click="talkcommentFold()">
            <h6 style="margin-right:10px; float:right;">
              <b>
                X
              </b>
            </h6>
            <h6 style="padding-left:15px; text-align:left">
              <b>{{talkCommentName}}</b>
            </h6>
            <h6 style="padding-left:15px; text-align:left; float:left; width:100%;">
                {{talkCommentdescript}}
            </h6>
          </a>
        </div>
      </div>
      <TalkNavbar>
      </TalkNavbar>
    </div>
    <footer class="navbar bg-white fixed-bottom" :class="{'button-fixed-bottom': this.flag}" style = "z-index:5003; text-align: center;">
      <div class="div_style_1" v-if="pageName ==='Home'" v-on:click="footerClick('/')">
       <img src="/public/img/bottom_home_select.png" style="height:20px;"/>
     </div>
     <div class="div_style_1" v-else style="color:#000000;" v-on:click="footerClick('/')">
       <img src="/public/img/bottom_home_default.png" style="height:20px;"/>
     </div>
     <!--
     <div class="div_style_1"  v-if="pageName==='Product'" style="color:#000000;" v-on:click="footerClick('/product')">
       <img src="/public/img/bottom_value_select.png" style="height:20px;"/>
     </div>
     <div class="div_style_1" v-else style="color:#000000;" v-on:click="footerClick('/product')">
       <img src="/public/img/bottom_value_default.png" style="height:20px;"/>
     </div>
   -->
     <div class="div_style_1" v-if="pageName==='MyList'" style="color:#000000;" v-on:click="footerClick('/mylist/0')">
       <img src="/public/img/bottom_mypage_select.png" style="height:20px;"/>
       <span style="font-size:10px; color:red;" v-if="this.$store.state.boardFlag">
         N
       </span>
     </div>
     <div class="div_style_1" v-else style="color:#000000;" v-on:click="footerClick('/mylist/0')">
       <img src="/public/img/bottom_mypage_default.png" style="height:20px;"/>
       <span style="font-size:10px; color:red;" v-if="this.$store.state.boardFlag">
         N
       </span>
     </div>

     <div class="div_style_1" v-if="pageName==='Page'" style="color:#000000;" v-on:click="footerClick('/page')">
       <img src="/public/img/document_select.png" style="height:20px;"/>
     </div>
     <div class="div_style_1" v-else style="color:#000000;" v-on:click="footerClick('/page')">
       <img src="/public/img/document.jpg" style="height:20px;"/>
     </div>
     <!--
     <div class="div_style_1" v-if="pageName==='Rank'" style="color:#000000;" v-on:click="footerClick('/ranking')">
       <img src="/public/img/bottom_rank_select.png" style="height:20px;"/>
     </div>
     <div class="div_style_1" v-else style="color:#000000;"  v-on:click="footerClick('/ranking')" >
       <img src="/public/img/bottom_rank_default.png" style="height:20px;"/>
     </div>
   -->
     <div class="div_style_1" v-if="pageName==='Board'" style="color:#000000;" v-on:click="footerClick('/board')" >
       <img src="/public/img/bottom_board_select.png" style="height:29px;"/>
     </div>
     <div class="div_style_1" v-else style="color:#000000;" v-on:click="footerClick('/board')" >
       <img src="/public/img/bottom_board_default.png" style="height:29px;"/>
     </div>

    </footer>
  </div>
</template>

<script>
  import NavLink from '../Navbar/NavLink';
  import TalkNavbar from '../Layout/TalkNavbar'
  import { mapState } from 'vuex'
  import { info } from '../../api';
  export default {
    name: 'footer-navbar',
    props: {
      pageName:String
    },
    components: {
      NavLink,
      TalkNavbar
    },
    computed:{
      ...mapState('talkList',{
        talk_flag : 'talk_flag',
        talkCommentFlag : 'talkCommentFlag',
        talkCommentName : 'talkCommentName',
        talkCommentdescript : 'talkCommentdescript'
      })
    },
    data(){
      return{
        userid :'',
        flag : false
      }
    },
    created(){
      this.userid = localStorage.getItem('id');
      this.$store.commit('boardList/SET_BOARDINFO_INIT');
      if(this.userid != ''){
        this.$store.dispatch('SELECT_BOARD_INFO_ALERT',{userid:this.userid});
      }
      if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
        if(navigator.userAgent.match(/herelux_app_ios/i)){
          this.flag = true;
        }
      }
    },
    methods:{
      footerClick(path){
        //page Refresh
        this.$store.state.pageKeepAlive = false
        this.$store.commit('SET_CATEGORY_INIT');
        this.$store.commit('SET_BOARDINFO_INIT');

        if(this.userid != ''){
          this.$store.dispatch('SELECT_BOARD_INFO_ALERT',{userid:this.userid});
        }

        this.$router.push(this.$route.query.returnPath || path);
      },
      talkcommentFold(){
        this.$store.commit('talkList/SET_TALKCOMMENT_FLAG', false);
      }
    }
  }
</script>

<style scoped>
ul li {
    overflow: hidden;
}
.div_style_1{
  float: center;
  width: 20%;
}
.talkcommentdown{
  position: fixed;
  width: 100%;
  bottom: 100px;
  text-align: right;
  padding-top: 10px;
  padding-bottom: 0;
  box-shadow: 0 0 20px 0 rgba(0,0,0,.15);
  z-index : 2000;
}
</style>
