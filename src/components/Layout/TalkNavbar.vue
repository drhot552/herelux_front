<template>
<div class="navbar navbar-expand-lg bg-white" style="position: fixed;width: 100%;bottom: 53px; z-index:2000;">
  <div class="edit_div">
    <div class="container" style="padding-right:0px; padding-left:0px;">
      <div class="image" id="imgzone_1" style="text-align:center;
                                                margin-right: 10px; width:30%;">
      </div>
      <div v-if="imageFlag">
        <div style="position: absolute; margin-left:19%; top:0;">
          <img src="/public/img/btn_close.png" style="width:30px; z-index:0;" v-on:click="FirstImgDelete()" />
        </div>
      </div>
      <label for="file_input_1">
        <img src="/public/img/btn_image.png" style="height: 25px; margin-bottom: 0.5rem;">
        </img>
      </label>
      <input class="talk_textarea" v-model="descript" placeholder="댓글작성.." style="max-height: 35px; height: 30px;">

      </input>
      <a v-on:click="talkWrite()">
        <img src="/public/img/enter_btn.jpg" style="height:25px;margin-bottom: .5rem;">
        </img>
      </a>
    </div>
    <div style="width:100%;">
      <div class="image-upload row">
        <input multiple="multiple" type="file" accept="image/*" id="file_input_1" v-on:change="FirstshowFiles()">
      </div>
    </div>
  </div>
  <modal :show.sync="modalShow" headerClasses="justify-content-center">
    <h4 slot="header" class="title title-up"></h4>
    <div class="modal-view">
      <div style="text-align:center; border-bottom:1px solid hsla(0,0%,53%,.3); padding:5px;" v-for="item in forum">
        <a v-on:click="forumSelect(item.minor_key, item.descript)">{{item.descript}}</a>
      </div>
    </div>
  </modal>
</div>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { WRITEDOMAIN } from '../../api'
import Modal from '../Component/Modal';
export default {
  components:{
    Modal
  },
  computed:{
    ...mapState('product',{
      id : 'id',
      name : 'name',
      brand_name : 'brand_name',
      category_middle_name : 'category_middle_name',
      category_large_name : 'category_large_name'
    }),
    ...mapState('talkList',{
      talkObject : 'talkObject',
      talk_flag : 'talk_flag',
      talknickName : 'talknickName',
      talkCommentObject : 'talkCommentObject',
      talkCommentId : 'talkCommentId',
      talkCommentFlag : 'talkCommentFlag',
      talkCommentName : 'talkCommentName',
      talkCommentdescript : 'talkCommentdescript',
      talkisLoading : 'talkisLoading'
    })
  },
  data(){
    return{
      userid : String,
      login : Boolean,
      descript : '',
      modalShow : false,
      imageFlag : false,
      isLoading  : false
    }
  },
  created(){
    var token = localStorage.getItem('token');
    this.userid = localStorage.getItem('id');
    if(token){
      this.login = true;
    } else{
      this.login = false;
    }
    //초기화
    this.talkInit();
  },
  watch:{
    email_id: function(){
      this.userid = localStorage.getItem('id');
    }
  },
  methods:{
    FirstImgDelete() {
      this.imageFlag = false;
      $('#imgzone_1').empty();
    },
    FirstshowFiles() {
        var div = document.getElementById('imgzone_1');     // The DIV.
        var fi = document.getElementById('file_input_1');           // Get the File input.
        if(fi.files.length > 1 ) {
          alert("한 프레임당 이미지는 최대 1개까지만 가능합니다.");
        }
        else {
          this.imageFlag = true;
          $('#imgzone_1').empty();
          for (var i = 0; i <= fi.files.length - 1; i++) {
                var reader = new FileReader();
                this.$store.commit('talkList/SET_TALK_OBJECT_IMAGE', fi.files[i]);
                reader.onload = function (e) {
                    var img = new Image();
                    img.src = e.target.result;
                    img.setAttribute('style', 'clear:both; width:100%; height:100%;');
                    div.appendChild(img);       // Add the images to the DIV.
                };
                reader.readAsDataURL(fi.files.item(i));
            }
        }

    },
    talkInit(){
      this.$store.commit('talkList/SET_TALKCOMMENT_OBJECT_INIT');
      this.$store.commit('talkList/SET_TALK_OBJECT_INIT');
      this.$store.commit('talkList/SET_TALK_INIT');
      this.FirstImgDelete();

      this.descript = "";
      setTimeout(() => {
        this.$store.commit('talkList/SET_TALK_ISLOADING', false);
      }, 500);
    },
    ImagePopup(){
      this.modalShow();
    },
    talkWrite(){
      let settings = { headers: { 'content-type': 'multipart/form-data' } }
      if(this.descript == ""){
        alert("댓글을 작성해주세요.");
      } else {
        //대댓글이면 대댓글로 입력
        if(this.talkCommentFlag){
          this.$store.commit('talkList/SET_TALKCOMMENT_OBJECT', {talk_id:this.talkCommentId,user_id:this.userid,
            name:this.talkCommentName,descript:this.descript});
          //대댓글 입력
          this.$store.commit('talkList/SET_TALK_ISLOADING', true);
          axios.post( WRITEDOMAIN + '/talkcomment/write', this.talkCommentObject, settings)
           .then(data => {

            this.talkInit();

            this.$store.dispatch('talkList/FETCH_TALK_READMORE',{product_id:this.id, product_name:this.name,
              brand_name:this.brand_name, category_large_name:this.category_large_name, category_middle_name:this.category_middle_name});
            this.$store.commit('talkList/SET_TALKCOMMENT_FLAG', false);

           }).catch(response => {
            console.log("error",response)
           })
        } else {
          //talk입력
          this.$store.commit('talkList/SET_TALK_OBJECT', {id:this.id,name:this.name,nickname:this.talknickName,brand_name:this.brand_name,
          category_large_name:this.category_large_name,category_middle_name:this.category_middle_name,userid:this.userid,descript:this.descript});

          this.$store.commit('talkList/SET_TALK_ISLOADING', true);
          axios.post( WRITEDOMAIN + '/talk/write', this.talkObject, settings)
           .then(data => {
            this.talkInit();
            this.$store.dispatch('talkList/FETCH_TALK_READMORE',{product_id:this.id, product_name:this.name,brand_name:this.brand_name, category_large_name:this.category_large_name, category_middle_name:this.category_middle_name});


           }).catch(response => {
            console.log("error",response)
           })
        }
      }


    }
  }
}
</script>
<style>
.image-upload>input {
  display: none;
}
.talk_textarea{
  box-sizing: border-box;
  margin: 0;
  height: inherit;
  padding: 10px 10px 0;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 7px;
  outline: 0;
  overflow: auto;
  width: 75vw;
}
</style>
