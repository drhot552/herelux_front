<template>
  <div>
    <div style="margin-bottom:10px;">
      <img src="/public/img/11st.png" style="width:25px;">
      <h5 style="display:inline-block; margin-left:5px;">
        <b style="color:red;"> 11번가 쇼핑 </b>에서 판매중
      </h5>
    </div>
    <div style="margin-bottom:20px; color:rgb(136, 136, 136); text-decoration: underline;">
      <span style="margin-right:10px;" v-on:click="searchProduct(elevenshopbrand_name)">
        #{{this.elevenshopbrand_name}}
      </span>
      <span style="margin-right:10px; text-decoration: underline;" v-on:click="searchProduct(elevenshopcategory_large)">
        #{{this.elevenshopcategory_large}}
      </span>
      <span style="text-decoration: underline;" v-on:click="searchProduct(elevenshopcategory_middle)">
        #{{this.elevenshopcategory_middle}}
      </span>
    </div>
    <div v-if="this.elevenshopArray.length == 0">
      <h4>상품정보가 없습니다.</h4>
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
</template>

<script>
import { callback } from '../../api'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default{
  props:{
    elevenshopserach:String,
    elevenshopcategory_large : String,
    elevenshopbrand_name : String,
    elevenshopcategory_middle : String
  },
  components:{
    Swiper,
    SwiperSlide
  },
  data(){
    return {
      elevenshop : [],
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
    callback.elevenstore(this.elevenshopserach).then(data=>{
      console.log(data.ProductSearchResponse.Products[0].Product);
      for(var i = 0; i < data.ProductSearchResponse.Products[0].Product.length; i++){
        if(i % 3 == 0 && i != 0){
          this.elevenshopArray.push(this.elevenshop)
          this.elevenshop = [];
        }
        data.ProductSearchResponse.Products[0].Product[i].ProductPrice = data.ProductSearchResponse.Products[0].Product[i].ProductPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.elevenshop.push(data.ProductSearchResponse.Products[0].Product[i]);
      }
    }).catch(error =>{
      console.log(error)
    });
  },
  methods:{
    onClick(url){
      gtag('event','11번가상품정보클릭',{'event_label':url});
      if(navigator.userAgent.match(/Android|Tablet/i)){
        if(navigator.userAgent.match(/herelux_app_and/i)){
          window.android.bridge(url);
        }
        else{
          window.open(url, '_blank');
        }
      }
      else if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
        if(navigator.userAgent.match(/herelux_app_ios/i)){
          window.webkit.messageHandlers.YOURMETHOD.postMessage('url_herelux|'+url.trim());
        }
        else{
          window.open(url, '_blank');
        }
      }
      else {
        window.open(url, '_blank');
      }
    },
    searchProduct(searchWord){
      this.$store.state.searchWord = searchWord;
      setTimeout(() => {
        this.$router.push(this.$route.query.returnPath || '/search');
      }, 300);
    }
  }

}
</script>
<style>
</style>
