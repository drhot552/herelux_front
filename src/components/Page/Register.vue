<template>
  <div class="section" v-bind:class="{ main_web_page: this.$store.state.webFlag, main_app_page: !this.$store.state.webFlag }">
    <div class="content">
        <div class="container">
            <div class="col-lg-4 col-md-6 col-sm-6 ml-auto mr-auto">
                <h4 class="card-title text-center">Register</h4>
                <form @submit.prevent="onSubmit">
                  <fg-input addon-left-icon="now-ui-icons users_circle-08"
                            v-validate="'required|email'"
                            v-model="email"
                            type="text" name="email"
                            placeholder="Email">
                  </fg-input>
                  <h6 style="text-align:center; color:red;"> E-mail 형식으로 작성해주세요.</h6>

                  <fg-input addon-left-icon="now-ui-icons text_caps-small"
                            type="password"
                            v-model="password"
                            placeholder="비밀번호">
                  </fg-input>
                  <fg-input addon-left-icon="now-ui-icons text_caps-small"
                            type="password"
                            v-model="password_check"
                            placeholder="비밀번호확인">
                  </fg-input>
                  <button class="btn btn-github btn-lg" style="width:100%;" type="submit">
                    회원가입
                  </button>
                </form>
                <h6>회원가입 시 서비스 <a href="/Privacy"><u>이용약관, 개인정보취급방침</u></a>에 동의한 것으로 간주됩니다.</h6>

            </div>
        </div>
    </div>

    <modal :show.sync="modal_error" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">{{title}}</h4>
      <p>{{descript}}</p>
      <template slot="footer" class="justify-content-center">
        <button class="btn btn-secondary" v-on:click="onClose()">Close</button>
        <button class="btn btn-primary" v-on:click="onClose()">Ok</button>
      </template>
    </modal>

    <modal :show.sync="modal_success" headerClasses="justify-content-center">
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
  import FormGroupInput from '../Component/formGroupInput';
  import Modal from '../Component/Modal';
  import { auth, setAuthInHeader } from '../../api'
  export default {
    components: {
      [FormGroupInput.name]: FormGroupInput,
      Modal
    },
    data() {
      return {
          email: '',
          password: '',
          password_check :'',
          returnPath : '',
          title : '',
          descript : '',
          modal_error : false,
          modal_success : false,
          email_flag : false
      }
    },
    created() {
      this.returnPath = this.$route.query.returnPath || '/login'

    },
    methods:{
      onSubmit() {
        if(this.email_flag){
          alert("ID를 이메일형식으로 작성해주세요.");
        }
        else{
          //비밀번호 확인

          if(this.email == ''){
            alert("ID를 입력하세요");
          }
          if(this.password == ''){
            alert("비밀번호를 입력하세요");
          }
          if(this.password != this.password_check){
            alert("비밀번호가 일치하지 않습니다.");
          }
          else {
            auth.register(this.email, this.password, 'email').then(data => {
              //data code 300이면 중복체크
              if(data == 300){
                this.descript="같은아이디가 존재합니다. 다른아이디를 사용하세요.";
                this.title = "아이디중복";
                this.modal_error = true;
              }
              else if (data == 200){
                this.descript="회원가입이 완료되었습니다. 가입하신 아이디로 로그인하세요.";
                this.title = "회원가입성공";
                this.modal_success = true;
              }
              else {

              }
            })
            .catch(error => {
              this.descript="이용에 불편을 드려 죄송합니다. 빠른 조치중에 있습니다.";
              this.title = "서버에러";
              this.modal_error = true;
            })
          }
        }
      },
      handleOk() {
       // Prevent modal from closing
       this.modal_success = false;
       this.$router.push(this.returnPath)
      },
      onClose(){
        this.modal_success = false;
        this.modal_error = false;
      }
    }
  }
</script>
<style>
.div_style{

}
.main_web_page{
  padding: 100px 0 53px;
  background: #fff;
}
.main_app_page{
  padding: 70px 0 53px;
  background: #fff;
}
</style>
