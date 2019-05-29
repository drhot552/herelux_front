<template>
<div class="blogs-4">
      <div class="container">
        <div class="row">
          <article class="col-md-8 ml-auto mr-auto">
            <div v-if="productflag">
              <DetailCard type="blog" plain v-if="this.product.length > 0"
                v-bind:id="this.product[0].id"
                v-bind:name="this.product[0].name"
                v-bind:size="this.product[0].size"
                v-bind:color="this.product[0].color"
                v-bind:price="this.product[0].price"
                v-bind:star="this.product[0].star"
                v-bind:count="this.product[0].count">
              </DetailCard>
              <br/>
              <br/>
            </div>
          </article>
        </div>
      </div>
</div>
</template>
<script>
import DetailCard from '../Card/DetailCard'
import { product } from '../../api'

export default {
  components: {
    DetailCard
  },
  data(){
    return{
      product:[],
      productflag : true,
      productId : 0
    }
  },
  created(){
    this.productId = this.$route.params.id;
    console.log('productDetail', this.productId);
    this.listProduct();
  },
  methods:{
    listProduct(){
      product.detail(this.productId).then(data => {
        //만약에 없으면 금일 상품을 모두 선택했다는 메시지로 변경
        if(data.length > 0){
          this.product = data;
          this.productflag = true;
        }
        else{
          this.productflag = false;
        }
      })
      .catch(error =>{
        console.log(error);
      });
    }
  }
}
</script>
<style>
.col-md-8 {
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 0px;
    padding-left: 0px;
}
</style>
