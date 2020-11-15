<template>
<div class="content">
  <div class="media-area">
    <div v-bind:class="{ blur: !talk_flag }">
      <div style="margin-top:10px; margin-bottom:10px;">
        <div style="padding-bottom:5px; padding-top:15px;">
          <h6 style="padding-left:15px; float:left;">
            <b style="float:left; margin-right:11px;">{{name}}</b>
          </h6>
          <h6 style="text-align:right; margin-right:20px; font-size:10px;">{{reg_dttm}}</h6>

        </div>
        <div>
          <h6 v-bind:class="{ img_descript_style: img_url!=null, descript_style: img_url==null }">
            {{descript}}
          </h6>

          <div v-if="img_url" style="text-align:right; padding-right:15px;" v-on:click="ImagePopup()">
            <img v-img v-bind:src="img_url" style="width:25%;"></img>
          </div>
        </div>
        <div style="width:100%;">
          <a v-if="userid == login_id" style="margin-bottom:0px; margin-top:0px;" v-on:click="commentDown(talk_id, name, descript)">
            <img src="/public/img/btn_reply.png" style="width:13px; margin-top:7px; float:left; margin-left:15px; margin-right:7px;"/>
            <span style="float:left; margin-right:15px; font-size:10px;">대댓글</span>
          </a>
          <a v-else style="margin-bottom:0px; margin-top:0px;" v-on:click="commentDown(talk_id, name, descript)">
            <img src="/public/img/btn_reply.png" class="img_style"/>
            <span style="font-size:10px">대댓글</span>
          </a>
          <a v-if="userid == login_id" v-on:click="talkDelete(talk_id, descript)" >
            <img src="/public/img/btn_garbage.png" style="width:13px;  margin-right:7px;"/>
            <span style="font-size:10px">삭제</span>
          </a>
        </div>
        <!-- 대댓글 보여주기 -->
        <div style="margin-top: 10px;">
          <div v-for="comment in commentdownArry">
            <div v-if="talk_id == comment.talk_id" style="padding-bottom:10px; background: gainsboro;">
              <div style="padding-top: 10px; padding-bottom:5px">
                <h6 style="padding-left:30px; float:left; ">
                  <b style="float:left; margin-right:11px;">{{comment.name}}</b>
                </h6>
                <h6 style="text-align:right; margin-right:20px; font-size:10px; ">{{comment.reg_dttm}}</h6>

              </div>
              <div>
                <h6 style="margin-bottom: 0px;padding-bottom: 10px; padding-left:30px; float:left; width:100%; background: gainsboro;">
                  {{comment.descript}}
                </h6>
              </div>
              <a v-if="comment.user_id == login_id" v-on:click="commentDelete(comment.comment_id,talk_id,comment.descript)" >
                <img src="/public/img/btn_garbage.png" style="width: 13px; margin-left: 30px; margin-right: 7px;"/>
                <span style="font-size:10px; margin-bottom: 0px;">삭제</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import { product, talkcomment, talk } from '../../api'

export default {
  props:{
    product_id :Number,
    talk_id : Number,
    userid : String,
    product_name : String,
    name : String,
    descript : String,
    brand_name : String,
    category_large : String,
    category_middle : String,
    reg_dttm :String,
    img_url : String
  },
  data(){
    return{
      producttalk : [],
      commentdownArry : [],
      login_id : "",
      nickname : "",
      modalShow : false,
      title : "",
      descript : ""
    }
  },
  created(){
    this.login_id = localStorage.getItem('id');
    if(this.talk_id > 0){
      this.talkcommentlist();
      //유저 아이디 확인 -> 없으면 랜덤으로 set
      this.talknickname();
    }
  },
  computed:{
    ...mapState('talkList', {
      talk_flag: 'talk_flag'
    }),
    ...mapState('product', {
      id: 'id'
    })
  },
  methods:{
    ImagePopup(){

    },
    onLogin(page){
        this.$router.push(this.$route.query.returnPath || page);
    },
    talkcommentlist(){
      talkcomment.list(this.talk_id).then(data=>{
        this.commentdownArry = data;
      }).catch(error =>{
        console.log(error);
      })
    },
    commentDown(talk_id, name, descript){
      this.$store.commit('talkList/SET_TALKCOMMENT_PARAM', {talkCommentFlag:true, talkCommentId:talk_id, talkCommentdescript:descript, talkCommentName:name});
    },
    talknickname(){
      //닉네임이있는지 확인.
      talk.nickname(this.talk_id, this.login_id).then(data=>{
        if(data.length > 0){
          this.$store.commit('talkList/SET_TALK_NICKNAME', data[0].name);
        }
      }).catch(error =>{
        console.log(error);
      })
    },
    commentDelete(comment_id,talk_id,descript){
      this.$store.commit('talkList/SET_TALK_MODAL', {talkmodalShow:true, talkmodalcommentId:comment_id, talkmodalId:talk_id, talkmodalTitle : "대댓글을 삭제하시겠습니까?",
        talkmodalDescript:descript,talkmodalGubun:"comment"});
    },
    talkDelete(talk_id, descript){
      this.$store.commit('talkList/SET_TALK_MODAL', {talkmodalShow:true, talkmodalcommentId:0 ,talkmodalId:talk_id, talkmodalTitle : "댓글을 삭제하시겠습니까?",
        talkmodalDescript:descript, talkmodalGubun:"talk"});
    }
  }
}
</script>
<style>
.blur {
  filter: blur(6px);
}
.img_style{
  width: 13px;
  margin-left: 15px;
  float: left;
  margin-right:7px;
  margin-top:7px;
}
.img_descript_style{
  padding-left:15px;
  float:left;
}
.descript_style{
  padding-left:15px;
}
</style>
