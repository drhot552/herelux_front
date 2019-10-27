<template>
  <div class="content">
        <div class="container">
          <div v-if="this.$store.state.brandList.length > 0" class="row" style="margin-bottom: 50px;">
            <div class="div_style" v-for="item in this.$store.state.brandList">
              <div class="in">
                <a style="color:#000000;" v-on:click="detail(item.id)">
                  <img v-lazy="item.url" style="width: 130px; height: 130px;"alt="..." >
                  <div v-lazy:background-image="item.url"></div>
                  <h6> <br /> <b>{{item.name}}</b> </h6>
                </a>
              </div>
            </div>
          </div>
          <div v-else class="container">
              <div v-if="!this.$store.state.isLoading" class="row" >
                  <div class="col-md-8 ml-auto mr-auto text-center">
                      <h4 class="title">해당 명풍상품이 없습니다.</h4>
                  </div>
              </div>
          </div>
          <div v-if="this.$store.state.myList_readFlag" style="text-align:center; height:100px;">
            <a style="color:#000000;" v-on:click="readMore()">
              <span>더보기..</span>
            </a>
          </div>
      </div>
    </div>
</template>


<script>
import { product } from '../../api'

export default{

  created(){
    this.brandId = this.$route.params.brand_id;
    this.returnPath = this.$route.query.returnPath || '/detail'
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
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_BRANDLIST_READMORE',{brandid:this.brandId, category_type:this.$store.state.brandList_category_type, category:this.$store.state.brandList_category});
    },
    detail(id){
      this.$store.state.productDetail_name = 'brand'
      this.returnPath = this.returnPath +'/' + id + '/' + 'brand' + '_' +this.brandId
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
</style>
