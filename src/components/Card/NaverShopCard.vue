<template>
  <div>
    <div style="margin-bottom:10px;">
      <img src="/public/img/naver_login_btn.png" style="width:25px;">
      <h5 style="display:inline-block; margin-left:5px;">
        <b style="color:#55c931;"> 네이버 쇼핑 </b>에서 판매중
      </h5>
    </div>
    <div style="margin-bottom:20px; color:rgb(136, 136, 136);">
      <span style="margin-right:10px; text-decoration: underline;" v-on:click="searchProduct(navershopbrand_name)">
        #{{this.navershopbrand_name}}
      </span>
      <span style="margin-right:10px; text-decoration: underline;" v-on:click="searchProduct(navershopcategory_large)">
        #{{this.navershopcategory_large}}
      </span>
      <span style="text-decoration: underline;" v-on:click="searchProduct(navershopcategory_middle)">
        #{{this.navershopcategory_middle}}
      </span>
    </div>
    <div v-if="this.navershopArray.length == 0">
      <h4>상품정보가 없습니다.</h4>
    </div>
    <div v-else>
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="loop in navershopArray">
          <div v-for="item in loop">
            <div v-on:click="onClick(item.link)">
              <div style="text-align: center; float:left; margin-right:10px;">
                <img class="lazy-img-fadein" v-lazy="item.image" style="width:100px; height:100px;"/>
                <div v-lazy:background-image="item.image"></div>
              </div>
              <div align="left" style="margin-left:15px; height:150px; margin-bottom: 10px;">
                <h6 v-html="item.title" style="padding-top: 30px;"></h6>
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
</template>

<script>
import { callback } from '../../api'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default{
  props:{
    navershopserach:String,
    navershopcategory_large : String,
    navershopbrand_name : String,
    navershopcategory_middle : String
  },
  components:{
    Swiper,
    SwiperSlide
  },
  data(){
    return {
      navershop : [],
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
    callback.navershop(this.navershopserach).then(data=>{

      for(var i = 0; i < data.items.length; i++){
        if(i % 3 == 0 && i != 0){
          this.navershopArray.push(this.navershop)
          this.navershop = [];
        }
        data.items[i].lprice = data.items[i].lprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.navershop.push(data.items[i]);
      }
    }).catch(error =>{
      console.log(error)
      this.errorAlert();
    });
  },
  methods:{
    onClick(url){
      gtag('event','네이버쇼핑클릭',{'event_label':url});

      setTimeout(() => {
        this.$router.push(this.$route.query.returnPath || '/pagemove/' + encodeURIComponent(url));
      }, 200);
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
