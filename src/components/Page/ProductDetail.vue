<template>
  <div class="section">
    <div class="blogs-4">
        <div v-if="loading" style="width:100%; height:1024px; text-align: center;">
          <div style="display: inline-block; margin-top:150px;">
            <clip-loader :loading="loading" :color="'black'" :size="'50px'"></clip-loader>
          </div>
        </div>
          <div v-else class="container">
            <div class="row">
              <article class="col-md-8 ml-auto mr-auto">
                <div v-if="productflag">
                  <DetailCard type="blog" plain v-if="this.product.length > 0"
                    v-bind:id="this.product[0].id"
                    v-bind:brand="this.product[0].brand_name"
                    v-bind:category_large="this.product[0].category_large"
                    v-bind:category_middle="this.product[0].category_middle"
                    v-bind:brand_name="this.product[0].brand_name_descript"
                    v-bind:category_large_name="this.product[0].category_large_name"
                    v-bind:category_middle_name="this.product[0].category_middle_name"
                    v-bind:name="this.product[0].name"
                    v-bind:size="this.product[0].size"
                    v-bind:color="this.product[0].color"
                    v-bind:price="this.product[0].price"
                    v-bind:star="this.product[0].star"
                    v-bind:count="this.product[0].count"
                    v-bind:sub_name="this.product[0].sub_name"
                    v-bind:reg_dttm="this.product[0].reg_dttm">
                  </DetailCard>
                  <br/>
                  <br/>
                </div>
              </article>
            </div>
          </div>
    </div>
    <div class="section-space"></div>
  </div>
</template>
<script>
import DetailCard from '../Card/DetailCard'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import { product } from '../../api'

export default {
  components: {
    DetailCard,
    ClipLoader
  },
  data(){
    return{
      product:[],
      productflag : true,
      productId : 0,
      loading : false
    }
  },
  watch: {
      '$route' (to, from) {

        if(to.path !== from.path ) {
          this.product = []
          this.productId = to.params.id;
          this.listProduct();
        }
      }
  },
  created(){
    this.productId = this.$route.params.id;
    this.listProduct();
  },
  methods:{
    listProduct(){
      this.$store.commit('ISLOADING', true);
      this.loading = true
      setTimeout(() => {
        product.detail(this.productId).then(data => {
          //만약에 없으면 금일 상품을 모두 선택했다는 메시지로 변경
          if(data.length > 0){
            this.product = data;
            this.productflag = true;
          }
          else{
            this.productflag = false;
          }
          this.loading = false;
          this.$store.commit('ISLOADING', false);
        })
        .catch(error =>{
          console.log(error);
          alert("서버와의 통신 에러가 발생하였습니다.");
          this.$router.push(this.$route.query.returnPath || '/error');
        });
      }, 800)

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
