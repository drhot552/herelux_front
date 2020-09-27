<template>
    <nav class="navbar navbar-expand-lg bg-white fixed-top" v-bind:class="{main_web_navbar : this.$store.state.webFlag}">
      <div class="container">
        <div class="write_style" style="text-align:left;">
          <router-link class="navbar-brand" to="/" style="margin:0">
                    취소
          </router-link>
        </div>
        <div class="write_style_middle">
          <a v-on:click="select()"> {{this.$store.state.writeBoard_name}} </a>
          <i v-if="this.$store.state.writeBoard_name != ''" class="now-ui-icons arrows-1_minimal-down" style="font-size:10px;"></i>
        </div>
        <div class="write_style" style="text-align:right;">
           <div style="color:#888; font-size:1.2em;" v-on:click="checklist()"> 등록 </div>
        </div>

      </div>
      <!--popup -->
      <modal :show.sync="modalShowWrite" headerClasses="justify-content-center">
        <h4 slot="header" class="title title-up">{{title}}</h4>
        <p>{{descript}}</p>
        <template slot="footer" class="justify-content-center">
          <button class="btn btn-secondary" v-on:click="onClose()">Close</button>
          <button class="btn btn-primary" v-on:click="handleOk()">Ok</button>
        </template>
      </modal>

      <modal :show.sync="modalShow" headerClasses="justify-content-center">
        <h4 slot="header" class="title title-up"></h4>
        <div class="modal-view">
          <div style="text-align:center; border-bottom:1px solid hsla(0,0%,53%,.3); padding:5px;" v-for="item in forum">
            <a v-on:click="forumSelect(item.minor_key, item.descript)">{{item.descript}}</a>
          </div>
        </div>
      </modal>
      <!-- loading -->
      <loading :active.sync="this.$store.state.isLoading"
                :can-cancel="true"
                :is-full-page="true"
                :z-index="1060">
      </loading>
    </nav>
</template>

