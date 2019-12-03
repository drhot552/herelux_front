<template>
  <nav class="navbar bg-white fixed-bottom" style = "z-index:1010; height:5vh;">
    <div class="div_style_1">
      <router-link v-if="pageName ==='Event'" v-on:click.native="footerClick()" to="/">
        <img src="/public/img/bottom_home_select.png" style="height:20px;"/>
      </router-link>
      <router-link v-else style="color:#000000;" v-on:click.native="footerClick()" to="/">
        <img src="/public/img/bottom_home_default.png" style="height:20px;"/>
      </router-link>
    </div>
    <div class="div_style_1">
      <router-link v-if="pageName==='Product'" style="color:#000000;" v-on:click.native="footerClick()" to="/product">
        <img src="/public/img/bottom_value_select.png" style="height:20px;"/>
      </router-link>
      <router-link v-else style="color:#000000;" v-on:click.native="footerClick()" to="/product">
        <img src="/public/img/bottom_value_default.png" style="height:20px;"/>
      </router-link>
    </div>
    <div class="div_style_1">
      <router-link v-if="pageName==='MyList'" style="color:#000000;" v-on:click.native="footerClick()" to="/mylist/0">
        <img src="/public/img/bottom_mypage_select.png" style="height:20px;"/>
      </router-link>
      <router-link v-else style="color:#000000;" v-on:click.native="footerClick()" to="/mylist/0">
        <img src="/public/img/bottom_mypage_default.png" style="height:20px;"/>
      </router-link>
      <span style="font-size:10px; color:red;" v-if="this.$store.state.boardFlag">
        N
      </span>
    </div>
    <div class="div_style_1">
      <router-link v-if="pageName==='Rank'" style="color:#000000;" v-on:click.native="footerClick()" to="/ranking">
        <img src="/public/img/bottom_rank_select.png" style="height:20px;"/>
      </router-link>
      <router-link v-else style="color:#000000;"  v-on:click.native="footerClick()" to="/ranking">
        <img src="/public/img/bottom_rank_default.png" style="height:20px;"/>
      </router-link>
    </div>
    <div class="div_style_1">
      <router-link v-if="pageName==='Board'" style="color:#000000;" v-on:click.native="footerClick()" to="/board">
        <img src="/public/img/bottom_board_select.png" style="height:29px;"/>
      </router-link>
      <router-link v-else style="color:#000000;" v-on:click.native="footerClick()" to="/board">
        <img src="/public/img/bottom_board_default.png" style="height:29px;"/>
      </router-link>
    </div>
  </nav>
</template>

<script>
  import NavLink from '../Navbar/NavLink';
  import { info } from '../../api';
  export default {
    name: 'footer-navbar',
    props: {
      pageName:String
    },
    components: {
      NavLink
    },
    data(){
      return{
        userid : String
      }
    },
    created(){
      this.userid = localStorage.getItem('id');
      this.$store.commit('SET_BOARDINFO_INIT');
      this.$store.dispatch('SELECT_BOARD_INFO_ALERT',{userid:this.userid});
    },
    methods:{
      footerClick(){
        this.$store.commit('SET_CATEGORY_INIT');
        this.$store.commit('SET_BOARDINFO_INIT');
        this.$store.dispatch('SELECT_BOARD_INFO_ALERT',{userid:this.userid});
        console.log(this.$store.state.boardFlag);

      }
    }
  }
</script>

<style scoped>
nav {
  text-align: center;
}
ul li {
    overflow: hidden;
}
.div_style_1{
  float: center;
  width: 20%;
}
</style>
