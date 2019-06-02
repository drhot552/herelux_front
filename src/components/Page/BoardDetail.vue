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
          <!-- image set -->
          <div style="margin-top:10px; text-align:center;" v-if="this.boardDetail.length > 0">
            <div v-for="item in boardDetail">
              <img v-lazy ="item.imgurl"/>
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
                <a v-if="item.userid == userid" v-on:click="commentDelete(item.comment_idx)" style="text-align:right; margin-right:20px; float:right">
                  <img src="/public/img/btn_garbage.png" style="width:15px;"/>
                </a>
              </h6>
            </div>
          </div>
    </div>
    <!-- bottom 댓글쓰기 -->
    <div class="navbar navbar-expand-lg bg-white" style="position: fixed;width: 100%;bottom: 53px;">
      <div class="edit_div">
        <div class="container" style="padding-right:0px; padding-left:0px;">
          <div class="comment_textarea"  contenteditable="true" id="comment" placeholder="댓글작성.." style="width: 91%; max-height: 35px; height: 30px; float:left;">

          </div>
          <a v-on:click="commentPopup()">
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
import { board } from '../../api'
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

    }
  },
  created(){
    this.board_idx = this.$route.params.board_idx;
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
        this.commentSelect();
      }
    }).catch(error =>{
      console.log(error);
    });

  },
  methods:{
    commentSelect(){
      this.comment = [];
      board.commentSelect(this.board_idx).then(data =>{
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
    onClose(){
      this.modalShowComment = false;
    },
    handleOk(){
      //modalFlag = 1 댓글 삽입
      if(this.modalFlag == 1){
        board.commentInsert(this.board_idx, this.userid, this.nickName, $("#comment").text()).then(data=>{
          $("#comment").text("");
          this.commentSelect();
        }).catch(error=>{
          console.log(error);
        });
      }
      //modalFlag = 2 댓글삭제
      else if(this.modalFlag == 2){
        board.commentDelete(this.comment_idx).then(data=>{
          this.commentSelect();
        }).catch(error=>{
          console.log(error);
        });
      }

    },
    commentPopup(){
      //comment 등록
      this.modalFlag = 1
      if($("#comment").text() == ""){
          alert("댓글을 입력하세요.");
      }
      else{
        this.title = "댓글등록";
        this.descript ="댓글을 등록하시겠습니까??";
        this.modalShowComment = true;
      }
    },
    commentDelete(comment_idx){
      this.comment_idx = comment_idx;
      this.modalFlag = 2;
      this.title = "댓글삭제";
      this.descript ="댓글을 삭제하시겠습니까??";
      this.modalShowComment = true;
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
</style>
