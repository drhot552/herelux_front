<template>
    <nav class="navbar bg-white fixed-top" v-bind:class="{main_web_navbar : webFlag}" style="z-index:5003;">
      <div class="container" style="padding-right:0px; padding-left:0px;">
        <span v-if="pageType=='mylist'" class="board_style navbar-brand" v-on:click="beforePage('/mylist/0')" style="text-align:left; margin:0;">
            <img src="/public/img/btn_back.png" style="height:20px;"/>
        </span>
        <span v-else-if="pageType=='ranking'" class="board_style navbar-brand" v-on:click="beforePage('/ranking')" style="text-align:left; margin:0;">
            <img src="/public/img/btn_back.png" style="height:20px;"/>
        </span>
        <span v-else-if="pageType=='home'" class="board_style navbar-brand" v-on:click="beforePage('/')" style="text-align:left; margin:0;">
            <img src="/public/img/btn_back.png" style="height:20px;"/>
        </span>
        <span v-else-if="pageType=='all'" class="board_style navbar-brand" v-on:click="beforePage('/allproduct/home')" style="text-align:left; margin:0;">
            <img src="/public/img/btn_back.png" style="height:20px;"/>
        </span>
        <span v-else class="board_style navbar-brand" v-on:click="onClick()" style="text-align:left; color:black; margin:0;">
            <img src="/public/img/btn_back.png" style="height:20px;"/>
        </span>
        <span style="text-align:right; padding-bottom:0.5rem">
          <router-link to="/search" v-on:click.native="searchClick()" style="margin-right:10px;">
            <img src="/public/img/btn_search.png" style="height:20px;"/>
          </router-link>
        </span>
      </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    props: {
      colorOnScroll: Number
    },
    computed:{
      ...mapState('hereluxAll', {
        webFlag: 'webFlag'
      })
    },
    data(){
      return{
        pageType:String,
        pageMove:String
      }
    },
    watch: {
        '$route' (to, from) {
          if(to.path !== from.path ) {
            this.pageType = this.$route.params.pagetype;
          }
        }
    },
    created(){

      this.pageType = this.$route.params.pagetype;
      if(this.pageType.match(/brand/gi)){
        this.pageMove = this.pageType.replace(/_/gi,'/');
      } else if(this.pageType.match(/search/gi)){
        this.pageMove = this.pageType.replace(/_/gi,'/');
      }
    },
    methods:{
      onClick(){
        window.history.length > 1
       ? this.$router.go(-1)
       : this.$router.push("/"+this.pageMove)


      },
      beforePage(path){
        //this.$router.go(-1);
        window.history.length > 1
       ? this.$router.go(-1)
       : this.$router.push(this.$route.query.returnPath || path)
      },
      searchClick(){

      }
    }
  }
</script>
<style scoped>
nav {
  text-align: center;
}
.board_style{
  color: rgb(136, 136, 136);
}
.main_web_navbar{
  top:51px;
  box-shadow:0 20px 20px -20px rgba(0,0,0,.15);
}
</style>
