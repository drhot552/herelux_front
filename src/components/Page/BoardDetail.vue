<template>
  <div class="section" style="padding-bottom:130px;">
    <div class="container" style="padding-left:0px; padding-right:0px;">
          <div style="height:70px; border-bottom:1px solid rgba(135, 135, 135, 0.3);" v-if="this.boardDetail.length > 0">
            <div style="padding-left:15px;">
              <h5 v-if="this.boardDetail[0].boardtype < 2" style="margin-top:0px;">
                <b>
                {{`[` + this.boardDetail[0].brand + `]`}}
                {{this.boardDetail[0].subject}}
                </b>
              </h5>
              <h5 v-else-if="this.boardDetail[0].boardtype == 2">
                <b>
                {{`[뭐살까?]`}}
                {{this.boardDetail[0].subject}}
                </b>
              </h5>
              <h5 v-else-if="this.boardDetail[0].boardtype == 3">
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
          <div style="margin-top:10px; padding-left:15px;" v-if="this.boardDetail.length > 0">
            {{this.boardDetail[0].descript}}
          </div>
          <!-- 사진 이미지 set -->
          <div style="margin-top:10px; text-align:center;" v-if="this.boardDetail.length > 0">
            <div v-for="board in boardDetail">
              <img v-if="board.imgurl" v-lazy ="board.imgurl"/>
              <div style="margin:10px;"></div>
            </div>
          </div>
          <!-- 댓글 단 -->
          <div style="margin-top:20px; border-bottom:10px solid rgba(135, 135, 135, 0.3);">
          </div>
          <div style="margin-top:20px;" v-for="item in comment">
            <div style="padding-bottom:5px">
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
              <img src="/public/img/btn_reply.png" style="width:13px; margin-bottom:10px; float:left; margin-left:15px; margin-right:7px;"/>
              <h6 style="float:left; margin-right:15px; font-size:10px;">대댓글</h6>
            </a>
            <a v-else style="margin-bottom:0px; margin-top:0px;" v-on:click="commentDown(item.comment_idx, item.name, item.descript)">
              <img src="/public/img/btn_reply.png" class="img_style"/>
              <h6 style="font-size:10px">대댓글</h6>
            </a>

            <div>
              <a v-if="item.userid == userid" v-on:click="commentDelete(item.comment_idx)" >
                <img src="/public/img/btn_garbage.png" style="width:13px; margin-bottom:10px; float:left;  margin-right:7px;"/>
                <h6 style="font-size:10px">삭제</h6>
              </a>
            </div>

            <!-- 대댓글 보여주기 -->
            <div v-for="comment in commentdownArry" >
              <div v-if="item.comment_idx == comment.comment_idx" style="padding-top:20px;padding-bottom:10px; background: gainsboro;">
                <div style="padding-bottom:5px">
                  <h6 style="padding-left:30px; float:left; ">
                    <b style="float:left; margin-right:11px;">{{comment.name}}</b>
                  </h6>
                  <h6 style="float:left;" v-if="comment.userid == writer">
                    <b class="writer_text">글쓴이</b>
                  </h6>
                  <h6 style="text-align:right; margin-right:20px; font-size:10px; ">{{comment.reg_date}} &ensp; {{comment.reg_time}}</h6>

                </div>
                <div>
                  <h6 style="padding-left:30px; float:left; width:100%; background: gainsboro;">
                    {{comment.descript}}
                  </h6>
                </div>
                <div>
                  <a v-if="item.userid == userid" v-on:click="commentDownDelete(comment.commentdown_idx)" >
                    <img src="/public/img/btn_garbage.png" style="width: 13px; margin-bottom: 10px; float: left; margin-left: 30px; margin-right: 7px;"/>
                    <h6 style="font-size:10px">삭제</h6>
                  </a>
                </div>
              </div>
            </div>
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
  </div>
