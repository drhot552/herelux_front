<template>
  <div class="section">
    <div class="content">
        <div class="container">
          <div id="naverIdLogin"></div>
          <div class="projects-5">
              <div class="container">
                  <div class="row">
                  </div>
                  <div class="row">
                      <div class="col-md-8 ml-auto mr-auto text-center">
                          <h4 class="title">로그인중입니다..</h4>
                          <h4 class="description"></h4>
                          <div class="section-space"></div>
                      </div>
                  </div>
                  <hr/>
              </div>
          </div>
        </div>
    </div>
    <modal :show.sync="modalShow" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">{{title}}</h4>
      <p>{{descript}}</p>
      <template slot="footer" class="justify-content-center">
        <button class="btn btn-secondary" v-on:click="onClose()">Close</button>
        <button class="btn btn-primary" v-on:click="onClose()">Ok</button>
      </template>
    </modal>
    <!-- naver alert-->
    <modal :show.sync="modalShowNaver" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">{{title}}</h4>
      <p>네이버 간편회원가입 시 서비스 <a href="/Privacy"><u>이용약관, 개인정보취급방침</u></a>에 동의한 것으로 간주됩니다. 하시겠습니까?</p>
      <template slot="footer" class="justify-content-center">
        <button class="btn btn-secondary" v-on:click="onClose()">Close</button>
        <button class="btn btn-primary" v-on:click="onNaverOk()">Ok</button>
      </template>
    </modal>
    <!--
    <b-modal id="modal-center" centered v-bind:title="title">
      {{descript}}
    </b-modal>
    -->
  </div>
</template>
<script>
  import { auth, setAuthInHeader, callback } from '../../api'
  import Modal from '../Component/Modal'
  export default {
    components: {
      Modal
    },
    data() {
      return {
          returnPath : '',
          modalShow: false,
          modalShowNaver : false,
          title : '',
          descript : '',
          authArry : [],
          loginArry : []
      }
    },
    created() {
      this.returnPath = this.$route.query.returnPath || '/'

    },
    mounted(){
      console.log(this.$route.query.code, this.$route.query.state);
      var callbackFuc = async () =>{

        //네이버 로그인 인증 코드
        await callback.naver(this.$route.query.code, this.$route.query.state).then(data=>{
          this.authArry = data;
        }).catch(error => {
          this.descript="이용에 불편을 드려 죄송합니다. 빠른 조치중에 있습니다.";
          this.title = "서버에러";
          this.modalShow = true;
        });
        //네이버 로그인 프로필 확인
        await callback.navermember(this.authArry.access_token).then(data=>{
          this.loginArry = data;
        }).catch(error => {
          this.descript="이용에 불편을 드려 죄송합니다. 빠른 조치중에 있습니다.";
          this.title = "서버에러";
          this.modalShow = true;
        });
        //기존회원이 있는지 체크
        await auth.loginchk(this.loginArry.response.email, 'naver').then(data => {
          //만약에 없으면 금일 상품을 모두 선택했다는 메시지로 변경
          if(data.length == 0 ){
            this.title = "네이버 간편회원가입";
            this.modalShowNaver = true;
          } else {
            this.onNaverOk(this.loginArry.response.email);
          }
        }).catch(error => {
          console.log(error);
          this.descript="이용에 불편을 드려 죄송합니다. 빠른 조치중에 있습니다.";
          this.title = "서버에러";
          this.modalShow = true;
        });
      }
    },
    methods:{
      onNaverOk(){
        auth.snslogin(this.loginArry.response.email, 'naver', this.authArry.refresh_token, this.authArry.access_token).then(data=>{
          console.log(data);
          if(data==200 || data==201){
            //
            if(navigator.userAgent.match(/Android|Tablet/i)){
              if(navigator.userAgent.match(/herelux_app_and/i)){
                window.android.token(this.authArry.refresh_token);
                window.android.id(this.loginArry.response.email);
                window.android.type('naver');
              }

            }
            else if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
              if(navigator.userAgent.match(/herelux_app_ios/i)){
                window.webkit.messageHandlers.YOURMETHOD.postMessage('token_herelux|'+this.authArry.refresh_token);
                window.webkit.messageHandlers.YOURMETHOD.postMessage('id_herelux|'+this.loginArry.response.email);
                window.webkit.messageHandlers.YOURMETHOD.postMessage('type_herelux|'+'naver');
              }
            }
            localStorage.setItem('token', this.authArry.refresh_token)
            localStorage.setItem('id', this.loginArry.response.email)
            localStorage.setItem('type', 'naver')
            setAuthInHeader(this.authArry.refresh_token) //token
            this.$router.push('/');
          } else {

          }
        }).catch(error => {
          this.descript="이용에 불편을 드려 죄송합니다. 빠른 조치중에 있습니다." + error;
          this.title = "서버에러";
          this.modalShow = true;
        });
      },
      onClose(){
        this.modalShow = false;
        this.modalShowNaver = false;
      }
    }
  }
</script>
<style>
</style>
