<template>
  <div>
    <div style="padding-left: 50px; padding-right: 50px; text-align: center;">
      <h4 style="margin-top: 0px; margin-bottom: 10px; font-weight: 700; font-size: 1.8em;">
        HERELUX 추천 <br /> 명품 브랜드
      </h4>
    </div>
    <div class="card card-plain">
     <div class="author" align="left" style="padding:5px;" v-for="item in brandcard">
       <h6></h6>
         <a>
           <img v-lazy="`/public/img/brand/${item.sub_descript}.png`" style="height:60px; width:60px;" alt="..." class="avatar img-raised lazy-img-fadein">
           <span style="float:right;color:black; padding-top:20px; font-size:13px; font-weight:700;" v-on:click="brandClick(item.minor_key)">전체 상품 보러가기 ></span>
         </a>
       <h6></h6>
     </div>
     <div v-if="loading" style="width:100%; height:360px; text-align: center;">
       <div style="display: inline-block; margin-top:150px;">
         <beat-loader :loading="loading" :color="'#888888'"></beat-loader>
       </div>
     </div>
     <div v-else class="owl-carousel owl-theme">
         <div style="display: block; margin: 0px auto; width:90%;" v-for="itembrand in brandrandom">
           <div v-ripple v-on:click="productClick(itembrand.id)">
             <div>
               <img class="lazy-img-fadein" v-lazy="itembrand.url"/>
             </div>
             <div style="text-align:center;">
               <h6 class="home_product_name" style="margin-top:10px;">
                 {{itembrand.name}}
               </h6>
               <h6 style="font-weight:700;">
                 {{itembrand.price}}
               </h6>
             </div>
           </div>
         </div>
       </div>
       <div class="author" align="left" style="padding:5px;" v-for="item in brandcard_Two">
         <h6></h6>
           <a>
             <img v-lazy="`/public/img/brand/${item.sub_descript}.png`" style="height:60px; width:60px;" alt="..." class="avatar img-raised lazy-img-fadein">
             <span style="float:right;color:black; padding-top:20px;  font-size:13px; font-weight:700;" v-on:click="brandClick(item.minor_key)">전체 상품 보러가기 ></span>
           </a>
         <h6></h6>
       </div>
       <div v-if="loading" style="width:100%; height:360px; text-align: center;">
         <div style="display: inline-block; margin-top:150px;">
           <beat-loader :loading="loading" :color="'#888888'"></beat-loader>
         </div>
       </div>
       <div v-else class="owl-carousel owl-theme">
           <div style="display: block; margin: 0px auto; width:90%;" v-for="itembrand in brandrandom_Two">
             <div v-ripple v-on:click="productClick(itembrand.id)">
               <div>
                 <img class="lazy-img-fadein" v-lazy="itembrand.url"/>
               </div>
               <div style="text-align:center;">
                 <h6 class="home_product_name" style="margin-top:10px;">
                   {{itembrand.name}}
                 </h6>
                 <h6 style="font-weight:700;">
                   {{itembrand.price}}
                 </h6>
               </div>
             </div>

           </div>
         </div>
    </div>
  </div>
</template>
<script>
import { home } from '../../api'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'

export default{
  components:{
    BeatLoader
  },
  data(){
    return {
      brandrandom:[],
      brandrandom_Two:[],
      brandcard:[],
      brandcard_Two:[],
      randomIdFirst : 0,
      randomIdTwo : 0,
      returnPath:'',
      loading: false
    }
  },
  mounted() {
    this.randomIdFirst = this.makeRandom(1,51);
    this.randomIdTwo = this.makeRandom(1,51);
    while( this.randomIdFirst == this.randomIdTwo){
      this.randomIdFirst = this.makeRandom(1,51);
      this.randomIdTwo = this.makeRandom(1,51);
    }
    this.brandrandomFunc(this.randomIdFirst);
    this.brandrandomFunc_Two(this.randomIdTwo);
    this.brandfetchFunc(this.randomIdFirst);
    this.brandfetchFunc_Two(this.randomIdTwo);

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
        this.$nextTick(() => {
          $(this.$el).find('.owl-carousel').owlCarousel({
            stagePadding: 70,
            margin:20,
            items:1,
            dots:false
          });
        });
      }, 1500);
  },
  methods:{
    brandrandomFunc(id){
      home.brandrandom(id).then(data => {
        this.brandcard = data;
      }).catch(error=>{

      })
    },
    brandrandomFunc_Two(id){
      home.brandrandom(id).then(data => {
        this.brandcard_Two = data;
      }).catch(error=>{

      })
    },
    brandfetchFunc(id){
      home.brandfetch(id).then(data => {
          this.brandrandom = data;
      }).catch(error=>{

      })
    },
    brandfetchFunc_Two(id){
      home.brandfetch(id).then(data => {
          this.brandrandom_Two = data;
      }).catch(error=>{

      })
    },
    makeRandom(min, max){
      var RandVal = Math.floor(Math.random()*(max-min+1)) + min;
      return RandVal;
    },
    productClick(id){
      this.$store.state.productDetail_name = 'home'
      this.returnPath = this.$route.query.returnPath || '/detail/' + id + '/home'
      setTimeout(() => {
        this.$router.push(this.returnPath)
      }, 300);
    },
    brandClick(id){
      this.returnPath = this.$route.query.returnPath || '/brand/' + id
      setTimeout(() => {
        this.$router.push(this.returnPath)
      }, 300);
    }
  }
}
</script>
<style>
.home_product_name {
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
