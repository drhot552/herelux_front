<template>
  <nav class="navbar navbar-expand-lg bg-white fixed-bottom" style = "z-index:1010">
    <div class="div_style_1">
      <router-link v-if="pageName ==='Event'" to="/">
        <img src="/public/img/bottom_home_touch.png" style="height:20px;"/>
      </router-link>
      <router-link v-else style="color:#000000;" to="/">
        <img src="/public/img/bottom_home_default.png" style="height:20px;"/>
      </router-link>
    </div>
    <div class="div_style_1">
      <router-link v-if="pageName==='Product'" style="color:#000000;" to="/product">
        <img src="/public/img/bottom_value_touch.png" style="height:20px;"/>
      </router-link>
      <router-link v-else style="color:#000000;" to="/product">
        <img src="/public/img/bottom_value_default.png" style="height:20px;"/>
      </router-link>
    </div>
    <div class="div_style_1">
      <router-link v-if="pageName==='MyList'" style="color:#000000;" to="/mylist">
        <img src="/public/img/bottom_mypage_touch.png" style="height:20px;"/>
      </router-link>
      <router-link v-else style="color:#000000;" to="/mylist">
        <img src="/public/img/bottom_mypage_default.png" style="height:20px;"/>
      </router-link>
    </div>
    <div class="div_style_1">
      <router-link v-if="pageName==='Rank'" style="color:#000000;" to="/ranking">
        <img src="/public/img/bottom_rank_touch.png" style="height:20px;"/>
      </router-link>
      <router-link v-else style="color:#000000;" to="/ranking">
        <img src="/public/img/bottom_rank_default.png" style="height:20px;"/>
      </router-link>
    </div>
    <div class="div_style_1">
      <router-link v-if="pageName==='Board'" style="color:#000000;" to="/board">
        <img src="/public/img/bottom_board_touch.png" style="height:20px;"/>
      </router-link>
      <router-link v-else style="color:#000000;" to="/board">
        <img src="/public/img/bottom_board_default.png" style="height:20px;"/>
      </router-link>
    </div>
  </nav>
</template>

<script>
  import NavLink from '../Navbar/NavLink';
  export default {
    name: 'footer-navbar',
    props: {
      pageName:String
    },
    components: {
      NavLink
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
