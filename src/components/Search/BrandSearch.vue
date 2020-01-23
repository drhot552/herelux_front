<template>
  <div>
    <div v-if="this.brand_items.length > 0" class="row" style="margin-top: 20px;">
      <article class="div_style" v-for="item in brand_items">
        <div class="in" v-if="item.sub_descript != null">
          <div v-ripple style="color:#000000;" v-on:click="detail(item.minor_key)">
            <img v-lazy="`/public/img/brand/${item.sub_descript}.png`" class="lazy-img-fadein"  style="width: 130px; height: 130px;"alt="..." >
          </div>
        </div>
      </article>
      <div style="height:20vh;">
        <span style="margin-left: 15px; font-size:13px; color:rgb(136, 136, 136);"> * 이미지출처 - 각 브랜드 공식홈페이지 </span>
      </div>
    </div>

  </div>
</template>

<script>
import { code } from '../../api'
export default{
  data(){
    return{
      brand_items:[],
      category_items:[]
    }
  },
  created(){
    //Brand name
    this.$store.commit('ISLOADING', true);
    code.forum(1).then(data=>{
      if(data.length == 0){

      }
      else{
        this.brand_items = data;
      }
      this.$store.commit('ISLOADING', false);
    }).catch(error =>{
      console.log("error",error);
      //alert 후 페이지 이동
      this.errorAlert();
    });
  },
  methods:{
    detail(productId){
      setTimeout(() => {
        this.$router.push(this.$route.query.returnPath || '/brand/' + productId);
      }, 300);
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
