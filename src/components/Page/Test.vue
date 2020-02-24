
<template>
  <div class="section" style="padding-bottom:130px;">
    <div class="container" style="padding-left:0px; padding-right:0px;">
          <div style="padding-bottom:15px;" v-if="this.boardDetail.length > 0">
            <div v-if="this.boardDetail[0].boardtype < 3">
              <Adsense v-bind:slot="6659873318">
              </Adsense>
            </div>
            <div v-else-if="this.boardDetail[0].boardtype == 3">
              <Adsense v-bind:slot="2337484924">
              </Adsense>
            </div>
            <div v-else-if="this.boardDetail[0].boardtype == 4">
              <Adsense v-bind:slot="7043016693">
              </Adsense>
            </div>
          </div>
          <div style="height:70px; border-bottom:1px solid rgba(135, 135, 135, 0.3);" v-if="this.boardDetail.length > 0">
            <div style="padding-left:15px;">
              <h5 v-if="this.boardDetail[0].boardtype < 3" style="margin-top:0px;">
                <b>
                {{`[` + this.boardDetail[0].brand + `]`}}
                {{this.boardDetail[0].subject}}
                </b>
              </h5>
              <h5 v-else-if="this.boardDetail[0].boardtype == 3">
                <b>
                {{`[뭐살까?]`}}
                {{this.boardDetail[0].subject}}
                </b>
              </h5>
              <h5 v-else-if="this.boardDetail[0].boardtype == 4">
                <b>
                {{`[자유게시판]`}}
                {{this.boardDetail[0].subject}}
                </b>
              </h5>
              <h6 class="h6_style"> {{this.boardDetail[0].name}} </h6>
              <h6 class="h6_style"> | </h6>
              <h6 class="h6_style"> {{`작성시간 : ` + this.boardDetail[0].reg_date}} </h6>
              <h6 class="h6_style"> | </h6>
              <h6 class="h6_style"> {{`조회수 : ` + this.boardDetail[0].views}} </h6>
            </div>
          </div>
          <!-- url 내용 set -->
          <div style="margin-top:10px; padding-left:15px;" v-if="this.boardDetail.length > 0">
            <div v-for="url in boardUrl">
              <table v-if="url.boardurl" style="width:100%;">
                <tbody>
                 <tr>
                   <th>관련링크</th>
                   <td class="url_ellipsis"><a v-on:click="urlClick(url.boardurl)">{{url.boardurl}}</a></td>
                 </tr>
               </tbody>
              </table>
            </div>

          </div>
          <!-- 글 내용 set -->
          <div id="descript_board" v-html="this.boardDetail[0].descript" style="margin-top:10px; padding-left:15px; line-height: 2em; padding-right: 15px;" v-if="this.boardDetail.length > 0">
          </div>
          <!-- 사진 이미지 set -->
          <div style="margin-top:10px; text-align:center;" v-if="this.boardDetail.length > 0">
            <div v-for="board in boardImg">
              <img v-if="board.imgurl" v-lazy ="board.imgurl"/>
              <div style="margin:10px;"></div>
            </div>
          </div>
          <!-- 댓글 단 -->
          <div style="margin-top:20px; border:10px solid rgba(135, 135, 135, 0.3);" v-if="this.boardDetail.length > 0">
            <div v-if="this.boardDetail[0].boardtype < 3">
              <Adsense v-bind:slot="5203305505">
              </Adsense>
            </div>
            <div v-else-if="this.boardDetail[0].boardtype == 3">
              <Adsense v-bind:slot="2529056619">
              </Adsense>
            </div>
            <div v-else-if="this.boardDetail[0].boardtype == 4">
              <Adsense v-bind:slot="9477608349">
              </Adsense>
            </div>
          </div>
          <div style="margin-top:10px; margin-bottom:10px;" v-for="item in comment">
            <div style="padding-bottom:5px; padding-top:15px;">
              <h6 style="padding-left:15px; float:left;">
                <b style="float:left; margin-right:11px;">{{item.name}}</b>
              </h6>
              <h6 style="float:left;" v-if="item.userid == writer">
                <b class="writer_text">글쓴이</b>
              </h6>
              <h6 style="text-align:right; margin-right:20px; font-size:10px;">{{item.reg_date}} &ensp; {{item.reg_time}}</h6>

            </div>
            <div>
              <h6 style="padding-left:15px; float:left; width:100%;">
                {{item.descript}}
              </h6>
            </div>
            <a v-if="item.userid == userid" style="margin-bottom:0px; margin-top:0px;" v-on:click="commentDown(item.comment_idx, item.name, item.descript)">
              <img src="/public/img/btn_reply.png" style="width:13px; margin-top:7px; float:left; margin-left:15px; margin-right:7px;"/>
              <span style="float:left; margin-right:15px; font-size:10px;">대댓글</span>
            </a>
            <a v-else style="margin-bottom:0px; margin-top:0px;" v-on:click="commentDown(item.comment_idx, item.name, item.descript)">
              <img src="/public/img/btn_reply.png" class="img_style"/>
              <span style="font-size:10px">대댓글</span>
            </a>
            <a v-if="item.userid == userid" v-on:click="commentDelete(item.comment_idx)" >
              <img src="/public/img/btn_garbage.png" style="width:13px;  margin-right:7px;"/>
              <span style="font-size:10px">삭제</span>
            </a>

            <!-- 대댓글 보여주기 -->
            <div style="margin-top: 10px;"  >
              <div v-for="comment in commentdownArry">
                <div v-if="item.comment_idx == comment.comment_idx" style="padding-bottom:10px; background: gainsboro;">
                  <div style="padding-top: 10px; padding-bottom:5px">
                    <h6 style="padding-left:30px; float:left; ">
                      <b style="float:left; margin-right:11px;">{{comment.name}}</b>
                    </h6>
                    <h6 style="float:left;" v-if="comment.userid == writer">
                      <b class="writer_text">글쓴이</b>
                    </h6>
                    <h6 style="text-align:right; margin-right:20px; font-size:10px; ">{{comment.reg_date}} &ensp; {{comment.reg_time}}</h6>

                  </div>
                  <div>
                    <h6 style="margin-bottom: 0px;padding-bottom: 10px; padding-left:30px; float:left; width:100%; background: gainsboro;">
                      {{comment.descript}}
                    </h6>
                  </div>
                  <a v-if="comment.userid == userid" v-on:click="commentDownDelete(comment.commentdown_idx)" >
                    <img src="/public/img/btn_garbage.png" style="width: 13px; margin-left: 30px; margin-right: 7px;"/>
                    <span style="font-size:10px; margin-bottom: 0px;">삭제</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
          <div style="height:40vh;">

          </div>
    </div>
    <!--대댓글 글쓰기(Write) -->
    <div v-if="commentdownFlag" class="commentdown navbar-expand-lg bg-white">
      <div class="container" style="padding-right:0px; padding-left:0px;">
        <a v-on:click="commentFold()">
          <h6 style="margin-right:10px; float:right;">
            <b>
              X
            </b>
          </h6>
          <h6 style="padding-left:15px; text-align:left">
            <b>{{commentdownName}}</b>
          </h6>
          <h6 style="padding-left:15px; text-align:left; float:left; width:100%;">
              {{commentdownDescript}}
          </h6>
        </a>
      </div>
    </div>
    <!-- bottom 댓글쓰기(Write) -->
    <div class="navbar navbar-expand-lg bg-white" style="position: fixed;width: 100%;bottom: 53px;">
      <div class="edit_div">
        <div class="container" style="padding-right:0px; padding-left:0px;">
          <div class="comment_textarea"  contenteditable="true" id="comment" placeholder="댓글작성.." style="width: 91%; max-height: 35px; height: 30px; float:left;">

          </div>
          <a v-if="commentdownFlag" v-on:click="commentDownPopup()">
            <div style="text-align:center;">
              <i class="now-ui-icons ui-1_send"></i>
            </div>
          </a>
          <a v-else v-on:click="commentPopup()">
            <div style="text-align:center;">
              <i class="now-ui-icons ui-1_send"></i>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- pop up -->
    <modal :show.sync="modalShowComment" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">{{title}}</h4>
      <p>{{descript}}</p>
      <template slot="footer" class="justify-content-center">
        <button class="btn btn-secondary" v-on:click="onClose()">Close</button>
        <button class="btn btn-primary" v-on:click="handleOk()">Ok</button>
      </template>
    </modal>

    <!-- loading -->
    <loading :active.sync="this.$store.state.isLoading"
              :can-cancel="true"
              :is-full-page="true"
              :z-index="1060">
    </loading>
  </div>
