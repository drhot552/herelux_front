<template>
  <div>
    <div v-if="talk_id == commenttalk_id" style="padding-bottom:10px; background: gainsboro;">
      <div style="padding-top: 10px; padding-bottom:5px">
        <h6 style="padding-left:30px; float:left; ">
          <b style="float:left; margin-right:11px;">{{name}}</b>
        </h6>
        <h6 style="text-align:right; margin-right:20px; font-size:10px; ">{{reg_dttm}}</h6>

      </div>
      <div>
        <h6 style="margin-bottom: 0px;padding-bottom: 10px; padding-left:30px; float:left; width:100%; background: gainsboro;">
          {{descript}}
        </h6>
      </div>
      <a v-if="likeFlag" style="margin-bottom:0px; margin-top:0px;" v-on:click="commentDownlike()">
        <img src="/public/img/btn_heart_over.png" class="img_style_downlike"/>
        <span style="font-size:10px; margin-right:15px;">유용해요 {{talkcomment_like}}</span>
      </a>
      <a v-else style="margin-bottom:0px; margin-top:0px;" v-on:click="commentDownlike()">
        <img src="/public/img/btn_heart_default.png" class="img_style_downlike"/>
        <span style="font-size:10px; margin-right:15px;">유용해요 {{talkcomment_like}}</span>
      </a>
      <a v-if="commentuser_id == login_id" v-on:click="commentDelete()" >
        <img src="/public/img/btn_garbage.png" style="width: 13px; margin-left: 30px; margin-right: 7px;"/>
        <span style="font-size:10px; margin-bottom: 0px;">삭제</span>
      </a>
    </div>
  </div>
</template>
<script>
import { talkcomment } from '../../api'
export default{
  props:{
    product_id :Number,
    talk_id : Number,
    comment_id : Number,
    name : String,
    descript : String,
    talkcomment_like : Number,
    commenttalk_id : Number,
    reg_dttm : String,
    commentuser_id : String
  },
  data(){
    return{
      login_id : "",
      likeFlag : false
    }
  },
  created(){
    this.login_id = localStorage.getItem('id');
    if(this.login_id != ""){
      this.commentDownlikelist();
    }

  },
  methods:{
    commentDownlikelist(){
      //닉네임이있는지 확인.
      talkcomment.likelist(this.commenttalk_id, this.comment_id, this.login_id, this.product_id).then(data=>{
        console.log(data);
        if(data[0].cnt > 0){
          this.likeFlag = true;
        }
      }).catch(error =>{
        console.log(error);
      })
    },
    commentDownlike(){
      talkcomment.like(this.commenttalk_id, this.comment_id, this.login_id, this.product_id).then(data=>{
        if(data == 200){
          this.talkcomment_like = this.talkcomment_like + 1;
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
    commentDelete(){
      this.$store.commit('talkList/SET_TALK_MODAL', {talkmodalShow:true, talkmodalcommentId:this.comment_id, talkmodalId:this.talk_id, talkmodalTitle : "대댓글을 삭제하시겠습니까?",
        talkmodalDescript:this.descript,talkmodalGubun:"comment"});
    }
  }


}
</script>
<style>
.img_style_downlike{
  width: 13px;
  margin-left:15px;
  margin-right:7px;
}
</style>
