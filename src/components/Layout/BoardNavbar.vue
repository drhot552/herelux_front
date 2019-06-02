<template>
    <nav class="navbar navbar-expand-lg bg-white fixed-top">
      <div class="container">
        <div class="board_style" style="text-align:left;">
          <router-link class="navbar-brand" to="/board" style="margin:0">
                    이전
          </router-link>
        </div>
        <div class="board_style_middle">
          <a> {{this.$store.state.board_name}} </a>
        </div>
        <div v-if="this.$store.state.boardCommentFlag" class="board_style" style="text-align:right;">
           <a style="color:#888; font-size:1.2em;" v-on:click="update()"> 수정 </a>
        </div>
      </div>
    </nav>
</template>

<script>
  export default {
    props: {
      transparent: Boolean,
      colorOnScroll: Number,
    },
    methods:{
      update(){
        //Write로 이동하기전에 모든 데이터 글, 포럼, 실제 그림 set해서 넘김
        
      }
    }
  }
</script>
<style scoped>
nav {
  text-align: center;
}
.board_style{
  width:15%;
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
