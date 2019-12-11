<template>
  <div class="section">
    <div class="content">
        <div class="container">
            <div class="col-lg-4 col-md-6 col-sm-6 ml-auto mr-auto">
                <h4 class="card-title text-center">Login</h4>
                <form @submit.prevent="onSubmit">
                  <fg-input addon-left-icon="now-ui-icons users_circle-08"
                            v-validate="'required|email'"
                            v-model="email"
                            type="text" name="email"
                            placeholder="Email">
                  </fg-input>
                  <h6 style="text-align:center; color:red;" v-if="email_flag = errors.has('email')"> E-mail 형식으로 작성해주세요.</h6>
                  <fg-input addon-left-icon="now-ui-icons text_caps-small"
                            type="password"
                            v-model="password"
                            placeholder="비밀번호">
                  </fg-input>

                  <button class="btn btn-github btn-lg" style="width:100%;" type="submit">
                    Login
                  </button>

                </form>
                <div class="simple_login">
                  <div>
                    <a class="button_naver" v-on:click="naverlogin()">
                      <h5 style="color:white; margin-top:0px; padding-top:13px;">네이버 아이디로 로그인</h5>
                    </a>
                  </div>
                </div>
              <!--  <a id="custom-login-btn" v-on:click="logincheck()">
                <img src="//mud-kage.kakao.com/14/dn/btqbjxsO6vP/KPiGpdnsubSq3a0PHEGUK1/o.jpg" width="300" style="width:100%; margin-bottom:15px; "/>
              </a>-->
                <router-link style="text-align:right; color:#000000; " to="/register">
                  <h6 style="margin-top:10px;">회원가입 ></h6>
                </router-link>
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
  </div>
</template>
<script>
  import FormGroupInput from '../Component/formGroupInput';
  import { auth, setAuthInHeader } from '../../api'
  import Modal from '../Component/Modal'
  export default {
    props: {
      onSuccess: {
        required: true
       },
       onFailure: {
         required: true
       }
    },
    components: {
      [FormGroupInput.name]: FormGroupInput,
      Modal
    },
    data() {
      return {
          email: '',
          password: '',
          returnPath : '',
          modalShow: false,
          title : '',
          descript : '',
          email_flag : false,
          cliend_id : '',
          callbackUrl : ''
      }
    },
    created() {
      this.returnPath = this.$route.query.returnPath || '/'
      //개발
      //this.client_id = 'qb4UvpZbIcIPB7AeHsg5'
      //this.callbackUrl = 'http://52.79.240.238:8080/callback'
      //운영
      this.client_id = 'Vwg5qvZi4T3pagL1ZASv'
      this.callbackUrl = 'http://hereluxury.com/callback'

    },
    methods:{
      naverlogin(){
        console.log(url);
        var url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id='+this.client_id+'&redirect_uri='+this.callbackUrl+'&state=1234';
        window.location.replace(url)xw;
      },
      onSubmit() {
        if(this.email_flag){
          alert("ID를 이메일형식으로 작성해주세요.");
        }
        else{
          auth.login(this.email, this.password, 'email').then(data => {
            //만약에 없으면 금일 상품을 모두 선택했다는 메시지로 변경
            if(data == 301){
              this.title = "로그인확인";
              this.descript ="아이디를 다시확인해주세요.";
              this.modalShow = true;
            }
            //비밀번호가 틀리면
            else if(data == 302){
              this.title = "비밀번호확인";
              this.descript ="비밀번호를 다시확인해주세요.";
              this.modalShow = true;
            }
            else{
              localStorage.setItem('token', data.accessToken)
              localStorage.setItem('id', this.email)
              localStorage.setItem('type', 'email')
              setAuthInHeader(data.accessToken) //token
              this.$router.push(this.returnPath);
            }
          })
          .catch(error => {
            this.descript="이용에 불편을 드려 죄송합니다. 빠른 조치중에 있습니다.";
            this.title = "서버에러";
            this.modalShow = true;
          });
        }
      },
      onClose(){
        this.modalShow = false;
      },
      kakaoAuth(){
        console.log(this.returnPath);
        Kakao.Auth.login({
          success: (authObj) => this.kakaoAPI(authObj),
          fail: (err) => this.onFailure(err)
        });
      },
      logincheck(){
        Kakao.Auth.login({
          success: function(authObj) {
             // 로그인 성공시, API를 호출합니다.
             console.log(this.returnPath);
             Kakao.API.request({
               url: '/v2/user/me',
               success: function(res) {
                 //로그인 체크
                 //로그인
                // console.log(JSON.stringify(authObj.refresh_token));
                // console.log(JSON.stringify(res.kakao_account));
                 // 로그인 창을 띄웁니다.
                 auth.snslogin(res.kakao_account.email, 'kakao', authObj.refresh_token, authObj.access_token).then(data=>{
                   console.log(data);
                   if(data==200){
                     localStorage.setItem('token', authObj.refresh_token)
                     localStorage.setItem('id', res.kakao_account.email)
                     setAuthInHeader(authObj.refresh_token) //token
                     this.$router.push('/');

                   } else {
                   }
                 })
                 .catch(error => {
                 });

               },
               fail: function(error) {
                 alert(JSON.stringify(error));
               }
             });
             console.log(kakaoinfo.kakao_account.email);
           },
           fail: function(err) {
             alert(JSON.stringify(err));
           }
        });
      }, test123(obj){
        console.log(obj);
      }


    }
  }
</script>
<style>
.simple_login .button_naver {
    border: 1px solid #27b219;
    border-top-width: 0px;
    border-left-width: 0px;
    border-bottom-width: 0px;
    background: #1ec800;
    border-radius: 5px;
    display: block;
    height: 50px;
    position: relative;
    text-align: center;
    color: #fff;
    text-indent: 36px;
    line-height: 36px;
}
.simple_login .button_naver:before {
    width: 50px;
    height: 48px;
    background: url(/public/img/naver_login_btn.png) 0 0 no-repeat;
    background-size: 50px;
    position: absolute;
    left: 0px;
    top: 0;
    content: '';
}
</style>
