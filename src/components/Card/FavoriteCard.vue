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
           <img class="lazy-img-fadein" v-lazy="item.url" style="max-width:90%;"/>
           <div class="lazy-img-fadein" v-lazy:background-image="item.imgurl"></div>
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
       <div align="left" style="margin-left:15px; margin-right:15px; padding-bottom:32px;">
         <div style="border-bottom: 3px solid rgb(0,0,0);">
           <h5>
               {{product_name}}
           </h5>
         </div>
         <h6></h6>
         <h6>크기 : {{product_size}}</h6>
         <h6>색상 : {{product_color}}</h6>
         <h6>가격 : {{product_price}}</h6>
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
  <modal :show.sync="modalShow" headerClasses="justify-content-center">
    <h4 slot="header" class="title title-up">{{title}}</h4>
    <p>{{descript}}</p>
    <template slot="footer" class="justify-content-center">
      <button class="btn btn-secondary" v-on:click="onClose()">Close</button>
      <button class="btn btn-primary" v-on:click="onClose()">Ok</button>
    </template>
  </modal>
 </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import Modal from '../Component/Modal'
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
      StarRating,
      Modal
    },
    created(){
      //data set
      this.product_id = this.id;
      this.product_size = this.size;
      this.product_name = this.name;
      this.product_color = this.color;
      this.product_price = this.price;
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
       descript:'',
       modalShow : false,
       product_id : 0,
       product_size : '',
       product_name : '',
       product_color : '',
       product_price : ''

     }
   },
   methods:{
     setRating: function(rating){
       this.user = localStorage.getItem('id');
       this.notify(rating);
       this.$store.commit('ISLOADING', true);
       setTimeout(() => {
         product.insert(this.product_id, this.user, rating)
           .then(data => {
            console.log(data);
            if(data.length > 0){
              if(data >= 500){
                this.descript="이용에 불편을 드려 죄송합니다. 빠른 조치중에 있습니다.";
                this.title = "서버에러";
                this.modalShow = true;
              }
              else{
                this.product_id = data[0].id;
                this.product_name = data[0].name;
                this.product_size = data[0].size;
                this.product_color = data[0].color;
                this.product_price = data[0].price;
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
            this.$store.commit('ISLOADING', false);
            //동기화 진행
           }).catch(error =>{
             console.log("error",error);
             //alert 후 페이지 이동
             this.errorAlert();
           });
       }, 1000)

       //gtag('product','별점주기',{'event_category':this.name,'event_label':rating});
     },
     listImage(){
       this.$store.commit('ISLOADING', true);
       product.select(this.product_id)
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
     notify (rating) {
      this.$popup({
        message         : rating+'점',
        delay           : 1,
        fontSize        : 50
      })
    },
    onClose(){
      this.modalShow = false;
    },
    errorAlert(){
      this.$router.push(this.$route.query.returnPath || '/error');
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
</style>
