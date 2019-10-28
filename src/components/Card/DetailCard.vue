<template>
  <div class="card"
       :class="[
         {'card-plain': plain},
         {'card-raised': raised},
         {[`card-${type}`]: type}
       ]">
  <div v-if="productflag">
   <carousel :per-page="1"  :mouse-drag="true"  :navigation-next-label="`>`"
              :navigation-prev-label="`<`" :pagination-position="`top-overlay`"	:navigation-enabled="true" :pagination-padding="2"
              :minSwipeDistance="30">
     <slide v-for="item in productimg">
       <!--<div style="width:100%; padding-bottom:10px;">
         <div style="display:inline-block;">
           <h5>
             평균점수 {{avg}} 점
           </h5>
         </div>
      </div> -->
       <div v-if="loading" style="width:100%; height:100%; text-align: center;">
         <div style="display: inline-block; margin-top:150px;">
           <beat-loader :loading="loading" :color="'#888888'"></beat-loader>
         </div>
       </div>
       <div v-else>
         <images v-bind:img_url="item.url">
         </images>
      </div>
    </slide>
   </carousel>
   <div v-if="loading" style="width:100%; height:100%; text-align: center;">

   </div>
   <div v-else>
     <div align="left" style="margin-left:15px; margin-right:15px;">
       <div style="border-bottom: 3px solid rgb(0,0,0);">
         <h5>
             {{name}}
         </h5>
       </div>
       <h6></h6>
       <h6 v-if="avg > 0">평균점수 {{avg}} 점 </h6>
       <h6 v-else >평균점수 투표 전 </h6>
       <h6>크기 : {{size}}</h6>
       <h6>색상 : {{color}}</h6>
       <h6>모델/상품번호 : {{sub_name}}</h6>
       <h5 style="margin-bottom: 15px;">가격 : {{price}}</h5>
     </div>
     <div align="left" style="margin-left:15px; margin-right:15px;">
       <div style="border-top: 3px solid rgb(0,0,0); padding-top : 10px">
        <!-- <h5 style="font-weight:400"> 상품 글 적기 </h5>
         <h5 style="font-weight:400"> 상품 관련 글 보기 </h5> -->
         <Cauly v-bind:type="2">
         </Cauly>
       </div>
     </div>
     <div align="left" style="margin-left:15px; margin-right:15px;">
       <h5 style="font-weight:400"> 판매정보 </h5>
    </div>
    <!-- -->
    <ul v-for="(item,i) in detailbrand" class="brand ul_style">
      <li class="li_style" style="height: 60px;">
        <a v-on:click="detailClick(item.url)" >
          <img v-lazy="item.logoimgurl" alt="..." class="avatar img-raised" style="float:left;">
          <span class="span_style">
            >
          </span>
          <span class="span_style">
            {{item.price}} {{item.price_symbol}}
          </span>
          <span v-if="i ==0" class="span_style_1">
            * 이미지출처
          </span>
        </a>
      </li>
    </ul>
    <div style="height:50px; text-align:left;">
      <span style="float: left; margin-left: 15px; margin-right: 15px; font-size:13px; color:rgb(136, 136, 136);"> * 가격과 사이트 주소는 판매 사이트의 사정으로 변동이 생길 수 있습니다.</span>
    </div>
    <div style="height:50px;">

    </div>
   </div>
 </div>
</div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import Images from './Images'
import { product } from '../../api'
import Cauly from '../Card/Cauly'

export default {
    props: {
      id: Number,
      name:String,
      size:String,
      color:String,
      price: String,
      plain: Boolean,
      star : Number,
      count : Number,
      sub_name : String,
      raised: Boolean
    },
    components:{
      Carousel,
      Slide,
      Images,
      Cauly
    },
    created(){
      this.avg = this.star / this.count;
      this.avg = this.avg.toFixed(2);

      this.$store.commit('ISLOADING', true);
      product.detailbrand(this.id)
        .then(data => {
          this.detailbrand = data;
          this.$store.commit('ISLOADING', false);
        })
        .catch(error =>{
          console.log(error)
          this.errorAlert();
        });
      this.listImage();
   },
   data(){
     return{
       productimg:[],
       loading:false,
       productflag : true,
       avg : 0,
       detailbrand : []
     }
   },
   methods:{
     listImage(){
       this.$store.commit('ISLOADING', true);
       product.select(this.id)
         .then(data => {
           this.productimg = data;
           console.log(data);
           this.$store.commit('ISLOADING', false);
         })
         .catch(error =>{
           console.log(error)
           this.errorAlert();
         });
     },
     fetchData(){
       this.loading = true
       setTimeout(() => {
         this.loading=false
       }, 500)
     },
     detailClick(url){

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
           window.webkit.messageHandlers.YOURMETHOD.postMessage(url.trim());
         }
         else{
           window.open(url, '_blank');
         }
       }
       else {
         window.open(url, '_blank');
       }
     },
     errorAlert(){
       alert("서버와의 통신 에러가 발생하였습니다.");
       this.$router.push(this.$route.query.returnPath || '/error');
     }
   }

  }
</script>
<style>
.avatar {
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 5px;
}
.brand {
  width: 100%;
  text-align: left;
  margin-left: 15px;
  margin-bottom: 15px;
}
.ul_style {
    list-style: none;
    padding: 0;
    max-width: 100%;
    margin: 10px auto;
}
.li_style{
  color: #888;
    text-align: left;
    margin-left: 15px;
    margin-right: 15px;
    padding: 12px 0;
    border-bottom: 1px solid hsla(0,0%,53%,.3);
}
.div_style_1{
  float: left;
  width: 10%;
}
.div_style_2{
  float: left;
  width: 55%;
}
.span_style{
    float: left;
    width: 30%;
    text-align: center;
    font-size: 0.9em;
    color: black;
}
.span_style_1{
  text-align: right;
  float: right;
  font-size: 0.81em;
}
</style>