<script>
import axios from 'axios'
import { code, WRITEDOMAIN } from '../../api'
import Modal from '../Component/Modal';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
  // Init plugin
  export default {
    props: {
      transparent: Boolean,
      colorOnScroll: Number,
    },
    components: {
      Modal,
      Loading
    },
    data(){
      return{
        login : false,
        email_id : String,
        descript : String,
        title : String,
        returnPath:String,
        forum:[],
        modalShow:false,
        modalShowWrite:false
      }
    },
    mounted(){
      //id Set
      this.returnPath = this.$route.query.returnPath || '/board'

      var token = localStorage.getItem('token');
      this.email_id = localStorage.getItem('id');
      if(token){
        this.login = true;
      } else{
        this.login = false;
      }
    },
    watch:{
      email_id: function(){
        this.email_id = localStorage.getItem('id');
      }
    },
    methods:{
      forumSelect(minor_key, name){
        this.$store.state.writeBoard_name = name;
        this.$store.state.writeBoard_forum = minor_key;
        this.modalShow = false;
      },
      select(){
        //탭 id 기억, 상단 포럼 및 카테고리 초기화
        var  i = this.$store.state.writeBoard_Category;

        if( i == 1 || i == 2 ) {
          this.$store.commit('ISLOADING', true);
          //major_key가 0이면 브랜드포럼 1이면 상품포럼
          code.forum(i).then(result=>{
            if(result.length == 0){

            }
            else{
              this.forum = result;
              if(i == 1){
                this.title="포럼선택";
              }
              else{
                this.title="카테고리선택";
              }
              this.modalShow = true;
            }
            this.$store.commit('ISLOADING', false);
          }).catch(response => {
           //error
           console.log("error",response)
           this.errorAlert();
          })
        }
      },
      onClose(){
        this.modalShowWrite = false;
      },
      checklist(){
        //url 체크
        var str_1 = $('#url_1').val();
        var str_2 = $('#url_2').val();

        var url_flag = true;

        var http_pattern = /http|https/gi;
        if(str_1 != ""){
          if(!http_pattern.exec(str_1)){
              alert("주소를 입력하세요.");
              url_flag = false;
          } else {
            url_flag = true;
          }
        }
        else if(str_2 != ""){
          if(!http_pattern.exec(str_2)){
              alert("주소를 입력하세요.");
              url_flag = false;
          } else {
             url_flag = true;
          }
        }
        //둘다 선택안했을 겨웅
        else {
          url_flag = true;
        }

        if(url_flag){
          this.writecheck();
        }
      },
      writecheck(){
        //포럼 체크 및 해당 글 체크
        if(this.$store.state.writeBoard_Category == 1){
          if(this.$store.state.writeBoard_forum == 0){
            alert("포럼을 선택하세요.");
          }
          else if($("#subject").text() == ""){
            alert("제목을 적으세요.");
          }
          else if($("#descript").val() == ""){
            alert("본문을 적으세요.");
          }
          else{
            this.writeAlarm();
          }
        }
        else if(this.$store.state.writeBoard_Category == 2){
          if(this.$store.state.writeBoard_forum == 0){
            alert("카테고리를 선택하세요.");
          }
          else if($("#subject").text() == ""){
            alert("제목을 적으세요.");
          }
          else if($("#descript").val() == ""){
            alert("본문을 적으세요.");
          }
          else{
            this.writeAlarm();
          }
        }
        else{
          if($("#subject").text() == ""){
            alert("제목을 적으세요.");
          }
          else if($("#descript").val() == ""){
            alert("본문을 적으세요.");
          }
          else{
            this.writeAlarm();
          }
        }
      },
      writeAlarm(){
        this.title = "게시글 등록";
        this.descript = "게시글을 등록하시겠습니까?";
        this.modalShowWrite  = true;
      },
      handleOk() {
       // Prevent modal from closing
       this.write();
    },
      write(){
        //엔터키가 있으면 <br추가></br추가>
        var str = $('#descript').val();
        str = str.replace(/(?:\r\n|\r|\n)/g, '<br/>');


        var check_flag = 0;
        if(this.$store.state.writeBoard_Category == 1 || this.$store.state.writeBoard_Category == 2){
          if(this.$store.state.writeBoard_forum == 0){
            check_flag++;
          }
        } else if (this.$store.state.writeBoard_Category == 3 || this.$store.state.writeBoard_Category == 4){
          if(this.$store.state.writeBoard_forum > 0){
            check_flag++;
          }
        }
        if(check_flag > 0){
          alert("카테고리 및 포럼을 다시 선택해주세요.");
        } else {
          this.$store.state.formData.append('userid', this.email_id);
          this.$store.state.formData.append('descript', str);
          this.$store.state.formData.append('subject', $("#subject").text());
          this.$store.state.formData.append('boardtype', this.$store.state.writeBoard_Category);
          this.$store.state.formData.append('boardforum', this.$store.state.writeBoard_forum);
          this.$store.state.formData.append('url_1', $("#url_1").val());
          this.$store.state.formData.append('url_2', $("#url_2").val());

          //Image server Set
          this.$store.commit('ISLOADING', true);
          let settings = { headers: { 'content-type': 'multipart/form-data' } }
          axios.post( WRITEDOMAIN + '/board/write', this.$store.state.formData, settings)
           .then(data => {
            this.modalShowWrite = false;

            setTimeout(() => {
              this.$store.commit('ISLOADING', false);
              this.$router.push(this.returnPath);
            }, 300);

           }).catch(response => {
            console.log("error",response)
            this.errorAlert();
           })
         }
        },
        errorAlert(){
          this.$router.push(this.$route.query.returnPath || '/error');
        }
    }
  }
</script>

<style scoped>
nav {
  text-align: center;
}
.write_style{
  width:15%;
  color: rgb(136, 136, 136);
}

.write_style_middle{
  width:70%;
  text-align: center;
}
.modal-view{
  width: 100%;
  height: 200px;
  overflow-y: scroll;
}
.main_web_navbar{
  top:51px;
  box-shadow:0 20px 20px -20px rgba(0,0,0,.15);
}
</style>
