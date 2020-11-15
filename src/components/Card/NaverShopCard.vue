<template>
  <div>
    <div style="margin-bottom:10px;">
      <div v-if="this.navershopArray.length > 0" style="margin-top: 50px;margin-left:15px; margin-right:15px; margin-bottom: 15px; text-align: center; margin-top: 20px;">
          <h5 class="card-title">
            <img src="/public/img/naver_login_btn.png" style="width:25px;">
            <b style="color:#55c931;"> 네이버 쇼핑 </b>에서 판매중
          </h5>
          <div v-if="loading" style="width:100%; height:100px; text-align: center;">
            <div style="display: inline-block; margin-top:30px;">
              <clip-loader :loading="loading" :color="'black'" :size="'50px'"></clip-loader>
            </div>
          </div>
          <div v-else style="margin-bottom:30px;">
            <swiper ref="mySwiper" :options="swiperOptions" @slideChange="onSlideChange" @swiper="onSwiper">
              <swiper-slide v-for="loop in navershopArray">
                <div v-for="item in loop">
                  <div v-on:click="onClick(item.link)">
                    <div style="text-align: center; float:left; margin-right:10px;">
                      <img class="lazy-img-fadein" v-lazy="item.image" style="width:100px; height:100px;"/>
                      <div v-lazy:background-image="item.image"></div>
                    </div>
                    <div align="left" style="margin-left:15px; height:150px; margin-bottom: 10px;">
                      <h6 v-html="item.title" style="padding-top: 15px;"></h6>
                      <h5> {{item.lprice}} 원 </h5>
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
    navershopserach:String,
    navershopcategory_large : String,
    navershopbrand_name : String,
    navershopcategory_middle : String,
    login_blur : Boolean
  },
  components:{
    Swiper,
    SwiperSlide,
    ClipLoader
  },
  data(){
    return {
      navershop : [],
      loading : false,
      navershopArray : [],
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
    callback.navershop(this.navershopserach).then(data=>{
      for(var i = 0; i < data.items.length; i++){
        if(i % 3 == 0 && i != 0){
          this.navershopArray.push(this.navershop)
          this.navershop = [];
        }
        data.items[i].lprice = data.items[i].lprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.navershop.push(data.items[i]);
      }
      this.loading=false;
    }).catch(error =>{
      console.log(error)
      this.errorAlert();
    });
  },
  methods:{
    onClick(url){
      if(this.login_blur){
        gtag('event','네이버쇼핑클릭',{'event_label':url});
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
