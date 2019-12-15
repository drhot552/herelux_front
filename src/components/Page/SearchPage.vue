<template>
  <div class="section">
    <div v-scroll:throttle="{fn: onScroll, throttle: 500 }" class="container" style="padding-left: 0px; padding-right: 0px; height: 80vh; overflow:auto;">
      <div v-if="!this.$store.state.searchFlag">
        <div class="col-md-8 ml-auto mr-auto text-center">
            <h4 class="title">상품을 검색하세요.</h4>
        </div>
      </div>
      <div v-else>
        <SearchProductCard></SearchProductCard>
      </div>

    </div>
  </div>
</template>
<script>
import SearchProductCard from '../Card/SearchProductCard.vue';
export default{
  components:{
    SearchProductCard
  },
  created(){
    this.$store.state.searchList_readFlag = false;
    this.$store.state.searchFlag = false;
  },
  methods:{
    onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
      if (Math.round(scrollTop + clientHeight) >= scrollHeight && this.$store.state.searchList_readFlag) {
        this.$store.commit('ISLOADING', true);
        this.$store.dispatch('FETCH_SEARCHPRODUCTLIST_READMORE',{word:$("#search").val()});
      }
    }
  }
}
</script>
<style>
</style>
