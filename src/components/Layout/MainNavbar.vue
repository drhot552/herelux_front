<template>
    <navbar position="fixed"
            :transparent="transparent"
            :color-on-scroll="colorOnScroll"
            menu-classes="ml-auto"
            v-bind:class="{main_web_navbar : webFlag}">
        <template slot-scope="{toggle, isToggled}">
                <router-link class="navbar-brand" to="/">
                  HERE LUX
                </router-link>
        </template>
        <template slot="navbar-menu">
          <li class="nav-item">
            <nav-link class="nav-link" to="/About">
              <span>About us</span>
            </nav-link>
          </li>
          <li class="nav-item">
            <nav-link class="nav-link" to="/Contact">
              <span>Contact</span>
            </nav-link>
          </li>
        </template>
        <template slot="navbar-menu">
          <li class="nav-item">
            <nav-link class="nav-link" to="/Service">
                <span>이용약관</span>
            </nav-link>
          </li>
        </template>
        <template slot="navbar-menu">
          <li class="nav-item">
            <nav-link class="nav-link" v-on:click.native="onClick()" >
                <span>1:1 문의</span>
            </nav-link>
          </li>
        </template>
        <template slot="navbar-menu">
          <li class="nav-item">
            <nav-link class="nav-link" to="/passwordchg">
                <span>비밀번호 변경</span>
            </nav-link>
          </li>
        </template>
        <template slot="navbar-menu">
          <li class="nav-item">
            <nav-link class="nav-link" to="/withdrawal">
                <span>회원탈퇴</span>
            </nav-link>
          </li>
        </template>
    </navbar>
</template>

<script>
  import Navbar from '../Navbar/Navbar';
  import NavLink from '../Navbar/NavLink';
  import DropDown from '../Navbar/Dropdown';
  import { mapState } from 'vuex'
  export default {
    name: 'main-navbar',
    props: {
      transparent: Boolean,
      colorOnScroll: Number,
    },
    components: {
      Navbar,
      NavLink,
      DropDown
    },
    computed:{
      ...mapState('hereluxAll', {
        webFlag: 'webFlag'
      })
    },
    data(){
      return{
        login : false,
        email_id : ''
      }
    },
    mounted(){
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
      onClick(){
        var email = 'hereluxury@gmail.com';
        var subject = 'HERELUX 문의사항';

        var mailto_link = 'mailto:' + email + '?subject=' + subject ;

        window.location.href = mailto_link;
      }
    }
  }
</script>

<style scoped>
nav {
  text-align: center;
}
.main_web_navbar{
  top:51px;
  box-shadow:0 20px 20px -20px rgba(0,0,0,.15);
}
</style>
