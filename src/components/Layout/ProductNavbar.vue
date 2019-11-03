<template>
    <nav class="navbar bg-white fixed-top">
      <div class="container" style="padding-right:0px; padding-left:0px;">
        <div class="board_style" style="text-align:left;">
          <router-link v-if="pageType=='mylist'" class="navbar-brand" to="/mylist/0" style="margin:0">
                    이전
          </router-link>
          <router-link v-else-if="pageType=='ranking'" class="navbar-brand" to="/ranking" style="margin:0">
                    이전
          </router-link>
          <div v-else class="navbar-brand" v-on:click="onClick()" style="margin:0; color:black;">
                    이전
          </div>
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
    created(){
      this.pageType = this.$route.params.pagetype;
      if(this.pageType.match(/brand/gi)){
        this.pageMove = this.pageType.replace(/_/gi,'/');
      }
    },
    methods:{
      onClick(){

        console.log(this.$route.query.returnPath);
        this.$router.push("/"+this.pageMove);
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
