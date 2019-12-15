<template>
  <div class="content">
        <div class="container">
          <div v-if="this.$store.state.searchList.length > 0" class="row" style="margin-bottom: 50px;">
            <div class="div_style" v-for="item in this.$store.state.searchList">
              <div class="in" v-on:click="detail(item.id)">
                <img class="lazy-img-fadein"  v-lazy="item.url" style="width: 130px; height: 130px;"alt="..." >
                  <div class="lazy-img-fadein" v-lazy:background-image="item.url"></div>
                  <h6> <br /> <b>{{item.name}}</b> </h6>
              </div>
            </div>
          </div>
          <div v-else class="container">
              <div v-if="!this.$store.state.isLoading" class="row" >
                  <div class="col-md-8 ml-auto mr-auto text-center">
                      <h4 class="title">해당 명품상품이 없습니다.</h4>
                  </div>
              </div>
          </div>
          <div v-if="this.$store.state.searchList_readFlag" style="text-align:center; height:100px;">
            <a style="color:#000000;" v-on:click="readMore()">
              <img src="/public/img/btn_arrow_down.png" style="height:20px;margin-top: 10px;"/>
            </a>
          </div>
      </div>
    </div>
</template>


<script>
export default{
  created(){
    this.returnPath = this.$route.query.returnPath || '/detail'
    this.$store.commit('SET_SEARCHPRODUCT_INIT');
    //this.readMore();
  },
  data(){
    return{
      returnPath : '',
      brandId : 0
    }
  },
  methods:{
    readMore(){
      let searchWord = $("#search").val();
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_SEARCHPRODUCTLIST_READMORE',{word:searchWord});
    },
    detail(id){
      this.$store.state.productDetail_name = 'search'
      this.returnPath = this.returnPath +'/' + id + '/' + 'search'
      this.$router.push(this.returnPath)
    }
  }
}
</script>

<style>
.div_style{
  width: 50%;
  margin-bottom: 20px;
}
.in {
  width: 100%;
  text-align: center;
}
.lazy-img-fadein[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
}
</style>
