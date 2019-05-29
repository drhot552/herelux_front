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
       <div v-if="loading" style="width:100%; height:100%; text-align: center;">
         <div style="display: inline-block; margin-top:150px;">
           <beat-loader :loading="loading" :color="'#888888'"></beat-loader>
         </div>
       </div>
       <div v-else>
         <images v-bind:img_url="item.url">
         </images>
         <div style="width:100%;">
           <div style="display:inline-block;">
             <!--별점 주기-->
             <h3>
               평균점수 {{avg}} 점
             </h3>
           </div>
        </div>
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
       <h6>크기 : {{size}}</h6>
       <h6>색상 : {{color}}</h6>
       <h6>가격 : {{price}}</h6>
     </div>
     <div align="left" style="margin-left:15px; margin-right:15px;">
       <div style="border-top: 3px solid rgb(0,0,0); border-bottom: 3px solid rgb(0,0,0);">
         <h5 style="font-weight:400"> 상품 글 적기 </h5>
         <h5 style="font-weight:400"> 상품 관련 글 보기 </h5>
       </div>
     </div>
   </div>
 </div>
</div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import Images from './Images'
import { product } from '../../api'

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
      raised: Boolean
    },
    components:{
      Carousel,
      Slide,
      Images
    },
    created(){
      this.avg = this.star / this.count;
      this.avg = this.avg.toFixed(2);
      this.listImage();
   },
   data(){
     return{
       productimg:[],
       loading:false,
       productflag : true,
       avg : 0
     }
   },
   methods:{
     listImage(){
       product.select(this.id)
         .then(data => {
           this.productimg = data;
           console.log(data);
         })
         .catch(error =>{
           console.log(error)
         });
     },
     fetchData(){
       this.loading = true
       setTimeout(() => {
         this.loading=false
       }, 500)
     }
   }

  }
</script>
<style>
</style>
