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
                  <h6 style="text-align:center; color:red;" v-if="errors.has('email')"> E-mail 형식으로 작성해주세요.</h6>
                  <fg-input addon-left-icon="now-ui-icons text_caps-small"
                            type="password"
                            v-model="password"
                            placeholder="비밀번호">
                  </fg-input>

                  <button class="btn btn-github btn-lg" style="width:100%;" type="submit">
                    Login
                  </button>
                </form>
                <router-link style="text-align:right; color:#000000;" to="/register">
                  <h6>회원가입 ></h6>
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
    <!--
    <b-modal id="modal-center" centered v-bind:title="title">
      {{descript}}
    </b-modal>
    -->
  </div>
</template>
<script>
  import FormGroupInput from '../Component/formGroupInput';
  import { auth, setAuthInHeader } from '../../api'
  import Modal from '../Component/Modal'
  export default {
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
          descript : ''
      }
    },
    created() {
      this.returnPath = this.$route.query.returnPath || '/product'

    },
    methods:{
      onSubmit() {
        this.$validator.validateAll();
        auth.login(this.email, this.password).then(data => {
          //만약에 없으면 금일 상품을 모두 선택했다는 메시지로 변경
          if(data == 301){
            this.title = "로그인확인";
            this.descript ="아이디나 비밀번호를 다시확인해주세요.";
            this.modalShow = true;
          }
          else{
            localStorage.setItem('token', data.accessToken)
            localStorage.setItem('id', this.email)
            setAuthInHeader(data.accessToken) //token
            this.$router.push(this.returnPath);
          }
        })
        .catch(error => {
          this.descript="이용에 불편을 드려 죄송합니다. 빠른 조치중에 있습니다.";
          this.title = "서버에러";
          this.modalShow = true;
        });
      },
      onClose(){
        this.modalShow = false;
      }
    }
  }
</script>
<style>
.div_style{

}
</style>
