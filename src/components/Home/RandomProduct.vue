<template>
  <div>
    <div style="padding-left: 50px; padding-right: 50px; text-align: center;">
      <h4 style="margin-top: 0px; margin-bottom: 10px; font-weight: 700; font-size: 1.8em;">
        현재 입고된 <br /> HERELUX의 <br />새로운 스타일!
      </h4>
      <a v-on:click="pageMove('/allproduct/home')" style="color:black; font-weight:700;">
        전체 상품 보러가기 >
      </a>
    </div>
    <div style="margin-top:20px;">
    </div>
    <div>
      <div v-if="loading" style="width:100%; height:360px; text-align: center;">
        <div style="display: inline-block; margin-top:150px;">
          <beat-loader :loading="loading" :color="'#888888'"></beat-loader>
        </div>
      </div>
      <div v-else class="owl-carousel owl-theme">
        <div style="display: block; margin: 0px auto; width:90%;" v-for="item in newproduct">
          <div v-ripple v-on:click="productClick(item.id)">
            <div>
              <img class="lazy-img-fadein" v-lazy="item.url"/>
            </div>
            <div style="text-align:center;">
              <h6 class="home_product_name" style="margin-top:10px;">
                {{item.name}}
              </h6>
              <h6 style="font-weight:700;">
                {{item.price}}
              </h6>
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { home } from '../../api'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'

export default {
  components:{
    BeatLoader
  },
  data(){
    return{
      newproduct:[],
      productcnt: 0,
      brandcnt:0,
      returnPath:'',
      loading:false
    }
  },
  mounted() {
    home.newproduct().then(data =>{
      this.newproduct = data;
      this.loading=true
      setTimeout(() => {
        this.loading=false
        this.$nextTick(() => {
          $(this.$el).find('.owl-carousel').owlCarousel({
            stagePadding: 70,
            margin:20,
            items:1,
            dots:false
          });
        });
      }, 1500);
    }).catch(error =>{
      this.$router.push(this.$route.query.returnPath || '/error');
    });

  },
  created(){
    this.returnPath = this.$route.query.returnPath || '/detail'
  },
  methods:{
    productClick(id){
      this.$store.state.productDetail_name = 'home'
      this.returnPath = this.returnPath +'/' + id + '/home'
      setTimeout(() => {
        this.$router.push(this.returnPath)
      }, 300);

    },
    pageMove(page){
      this.returnPath = this.$route.query.returnPath || page
      this.$router.push(this.returnPath)
    }
  }
}
</script>
<style>
.lazy-img-fadein[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
}
.home_product_name {
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
