<template>
  <div>
    <div style="margin-bottom:10px;">
      <div v-if="this.elevenshopArray.length > 0" align="left" style="margin-top: 50px;margin-left:15px; margin-right:15px; margin-bottom: 15px; text-align: center; margin-top: 30px;">
          <h5 class="card-title">
            <img src="/public/img/11st.png" style="width:25px;">
            <b style="color:red;"> 11번가 쇼핑 </b>에서 판매중
          </h5>
          <div v-if="loading" style="width:100%; height:100px; text-align: center;">
            <div style="display: inline-block; margin-top:30px;">
              <clip-loader :loading="loading" :color="'black'" :size="'50px'"></clip-loader>
            </div>
          </div>
          <div v-else>
            <swiper ref="mySwiper" :options="swiperOptions">
              <swiper-slide v-for="loop in elevenshopArray">
                <div v-for="item in loop">
                  <div v-on:click="onClick(item.DetailPageUrl[0])">
                    <div style="text-align: center; float:left; margin-right:10px;">
                      <img class="lazy-img-fadein" v-lazy="item.ProductImage[0]" style="width:100px; height:100px;"/>
                      <div v-lazy:background-image="item.ProductImage[0]"></div>
                    </div>
                    <div align="left" style="margin-left:15px; height:150px; margin-bottom: 10px;">
                      <h6 v-html="item.ProductName[0]" style="padding-top: 30px;"></h6>
                      <h5> {{item.ProductPrice}} 원 </h5>
                    </div>
                  </div>

                </div>
                <h1></h1>
              </swiper-slide>
              <div style="position:relative" class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
import { callback } from '../../api'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default{
  props:{
    elevenshopserach:String,
    elevenshopcategory_large : String,
    elevenshopbrand_name : String,
    elevenshopcategory_middle : String,
    login_blur : Boolean
  },
  components:{
    Swiper,
    SwiperSlide,
    ClipLoader
  },
  data(){
    return {
      elevenshop : [],
      loading : false,
      elevenshopArray : [],
      swiperOptions: {
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
          }
      }
    }
  },
  created(){
    this.loading = true;
    setTimeout(() => {
      callback.elevenstore(this.elevenshopserach).then(data=>{
        for(var i = 0; i < data.ProductSearchResponse.Products[0].Product.length; i++){
          if(i % 3 == 0 && i != 0){
            this.elevenshopArray.push(this.elevenshop)
            this.elevenshop = [];
          }
          data.ProductSearchResponse.Products[0].Product[i].ProductPrice = data.ProductSearchResponse.Products[0].Product[i].ProductPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.elevenshop.push(data.ProductSearchResponse.Products[0].Product[i]);
        }
        this.loading = false;
      }).catch(error =>{
        this.loading = false;
        console.log(error)
      });
    },1000)

  },
  methods:{
    onClick(url){
      if(this.login_blur){
        gtag('event','11번가상품정보클릭',{'event_label':url});
        this.$store.commit('hereluxAll/SET_PAGEMOVEURL', url);
        setTimeout(() => {
          this.$router.push(this.$route.query.returnPath || '/pagemove');
        }, 200);
      }

    }
  }

}
</script>
<style>
</style>
