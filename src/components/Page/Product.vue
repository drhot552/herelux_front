<template>
  <div class="blogs-4">
      <div class="container" style="height: 71vh;">
        <div class="row" style="height: 71vh;">
          <article class="col-md-8 ml-auto mr-auto">
            <div v-if="productflag">
              <FavoriteCard type="blog" plain v-if="this.product.length > 0"
                v-bind:id="this.product[0].id"
                v-bind:name="this.product[0].name"
                v-bind:size="this.product[0].size"
                v-bind:color="this.product[0].color"
                v-bind:price="this.product[0].price">
              </FavoriteCard>
              <br/>
              <br/>
            </div>
            <div v-else class="projects-5">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 ml-auto mr-auto text-center">
                            <h4 class="title">오늘 모든 상품을 픽하셨습니다.</h4>
                        </div>
                    </div>
                    <hr/>
                </div>
            </div>
          </article>
        </div>
      </div>
      <loading :active.sync="this.$store.state.isLoading"
                :can-cancel="true"
                :is-full-page="true"
                :z-index="1060">
      </loading>
  </div>
</template>
<script>
import FavoriteCard from '../Card/FavoriteCard'
import { product } from '../../api'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    FavoriteCard,
    Loading
  },
  data(){
    return{
      product:[],
      productflag : true,
      user : ''
    }
  },
  created(){
    this.listProduct();
  },
  methods:{
    listProduct(){
      this.user = localStorage.getItem('id');
      this.$store.commit('ISLOADING', true);

      product.favoritelist(this.user).then(data => {
        //만약에 없으면 금일 상품을 모두 선택했다는 메시지로 변경
        if(data.length > 0){
          this.product = data;
          this.productflag = true;
        }
        else{
          this.productflag = false;
        }
        this.$store.commit('ISLOADING', false);
      }).catch(error =>{
        console.log("error",error);
        //alert 후 페이지 이동
        alert("서버와의 통신 에러가 발생하였습니다.");
        this.$router.push(this.$route.query.returnPath || '/error');
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
