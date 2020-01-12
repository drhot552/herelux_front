<template>
<div class="section" style="padding:51px 0;">
  <div class="container" style="padding-left:0px; padding-right:0px;">
    <div style="margin-left:15px; margin-right:15px;">
      <div style="border-bottom: 3px solid rgb(0, 0, 0); height: 50px;">
        <h5 style="padding-top: 13px; text-align: center;">
          새로운 비밀번호를 입력해주세요.
        </h5>
      </div>
      <div style="padding-top:30px;">
        <fg-input addon-left-icon="now-ui-icons text_caps-small"
                   type="password"
                   v-model="password"
                   placeholder="현재 비밀번호">
         </fg-input>
         <fg-input addon-left-icon="now-ui-icons text_caps-small"
                   type="password"
                   v-model="new_password"
                   placeholder="새 비밀번호">
         </fg-input>
         <fg-input addon-left-icon="now-ui-icons text_caps-small"
                   type="password"
                   v-model="new_password_check"
                   placeholder="새 비밀번호확인">
         </fg-input>
      </div>
       <div style="text-align:center; padding-bottom: 15px;">
         <button type="button" class="btn btn-secondary" style="width:45%;" v-on:click="onCancle()">
           취소
         </button>
         <button type="button" class="btn btn-primary" style="width:45%;" v-on:click="onChangepopUp()">
           변경
         </button>
       </div>

    </div>
  </div>
  <modal :show.sync="modalFlag" headerClasses="justify-content-center">
    <h4 slot="header" class="title title-up">{{title}}</h4>
    <p>{{descript}}</p>
    <template slot="footer" class="justify-content-center">
      <button class="btn btn-secondary" v-on:click="onClose()">Close</button>
      <button class="btn btn-primary" v-on:click="onChange()">Ok</button>
    </template>
  </modal>
</div>
</template>
<script>
import FormGroupInput from '../Component/formGroupInput';
import Modal from '../Component/Modal';
import { auth } from '../../api'
export default{
  components: {
    [FormGroupInput.name]: FormGroupInput,
    Modal
  },
  data(){
    return {
      userId : '',
      new_password : '',
      new_password_check : '',
      password : '',
      modalFlag : false,
      descript : String,
      title : String
    }
  },
  created(){
    this.userId = localStorage.getItem('id')
    this.returnPath = this.$route.query.returnPath || '/login'
  },
  methods:{
    onClose(){
      this.modalFlag = false;
    },
    onChange(){
      auth.passwordchg(this.userId, this.new_password).then(data=>{
        if(data == 200){
          this.$router.push(this.$route.query.returnPath || '/');
        } else {
          alert("서버와의 통신 에러가 발생하였습니다.");
          this.$router.push(this.$route.query.returnPath || '/error');
        }
      }).catch(error=>{
        alert("서버와의 통신 에러가 발생하였습니다.");
        this.$router.push(this.$route.query.returnPath || '/error');
      })
    },
    onChangepopUp(){
      //현재 비밀번호 체크
      auth.login(this.userId, this.password, 'email').then(data=>{
        //만약에 없으면 금일 상품을 모두 선택했다는 메시지로 변경
        if(data == 301){
          alert("아이디를 다시확인해주세요.");
        }
        //비밀번호가 틀리면
        else if(data == 302){
          alert("비밀번호를 다시확인해주세요.");
        }
        else{
          if(this.new_password != '' || this.new_password_check != ''){
            if(this.new_password == this.new_password_check){
              this.modalFlag = true;
              this.title ="비밀번호 변경"
              this.descript = "비밀번호를 변경하시겠습니까?"
            } else {
              alert('새 비밀번호가 다릅니다. 다시 확인해주세요.');
            }
          }
        }
      }).catch(error=>{
        alert("서버와의 통신 에러가 발생하였습니다.");
        this.$router.push(this.$route.query.returnPath || '/error');
      })
    },
    onCancle(){
      this.$router.push(this.$route.query.returnPath || '/');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/now-ui-kit/variables";
@import "../../assets/sass/now-ui-kit/checkboxes-radio";

.password_textarea{
  box-sizing: border-box;
  margin: 0;
  padding-left:10px;
  height: 40px;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 5px;
  outline: 0;
  overflow: auto;
  width: 100%;
}
</style>
