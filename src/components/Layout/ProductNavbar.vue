<template>
    <nav class="navbar bg-white fixed-top" style="z-index:5003;">
      <div class="container" style="padding-right:0px; padding-left:0px;">
        <div v-if="pageType=='mylist'" class="board_style navbar-brand" v-on:click="beforePage('/mylist/0')" style="text-align:left;">
            이전
        </div>
        <div v-else-if="pageType=='ranking'" class="board_style navbar-brand" v-on:click="beforePage('/ranking')" style="text-align:left;">
            이전
        </div>
        <div v-else-if="pageType=='home'" class="board_style navbar-brand" v-on:click="beforePage('/')" style="text-align:left;">
            이전
        </div>
        <div v-else-if="pageType=='all'" class="board_style navbar-brand" v-on:click="beforePage('/allproduct/home')" style="text-align:left;">
            이전
        </div>
        <div v-else class="board_style navbar-brand" v-on:click="onClick()" style="text-align:left; color:black;">
            이전
        </div>
        <div class="board_style_middle">
        </div>
      </div>
    </nav>
</template>

<script>
  export default {
    props: {
      colorOnScroll: Number
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
        this.$router.push("/"+this.pageMove);
      },
      beforePage(path){
        //this.$router.go(-1);
        this.$router.push(this.$route.query.returnPath || path);
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
  width: 100%;
}

.board_style_middle{
  width:70%;
  text-align: center;
}
.modal-view{
  width: 100%;
  height: 200px;
  overflow-y: scroll;
}
</style>
