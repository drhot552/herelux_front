<template>
  <div class="card"
       :class="[
         {'card-plain': plain},
         {'card-raised': raised},
         {[`card-${type}`]: type}
       ]">
   <vue-up></vue-up>
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
               <star-rating id="rating" :rating="ratingnum" class="star" :increment="0.5" :show-rating="false" @rating-selected="setRating"></star-rating>
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
     </div>

  </div>
  <!-- 모든 상품을 선택했을 경우 -->
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
  <b-modal id="modal-center" centered v-bind:title="title">
    {{descript}}
  </b-modal>
 </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import Images from './Images'
import StarRating from 'vue-star-rating'
import { product } from '../../api'

export default {
    props: {
      id: Number,
      name:String,
      size:String,
      color:String,
      price: String,
      plain: Boolean,
      raised: Boolean
    },
    components:{
      Carousel,
      Slide,
      Images,
      StarRating
    },
    created(){
      this.listImage();
   },
   data(){
     return{
       productimg:[],
       loading:false,
       ratingnum: 0,
       productflag : true,
       user: '',
       title:'',
       descript:''

     }
   },
   methods:{
     setRating: function(rating){
       this.user = localStorage.getItem('id');
       this.notify(rating);
       setTimeout(() => {
         product.insert(this.id, this.user, rating)
           .then(data => {
            console.log(data);
            if(data.length > 0){
              if(data >= 500){
                this.descript="이용에 불편을 드려 죄송합니다. 빠른 조치중에 있습니다.";
                this.title = "서버에러";
                this.$root.$emit('bv::show::modal','modal-center', '#btnShow')
              }
              else{
                this.id = data[0].id;
                this.name = data[0].name;
                this.size = data[0].size;
                this.color = data[0].color;
                this.price = data[0].price;
                this.productimg[0].source = data[0].source;
                this.productimg[0].url = data[0].url;

                this.ratingnum = 0;
                this.productflag = true;
                this.fetchData();
              }
            }
            else{
              this.productflag = false;
            }
            //동기화 진행
           })
           .catch(error =>{
             console.log(error)
           })
       }, 1000)

       //gtag('product','별점주기',{'event_category':this.name,'event_label':rating});
     },
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
     },
     notify (rating) {
      this.$popup({
        message         : rating+'점',
        delay           : 1,
        fontSize        : 50
      })
     }
   }

  }
</script>
<style>
</style>
