<template>
    <nav class="navbar navbar-expand-lg bg-white fixed-top">
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
           <a style="color:#888; font-size:1.2em;" v-on:click="checklist()"> 등록 </a>
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
import { code } from '../../api'
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
        email_id : '',
        descript : '',
        title : '',
        returnPath:'',
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
      console.log(token, this.email_id);
      if(token){
        this.login = true;
      } else{
        this.login = false;
      }
      console.log(this.login);
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

        if(this.$store.state.writeBoard_Category == 0){
          if(this.$store.state.writeBoard_name == "포럼선택"){
            alert("포럼을 선택하세요.");
          }
          else if($("#subject").text() == ""){
            alert("제목을 적으세요.");
          }
          else if($("#descript").text() == ""){
            alert("본문을 적으세요.");
          }
          else{
            this.writeAlarm();
          }
        }
        else if(this.$store.state.writeBoard_Category == 1){
          if(this.$store.state.writeBoard_name == "카테고리선택"){
            alert("카테고리을 선택하세요.");
          }
          else if($("#subject").text() == ""){
            alert("제목을 적으세요.");
          }
          else if($("#descript").text() == ""){
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
          else if($("#descript").text() == ""){
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
        /* 글 전체를 저장 */
        this.$store.state.formData.append('userid', this.email_id);
        this.$store.state.formData.append('descript', $("#descript").text());
        this.$store.state.formData.append('subject', $("#subject").text());
        this.$store.state.formData.append('boardtype', this.$store.state.writeBoard_Category);
        this.$store.state.formData.append('boardforum', this.$store.state.writeBoard_forum);

        //Image server Set
        this.$store.commit('ISLOADING', true);
        let settings = { headers: { 'content-type': 'multipart/form-data' } }
        axios.post('http://54.180.153.54:4000/board/write', this.$store.state.formData, settings)
         .then(data => {
          console.log(data)
          this.$store.commit('ISLOADING', false);
          this.modalShowWrite = false;
          this.$router.push(this.returnPath);

         }).catch(response => {
          //error
          console.log("error",response)
          this.errorAlert();
         })
      },errorAlert(){
        alert("서버와의 통신 에러가 발생하였습니다.");
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
</style>
