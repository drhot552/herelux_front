<template>
  <div class="card card-plain">
    <swiper ref="mySwiper" @slideChangeTransitionStart="onSwiperSlideChangeTransitionStart" :options="swiperOptions">
      <swiper-slide v-for="item in eventhome">
        <div class="author" align="left" style="padding:5px;">
          <h6></h6>
            <a>
              <img v-lazy="item.logoimgurl" alt="..." class="avatar img-raised lazy-img-fadein">
              <span>{{item.brands_name}}</span>
            </a>
          <h6></h6>
        </div>
        <div style="height:280px; width:100%;">
          <div v-ripple v-on:click="handleClickSlide(item.direct_url)" style="text-align: center;">
            <img style="height:280px; width:100%;" class="lazy-img-fadein" v-lazy="item.img_url" />
            <div v-lazy:background-image="item.img_url"></div>
          </div>
        </div>
        <h1></h1>
         <div align="left" style="margin-left:15px;">
           <h5>
               {{item.subject}}
           </h5>
           <h6>{{item.subtitle}}</h6>
         </div>

      </swiper-slide>
      <div style="margin-top:15px; position:relative" class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="card card-plain" style="margin-bottom:15px;">
      <div style="padding-bottom:50px; padding-left:15px; white-space:nowrap; overflow:auto;  width:100%; display: flex;">
        <div style="display: block; height:210px; margin: 0px auto; width:90%;" v-if="eventproduct.length == 0">

        </div>
        <div style="display: height:210px; block; margin: 0px auto; width:90%;" v-for="item in eventproduct">
          <div style="width:150px; margin-right:15px;" v-ripple v-on:click="handleClickSlide(item.url)">
            <img v-lazy="item.source" class="lazy-img-fadein"  style="border-radius: 10px; width: 150px; height: 150px;" alt="..." />
            <h6 class="category_product_name" style="margin-top:10px;">
              {{item.name}}
            </h6>
            <h6 style="font-weight:700;">
              {{item.price}}
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import Images from '../Card/Images'
import { home } from '../../api'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import PlanProductCard from '../Card/PlanProductCard';

export default {
  components:{
    BeatLoader,
    Images,
    Swiper,
    SwiperSlide,
    PlanProductCard
  },
  directives: {
    swiper: directive
  },
  data(){
    return {
      eventhome : [],
      eventproduct : [],
      eventId : 0,
      index : 0,
      swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          }
      }
    }
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
  },
  mounted() {
     this.swiper.slideTo(3, 1000, false)
  },
  created(){
    home.eventday().then(data=>{
      this.eventhome = data;
      this.onSwiperSlideChangeTransitionStart();
    }).catch(error=>{
      console.log(error);
    })
  },
  methods:{
    onSwiperSlideChangeTransitionStart(){
      //0 ~ this.eventhome 길이 까지
      this.eventId = this.eventhome[this.swiper.activeIndex].event_id;
      this.eventproduct = [];
      home.eventproduct(this.eventId).then(data=>{
        this.eventproduct = data;
      }).catch(error=>{
        console.log(error);
      })
    },
    handleClickSlide(url){
      gtag('event','이벤트상품클릭',{'event_label':url});
      setTimeout(() => {
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
      }, 300);
    }
  }
}
</script>
<style>
.swiper-pagination-bullet-active{
  background:black;
}
.swiper-pagination-current{

}
</style>
