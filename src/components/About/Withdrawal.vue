<template>
<div class="section" v-bind:class="{ main_web_page: webFlag, main_app_page: !webFlag }">
  <div class="container" style="padding-left:0px; padding-right:0px;">
    <div style="margin-left:15px; margin-right:15px;">
      <div style="border-bottom: 3px solid rgb(0, 0, 0); height: 50px;">
        <h5 style="padding-top: 13px; text-align: center;">
          회원탈퇴 시 안내사항을 확인해주세요.
        </h5>
      </div>
      <div style="padding:15px;">
        <div style="padding-top:15px;">
          - 회원님의 정보는 회원탈퇴 이후 개인정보취급방침에 의해 일정기간 보존 후 삭제 됩니다.
        </div>
        <div style="padding-top:30px;">
          - 회원탈퇴 후 재 가입 시 이전 회원정보는 복구되지 않으며, 무료서비스도 추가 제공되지 않습니다.
        </div>
      </div>
      <div style="padding-bottom:15px; border-bottom:1px solid rgb(0, 0, 0);">
        <checkbox :checked="false" v-model="checkFlag">
            <b>안내사항을 확인하고 동의합니다.</b> <b style="color:red;">(필수)</b>
        </checkbox>
      </div>
      <div style="padding-top:15px;">
        <div style="padding: 20px; text-align: center;">
          회원탈퇴를 위한 개인정보보호를 위해 비밀번호를 다시 한 번 확인합니다.
        </div>
        <div style="text-align: center; padding-bottom:20px;">
          <span>{{this.userId}}</span>
        </div>
        <div style="margin-left: 15px; margin-right: 15px; padding-bottom:10px;">
          <input class="password_textarea"
                    type="password"
                    v-model="password"
                    placeholder="비밀번호를 입력하세요.">
          </input>
        </div>

        <div>
          <span style="margin-left: 15px; font-size: 13px; color: rgb(136, 136, 136);"> * sns 로그인 계정은 비밀번호 없이 탈퇴 </span>
        </div>

        <div style="text-align:center; padding-bottom: 15px;">
          <button type="button" class="btn btn-secondary" style="width:45%;" v-on:click="onCancle()">
            취소
          </button>
          <button type="button" class="btn btn-primary" style="width:45%;" v-on:click="onWithdrawal()">
            탈퇴
          </button>
        </div>
        <div style="text-align:center; margin-bottom:30px; height: 45px; background-color: #d3d3d3">
            <div style="float: left; width: 50%; margin-top: 13px; border-right: 1px solid;">
              <router-link style="color: black;" to="/service">
                <span>
                  서비스이용약관
                </span>
              </router-link>

            </div>
            <div style="padding-top: 13px;">
              <router-link style="color: black;" to="/privacy">
                <span>
                  개인정보취급방침
                </span>
              </router-link>
            </div>
        </div>
      </div>
    </div>
  </div>
  <modal :show.sync="modalFlag" headerClasses="justify-content-center">
    <h4 slot="header" class="title title-up">{{title}}</h4>
    <p>{{descript}}</p>
    <template slot="footer" class="justify-content-center">
      <button class="btn btn-secondary" v-on:click="onClose()">Close</button>
      <button class="btn btn-primary" v-on:click="onDelete()">Ok</button>
    </template>
  </modal>
</div>
</template>
<script>
import Checkbox from '../Component/Checkbox';

import Modal from '../Component/Modal';
import { auth } from '../../api'
import { mapState } from 'vuex'
export default{
  components: {
    Checkbox,
    Modal
  },
  data(){
    return {
      checkFlag : false,
      userId : '',
      password : '',
      modalFlag : false,
      modalErrorFlag : false,
      type : ''
    }
  },
  computed:{
    ...mapState('hereluxAll', {
      webFlag: 'webFlag'
    })
  },
  created(){
    this.userId = localStorage.getItem('id')
    this.userIdout = localStorage.getItem('id')
    this.type = localStorage.getItem('type')
    this.returnPath = this.$route.query.returnPath || '/login'
    //별처리
    if(this.userId){
      var arrayId = this.userId.split("@");
      var str = "";
      var hideId = "";
      if(arrayId.length == 2){
        for(var j =0; j < arrayId[0].length / 2; j++){
          str += "*";
        }
        hideId = arrayId[0].substr(0,arrayId[0].length/2) + str;
        hideId = hideId + "@" + arrayId[1];
        this.userId = hideId;
      }
    }

  },
  methods:{
    onWithdrawal(){
      if(this.userId){
        if(this.checkFlag){
          this.modalFlag = true;
          this.title = "회원탈퇴안내";
          this.descript = "회원님의 정보를 탈퇴합니다. 탈퇴하시겠습니까?";
        } else {
          alert("안내사항 동의를 확인해주세요.");
        }
      } else {
          alert("로그인을 확인해주세요.");
      }

    },
    onClose(){
      this.modalFlag = false;
    },
    onDelete(){
      auth.withdrawal(this.userIdout, this.password, this.type).then(data=>{
        if(data == 301){
          alert("아이디를 다시확인해주세요.");
        }
        //비밀번호가 틀리면
        else if(data == 302){
          alert("비밀번호를 다시확인해주세요.");
        }
        else if(data == 200){
          //
          if(navigator.userAgent.match(/Android|Tablet/i)){
            if(navigator.userAgent.match(/herelux_app_and/i)){
              window.android.logout();
            }
          }
          else if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
            if(navigator.userAgent.match(/herelux_app_ios/i)){
              window.webkit.messageHandlers.YOURMETHOD.postMessage('logout');
            }
          }
          localStorage.clear();
          this.$router.push(this.$route.query.returnPath || '/login');
        } else {
          console.log(error);
          alert("서버와의 통신 에러가 발생하였습니다.");
          this.$router.push(this.$route.query.returnPath || '/error');
        }
      }).catch(error =>{
        console.log(error);
        alert("서버와의 통신 에러가 발생하였습니다.");
        this.$router.push(this.$route.query.returnPath || '/error');
      });
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
  .main_web_page{
    padding: 100px 0 53px;
    background: #fff;
  }
  .main_app_page{
    padding: 70px 0 53px;
    background: #fff;
  }
</style>
