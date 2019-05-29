<template>
    <navbar position="fixed"
            :transparent="transparent"
            :color-on-scroll="colorOnScroll"
            menu-classes="ml-auto">
        <template slot-scope="{toggle, isToggled}">
                <router-link class="navbar-brand" to="/">
                  HERE LUX
                </router-link>
        </template>
        <template slot="navbar-menu">
          <drop-down tag="li" title="명품사" class="nav-item">
            <a href="https://www.chanel.com/" target="_blank" class="dropdown-item">
                Chanel
            </a>
            <a href="http://www.hermes.com/index_kr.html" target="_blank" class="dropdown-item">
                Hermes
            </a>
            <a href="https://kr.louisvuitton.com/kor-kr/homepage" target="_blank" class="dropdown-item">
                Louis Vuitton
            </a>
            <a href="https://www.gucci.com‎" target="_blank"  class="dropdown-item">
                Gucci
            </a>
            <a href="https://www.bottegaveneta.com/‎" target="_blank" class="dropdown-item">
                Bottegaveneta
            </a>
            <a href="https://www.montblanc.com/ko-kr/home.html" target="_blank" class="dropdown-item">
                Montblanc
            </a>
            <a href="https://store.prada.com" target="_blank" class="dropdown-item">
                Prada
            </a>
            <a href="https://www.ysl.com/" class="dropdown-item">
                YSL
            </a>
            <a href="https://www.balenciaga.com/" target="_target" class="dropdown-item">
                Balenciaga
            </a>
            <a href="https://kr.burberry.com" target="_blank" class="dropdown-item">
                Burberry
            </a>
            <a href="https://www.cartier.co.kr/" target="_blank" class="dropdown-item">
                Cartier
            </a>
            <a href="https://www.fendi.com/kr" target="_blank" class="dropdown-item">
                Fendi
            </a>
            <a> 준비중입니다...</a>

          </drop-down>
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
    </navbar>
</template>

<script>
  import Navbar from '../Navbar/Navbar';
  import NavLink from '../Navbar/NavLink';
  import DropDown from '../Navbar/Dropdown';
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
    data(){
      return{
        login : false,
        email_id : ''
      }
    },
    mounted(){
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
    }
  }
</script>

<style scoped>
nav {
  text-align: center;
}
</style>