</template>
<script>
import { comment, board, info } from '../../api'
import Modal from '../Component/Modal';
import Loading from 'vue-loading-overlay';
import Adsense from '../Component/Adsense'
import 'vue-loading-overlay/dist/vue-loading.css';
import Cauly from '../Card/Cauly'

export default{
  components:{
    Modal,
    Loading,
    Cauly,
    Adsense
  },
  props:{
    board_idx : Number
  },
  data(){
    return{
      userid : '',
      boardDetail : [],
      boardImg : [],
      boardUrl : [],
      comment : [],
      title : String,
      descript : String,
      modalShowComment : false,
      nickName : String,
      writer : String,
      modalFlag : 0,
      commentdownArry : [],
      commentdownFlag : false,
      commentdownName :String,
      commentdownDescript :String,
      comment_idx : 0,
      commentdown_idx : 0
      //comment변수 set
    }
  },
  created(){
    this.board_idx = 1;
    this.listBoardDetail()
  },
  methods:{
    listBoardDetail(){
      this.userid = localStorage.getItem('id');

      //댓글 상태변수 set
      this.$store.state.boardCommentFlag = false;
      //게시판 조회
      this.$store.commit('ISLOADING', true);

      //해당 알림 확인 시
      if(this.userid != ''){
        info.boardupdate(this.userid, this.board_idx).then(data=>{
          if(data == 200){
            this.$store.dispatch('SELECT_BOARD_INFO_ALERT',{userid:this.userid});
          } else {
            this.errorAlert();
          }
        }).catch(error =>{
          console.log("error",error);
          //alert 후 페이지 이동
          this.errorAlert();
        });
      }
      // boardimg
      board.etc(this.board_idx, 1).then(data=>{
        if(data.length > 0){
          this.boardImg = data
        }
      }).catch(error =>{
        console.log("error",error);
        //alert 후 페이지 이동
        this.errorAlert();
      });
      // boardurl
      board.etc(this.board_idx, 2).then(data=>{
        if(data.length > 0){
          this.boardUrl = data
        }
      }).catch(error =>{
        console.log("error",error);
        //alert 후 페이지 이동
        this.errorAlert();
      });
      board.select(this.board_idx,this.$store.state.boardtype).then(data => {
        if(data.length > 0 ){
          var url = data[0].descript.match(/(http(s)?:\/\/|www.)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}([\/a-z0-9-%#?&=\w])+(\.[a-z0-9]{2,4}(\?[\/a-z0-9-%#?&=\w]+)*)*/gi);
          this.boardDetail = data;
          this.writer = this.boardDetail[0].userid;
          if(url != null){
            this.boardDetail[0].descript=this.boardDetail[0].descript.replace(url, url.toString().link(url));

          }
          //this.boardDetail[0].descript += url.toString().link(url);

          //작성자 Id와 같은지 체크 같으면 댓글 시 같은 닉네임을 사용한다.
          if(this.userid == data[0].userid){
            this.nickName = data[0].name;
            this.$store.state.boardCommentFlag = true;
          }
          else {
            this.$store.state.boardCommentFlag = false;
          }

          this.commentDownSelect();
          this.commentSelect();
        }
        this.$store.commit('ISLOADING', false);
      }).catch(error =>{
        console.log("error",error);
        //alert 후 페이지 이동
        this.errorAlert();
      });
    },
    urlClick(url){
      //gtag('event','유투브상품클릭',{'event_category':title,'event_label':url});
      if(navigator.userAgent.match(/Android|Tablet/i)){
        if(navigator.userAgent.match(/herelux_app_and/i)){
          window.android.bridge(url);
        }
        else{
          window.open(url, '_blank');
        }
      }
      else if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
        if(navigator.userAgent.match(/herelux_app_ios/i)){
          window.webkit.messageHandlers.YOURMETHOD.postMessage('url_herelux|'+url.trim());
        }
        else{
          window.open(url, '_blank');
        }
      }
      else {
        window.open(url, '_blank');
      }
    },
    onClose(){
    this.modalShowComment = false;
    },
    handleOk(){
      //modalFlag = 1 댓글 삽입
      this.$store.commit('ISLOADING', true);

      if(this.modalFlag == 1){
        comment.commentInsert(this.board_idx, this.userid, this.nickName, $("#comment").text()).then(data=>{
          $("#comment").text("");
          this.commentDownSelect(); //대댓글조회
          this.commentSelect(); //댓글조회
          this.$store.commit('ISLOADING', false);
        }).catch(error=>{
          console.log(error);
          this.errorAlert();
        });
      }
      //modalFlag = 2 댓글삭제
      else if(this.modalFlag == 2){
        comment.commentDelete(this.comment_idx).then(data=>{
          this.commentDownSelect(); //대댓글조회
          this.commentSelect();
          this.$store.commit('ISLOADING', false);
        }).catch(error=>{
          console.log(error);
          this.errorAlert();
        });
      }
      //modalFlag = 3 대댓글 입력
      else if(this.modalFlag == 3){
        comment.commentDown(this.comment_idx, this.board_idx, this.userid, this.nickName, $("#comment").text()).then(data=>{
          $("#comment").text("");
          this.commentFold();
          this.commentDownSelect(); //대댓글조회
          this.commentSelect();
          this.$store.commit('ISLOADING', false);
        }).catch(error=>{
          console.log(error);
          this.errorAlert();
        });
      }
      //modalFlag == 4 대댓글 삭제
      else if(this.modalFlag == 4){
        comment.commentDownDelete(this.commentdown_idx).then(data=>{
          this.commentDownSelect(); //대댓글조회
          this.commentSelect();
          this.$store.commit('ISLOADING', false);
        }).catch(error=>{
          console.log(error);
          this.errorAlert();
        });
      }
      else {
        this.modalShowComment = false;
        setTimeout(() => {
          this.$store.commit('ISLOADING', false);
          this.$router.push(this.$route.query.returnPath || '/login');
        }, 300);
      }

    },
    commentSelect(){
      this.comment = [];
      this.modalShowComment = false;
      this.$store.commit('ISLOADING', true);

      comment.commentSelect(this.board_idx).then(data =>{
        if(data.length > 0){
          this.comment = data;

          //댓글리스트에 내 아이디가 있는지 체크 && 글 작성자가 아닌지 체크 -> 없으면 랜덤으로 아이디 부여
          for(var i = 0; i < data.length; i++){
            if(this.userid == data[i].userid && !this.$store.state.boardCommentFlag){
              this.nickName = data[i].name;
            }
          }
        }
        this.$store.commit('ISLOADING', false);
      }).catch(error=>{
        console.log(error);
        this.errorAlert();
      });
    },
    commentDownSelect(){
      this.commentdownArry = [];
      this.modalShowComment = false;
      this.$store.commit('ISLOADING', true);

      comment.commentDownSelect(this.board_idx).then(data =>{
        if(data.length > 0){
          this.commentdownArry = data;

          //댓글리스트에 내 아이디가 있는지 체크 && 글 작성자가 아닌지 체크 -> 없으면 랜덤으로 아이디 부여
          for(var i = 0; i < data.length; i++){
            if(this.userid == data[i].userid && !this.$store.state.boardCommentFlag){
              this.nickName = data[i].name;
            }
          }

        }
        this.$store.commit('ISLOADING', false);
      }).catch(error=>{
        console.log(error);
        this.errorAlert();
      });
    },
    commentPopup(){
      //comment 등록

      if($("#comment").text() == ""){
          alert("댓글을 입력하세요.");
      } else {
        if(this.userid == null){
          this.modalShowComment =true;
          this.title = "로그인"
          this.descript = "로그인이 되어있지 않습니다. 로그인을 하시겠습니까?"
          this.modalFlag = 5
        }
        else{
          this.title = "댓글등록";
          this.descript ="댓글을 등록하시겠습니까?";
          this.modalShowComment = true;
          this.modalFlag = 1;
        }
      }

    },
    commentDownPopup(){
      //comment 등록
      this.modalFlag = 3
      if($("#comment").text() == ""){
          alert("댓글을 입력하세요.");
      }
      else{
        if(this.userid == null){
          this.modalShowComment =true;
          this.title = "로그인"
          this.descript = "로그인이 되어있지 않습니다. 로그인을 하시겠습니까?"
          this.modalFlag = 5
        } else {
          this.title = "대댓글등록";
          this.descript ="대댓글을 등록하시겠습니까?";
          this.modalShowComment = true;
        }
      }
    },
    commentDelete(comment_idx){
      this.comment_idx = comment_idx;
      this.modalFlag = 2;
      this.title = "댓글삭제";
      this.descript ="댓글을 삭제하시겠습니까?";
      this.modalShowComment = true;
    },
    commentDownDelete(commentdown_idx){
      this.commentdown_idx = commentdown_idx;
      this.modalFlag = 4;
      this.title = "대댓글삭제";
      this.descript ="대댓글을 삭제하시겠습니까?";
      this.modalShowComment = true;
    },
    commentDown(comment_idx, name, descript){
      this.commentdownFlag = true;
      this.comment_idx = comment_idx;
      this.commentdownName = name;
      this.commentdownDescript = descript;
    },
    commentFold(){
      this.commentdownFlag = false;
    },
    errorAlert(){
      this.$router.push(this.$route.query.returnPath || '/error');
    }
  }
}
</script>
<style>
.h6_style{
  float:left;
  margin-right:10px;
  font-size :10px;
}
.img_style{
  width: 13px;
  margin-left: 15px;
  float: left;
  margin-right:7px;
  margin-top:7px;
}
.edit_div{
  line-height: 1;
  color: #181818;
  width: 100%;
  height: inherit;
  background-color: white;
}
.edit_container{
  overflow: hidden;
  height: inherit;
  background-color: #fff;
}
[contenteditable=true]:empty:before{
  content: attr(placeholder);
  color:#888;
  font-size: small;
  display: block; /* For Firefox */
}
.comment_textarea{
  box-sizing: border-box;
  margin: 0;
  height: inherit;
  padding: 10px 10px 0px;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 7px;
  outline: 0;
  overflow: auto;
}
.writer_text{
  background: black;
  font-size: 10px;
  color: white;
  padding: 3px;
  border-radius:15%;
}
.commentdown{
  position: fixed;
  width: 100%;
  bottom: 100px;
  text-align: right;
  padding-top: 10px;
  padding-bottom: 0;
  box-shadow: 0 0 20px 0 rgba(0,0,0,.15);
}
.url_ellipsis{
  width: 230px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  font-size:0.9em;
  color:#17a2b8;
  text-decoration:underline;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
