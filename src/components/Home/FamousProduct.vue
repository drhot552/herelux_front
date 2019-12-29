<template>
  <div>
    <div style="padding-left: 50px; padding-right: 50px; text-align: center;">
      <h4 style="margin-top: 0px; margin-bottom: 10px; font-weight: 700; font-size: 1.8em;">
        HERELUX  PICK
      </h4>
      <h5 style="font-weight: 400; font-size: 1em;">
        전세계의 모든 쇼핑몰의 1500개의 상품이 전시되는 중입니다.
      </h5>
      <a href="/" style="color:black; font-weight:700;">
        전체 상품 보러가기 >
      </a>
    </div>
    <div style="margin-top:20px;">
      <div class="owl-carousel owl-theme">
        <div style="display: block; margin: 0px auto; width:90%;" v-for="item in image">
          <div>
            <img class="lazy-img-fadein" v-lazy="item.url"/>
          </div>
          <div style="text-align:center;">
            <h6 style="margin-top:10px; font-weight:700;">
              {{item.name}}
            </h6>
            <h6 style="font-weight:700;">
              {{item.price}}
            </h6>
          </div>

        </div>
        <div>

        </div>
      </div>
    </div>
  </div>

</template>
<script>
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import { home } from '../../api'

export default {
  data(){
    return{
      image:[]
    }
  },
  created(){

    home.productrandom().then(data =>{
      this.image = data;
      console.log(this.image[0].url);
      $(document).ready(function(){
        $('.owl-carousel').owlCarousel({
          stagePadding: 70,
          margin:20,
          items:1,
          dots:false
      })
      });
    }).catch(error =>{
      this.$router.push(this.$route.query.returnPath || '/error');
    });
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
</style>
