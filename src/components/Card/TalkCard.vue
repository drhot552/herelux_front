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
          <a style="margin-bottom:0px; margin-top:0px;" v-on:click="commentDown()">
            <img src="/public/img/btn_reply.png" style="width:13px; margin-top:7px; float:left; margin-left:15px; margin-right:7px;"/>
            <span style="float:left; margin-right:15px; font-size:10px;">대댓글</span>
          </a>
          <a v-if="likeFlag" style="margin-bottom:0px; margin-top:0px;" v-on:click="commentlike()">
            <img src="/public/img/btn_heart_over.png" class="img_style_like"/>
            <span style="font-size:10px; margin-right:15px; ">유용해요 {{talk_like}}</span>
          </a>
          <a v-else style="margin-bottom:0px; margin-top:0px;" v-on:click="commentlike()">
            <img src="/public/img/btn_heart_default.png" class="img_style_like"/>
            <span style="font-size:10px; margin-right:15px; ">유용해요 {{talk_like}}</span>
          </a>
          <a v-if="userid == login_id" v-on:click="talkDelete()" >
            <img src="/public/img/btn_garbage.png" style="width:13px;  margin-right:7px;"/>
            <span style="font-size:10px">삭제</span>
          </a>
        </div>
        <!-- 대댓글 보여주기 -->
        <div style="margin-top: 10px;">
          <div v-for="comment in commentdownArry">
            <ProductCommentDownCard v-bind:product_id="product_id"
                                    v-bind:talk_id="talk_id"
                                    v-bind:commenttalk_id="comment.talk_id"
                                    v-bind:comment_id="comment.comment_id"
                                    v-bind:name="comment.name"
                                    v-bind:descript="comment.descript"
                                    v-bind:talkcomment_like="comment.talkcomment_like"
                                    v-bind:reg_dttm="comment.reg_dttm"
                                    v-bind:commentuser_id="comment.user_id">
            </ProductCommentDownCard>
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
import ProductCommentDownCard from '../Card/ProductCommentDownCard'
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
    img_url : String,
    talk_like : Number
  },
  data(){
    return{
      producttalk : [],
      commentdownArry : [],
      login_id : "",
      nickname : "",
      modalShow : false,
      title : "",
      descript : "",
      like_id : "",
      likeFlag : false
    }
  },
  created(){
    this.login_id = localStorage.getItem('id');
    if(this.talk_id > 0 && this.login_id != ""){
      this.talkcommentlist();
      //유저 아이디 확인 -> 없으면 랜덤으로 set
      this.talknickname();
      //내가 좋아요 누른거 체크
      this.commentlikelist();
    }
  },
  components:{
    ProductCommentDownCard
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
    commentDown(){
      this.$store.commit('talkList/SET_TALKCOMMENT_PARAM', {talkCommentFlag:true, talkCommentId:this.talk_id, talkCommentdescript:this.descript, talkCommentName:this.name});
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
    commentlikelist(){
      //닉네임이있는지 확인.
      talk.likelist(this.talk_id, this.login_id, this.product_id).then(data=>{
        if(data[0].cnt > 0){
          this.likeFlag = true;
        }
      }).catch(error =>{
        console.log(error);
      })
    },
    commentlike(){
      talk.like(this.talk_id, this.login_id, this.product_id).then(data=>{
        if(data == 200){
          this.talk_like = this.talk_like + 1;
          this.$notify({
             group: 'alert',
             title: '이글이 유용하군요!',
             duration: 500
           });
           this.likeFlag = true;
        } else {
          this.$notify({
             group: 'alert',
             title: '이미 이글에 유용하다를 누르셨어요.',
             duration: 500
           });
        }
      }).catch(error =>{
        console.log(error);
      })
    },
    talkDelete(){
      this.$store.commit('talkList/SET_TALK_MODAL', {talkmodalShow:true, talkmodalcommentId:0 ,talkmodalId:this.talk_id, talkmodalTitle : "댓글을 삭제하시겠습니까?",
        talkmodalDescript:this.descript, talkmodalGubun:"talk"});
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
.img_style_like{
  width: 13px;
  margin-right:7px;
}
.img_descript_style{
  padding-left:15px;
  float:left;
}
.descript_style{
  padding-left:15px;
}
</style>
