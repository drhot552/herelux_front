<template>
    <nav class="navbar bg-white fixed-top">
      <div class="container" style="padding-right:0px; padding-left:0px;">
        <div class="board_style" style="text-align:left;">
          <router-link v-if="pageType=='mylist'" class="navbar-brand" to="/mylist" style="margin:0">
                    이전
          </router-link>
          <router-link v-else class="navbar-brand" to="/ranking" style="margin:0">
                    이전
          </router-link>
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
        pageType:''
      }
    },
    created(){
      this.pageType = this.$route.params.pagetype;
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