</template>
<script>
import { comment, board } from '../../api'
import Modal from '../Component/Modal';
export default{
  components:{
    Modal
  },
  data(){
    return{
      board_idx : 0,
      userid : '',
      boardDetail : [],
      comment : [],
      title : '',
      descript : '',
      modalShowComment : false,
      nickName : '',
      writer : '',
      modalFlag : 0,
      commentdownArry : [],
      commentdownFlag : false,
      commentdownName:'',
      commentdownDescript :'',
      comment_idx : 0,
      commentdown_idx : 0
      //comment변수 set
    }
  },
  created(){
    this.board_idx = this.$route.params.board_idx;
    //board_idx set
    this.$store.commit('SET_BOARD_IDX', this.board_idx);
    this.userid = localStorage.getItem('id');
    //댓글 상태변수 set
    this.$store.state.boardCommentFlag = false;
    //게시판 조회
    board.select(this.board_idx,this.$store.state.boardtype).then(data => {
      if(data.length > 0 ){
        this.boardDetail = data;
        this.writer = this.boardDetail[0].userid;
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
    }).catch(error =>{
      console.log(error);
    });

  },
  methods:{
    onClose(){
    this.modalShowComment = false;
    },
    handleOk(){
      //modalFlag = 1 댓글 삽입
      if(this.modalFlag == 1){
        comment.commentInsert(this.board_idx, this.userid, this.nickName, $("#comment").text()).then(data=>{
          $("#comment").text("");
          this.commentDownSelect(); //대댓글조회
          this.commentSelect(); //댓글조회
        }).catch(error=>{
          console.log(error);
        });
      }
      //modalFlag = 2 댓글삭제
      else if(this.modalFlag == 2){
        comment.commentDelete(this.comment_idx).then(data=>{
          this.commentDownSelect(); //대댓글조회
          this.commentSelect();
        }).catch(error=>{
          console.log(error);
        });
      }
      //modalFlag = 3 대댓글 입력
      else if(this.modalFlag == 3){
        comment.commentDown(this.comment_idx, this.board_idx, this.userid, this.nickName, $("#comment").text()).then(data=>{
          $("#comment").text("");
          this.commentFold();
          this.commentDownSelect(); //대댓글조회
          this.commentSelect();
        }).catch(error=>{
          console.log(error);
        });
      }
      //modalFlag == 4 대댓글 삭제
      else {
        comment.commentDownDelete(this.commentdown_idx).then(data=>{
          console.log("commentdowndelete" ,this.commentdown_idx);
          this.commentDownSelect(); //대댓글조회
          this.commentSelect();
        }).catch(error=>{
          console.log(error);
        });
      }

    },
    commentSelect(){
      this.comment = [];
      comment.commentSelect(this.board_idx).then(data =>{
        if(data.length > 0){
          this.modalShowComment = false;
          this.comment = data;

          //댓글리스트에 내 아이디가 있는지 체크 && 글 작성자가 아닌지 체크 -> 없으면 랜덤으로 아이디 부여
          for(var i = 0; i < data.length; i++){
            if(this.userid == data[i].userid && !this.$store.state.boardCommentFlag){
              this.nickName = data[i].name;
            }
          }
        }
      }).catch(error=>{
        console.log(error);
      });
    },
    commentDownSelect(){
      this.commentdownArry = [];
      comment.commentDownSelect(this.board_idx).then(data =>{
        if(data.length > 0){
          console.log(data[0].comment_idx);
          this.modalShowComment = false;
          this.commentdownArry = data;

          //댓글리스트에 내 아이디가 있는지 체크 && 글 작성자가 아닌지 체크 -> 없으면 랜덤으로 아이디 부여
          for(var i = 0; i < data.length; i++){
            if(this.userid == data[i].userid && !this.$store.state.boardCommentFlag){
              this.nickName = data[i].name;
            }
          }

        }
      }).catch(error=>{
        console.log(error);
      });
    },
    commentPopup(){
      //comment 등록
      this.modalFlag = 1
      if($("#comment").text() == ""){
          alert("댓글을 입력하세요.");
      }
      else{
        this.title = "댓글등록";
        this.descript ="댓글을 등록하시겠습니까?";
        this.modalShowComment = true;
      }
    },
    commentDownPopup(){
      //comment 등록
      this.modalFlag = 3
      if($("#comment").text() == ""){
          alert("댓글을 입력하세요.");
      }
      else{
        this.title = "대댓글등록";
        this.descript ="대댓글을 등록하시겠습니까?";
        this.modalShowComment = true;
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
</style>
