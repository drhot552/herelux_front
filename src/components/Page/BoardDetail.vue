<template>
  <div>
    <BoardDetailCard v-on:board_idx = "this.board_idx">
    </BoardDetailCard>
  </div>
</template>
<script>
import BoardDetailCard from '../Card/BoardDetailCard'

export default{
  components:{
    BoardDetailCard
  },
  data(){
    return{
      board_idx : 0
      //comment변수 set
    }
  },
  watch: {
      '$route' (to, from) {

        if(to.path !== from.path ) {
          this.board_idx = to.params.board_idx;
        }
      }
  },
  created(){
    this.board_idx = this.$route.params.board_idx;
  }
}
</script>
<style>
</style>
