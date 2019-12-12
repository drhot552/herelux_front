<template>
  <footer class="navbar bg-white fixed-bottom" style = "z-index:1010; height:5vh; text-align: center;">
    <div class="div_style_1" v-if="pageName ==='Event'" v-on:click="footerClick('/')">
     <img src="/public/img/bottom_home_select.png" style="height:20px;"/>
   </div>
   <div class="div_style_1" v-else style="color:#000000;" v-on:click="footerClick('/')">
     <img src="/public/img/bottom_home_default.png" style="height:20px;"/>
   </div>

   <div class="div_style_1"  v-if="pageName==='Product'" style="color:#000000;" v-on:click="footerClick('/product')">
     <img src="/public/img/bottom_value_select.png" style="height:20px;"/>
   </div>
   <div class="div_style_1" v-else style="color:#000000;" v-on:click="footerClick('/product')">
     <img src="/public/img/bottom_value_default.png" style="height:20px;"/>
   </div>

   <div class="div_style_1" v-if="pageName==='MyList'" style="color:#000000;" v-on:click="footerClick('/mylist/0')">
     <img src="/public/img/bottom_mypage_select.png" style="height:20px;"/>
     <span style="font-size:10px; color:red;" v-if="this.$store.state.boardFlag">
       N
     </span>
   </div>
   <div class="div_style_1" v-else style="color:#000000;" v-on:click="footerClick('/mylist/0')">
     <img src="/public/img/bottom_mypage_default.png" style="height:20px;"/>
     <span style="font-size:10px; color:red;" v-if="this.$store.state.boardFlag">
       N
     </span>
   </div>

   <div class="div_style_1" v-if="pageName==='Rank'" style="color:#000000;" v-on:click="footerClick('/ranking')">
     <img src="/public/img/bottom_rank_select.png" style="height:20px;"/>
   </div>
   <div class="div_style_1" v-else style="color:#000000;"  v-on:click="footerClick('/ranking')" >
     <img src="/public/img/bottom_rank_default.png" style="height:20px;"/>
   </div>

   <div class="div_style_1" v-if="pageName==='Board'" style="color:#000000;" v-on:click="footerClick('/board')" >
     <img src="/public/img/bottom_board_select.png" style="height:29px;"/>
   </div>
   <div class="div_style_1" v-else style="color:#000000;" v-on:click="footerClick('/board')" >
     <img src="/public/img/bottom_board_default.png" style="height:29px;"/>
   </div>

  </footer>
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
        userid :''
      }
    },
    created(){
      this.userid = localStorage.getItem('id');
      this.$store.commit('SET_BOARDINFO_INIT');
      if(this.userid != ''){
        this.$store.dispatch('SELECT_BOARD_INFO_ALERT',{userid:this.userid});
      }

    },
    methods:{
      footerClick(path){
        this.$store.commit('SET_CATEGORY_INIT');
        this.$store.commit('SET_BOARDINFO_INIT');
        if(this.userid != ''){
          this.$store.dispatch('SELECT_BOARD_INFO_ALERT',{userid:this.userid});
        }

        this.$router.push(this.$route.query.returnPath || path);
      }
    }
  }
</script>

<style scoped>
nav {

}
ul li {
    overflow: hidden;
}
.div_style_1{
  float: center;
  width: 20%;
}
</style>
