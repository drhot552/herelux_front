<template>
    <div class="content">
        <div class="container">
          <div v-ripple class="row" style="margin-bottom: 50px;" v-for="(item,i) in this.$store.state.product" v-on:click="onClick(item.id)">
            <div class="div_ranking_1" style="margin-left:10px;">
              <!--순위대로 색을 다르게 check-->
                <div class="layer">
                  <h2 v-if="i+1==1" style="color:#ffd700; font-size:3em;">
                    <b>{{i + 1}}</b>
                  </h2>
                  <h2 v-else-if="i+1==2" style="color:#c0c0c0; font-size:3em;">
                    <b>{{i + 1}}</b>
                  </h2>
                  <h2 v-else-if="i+1==3" style="color:#964b00; font-size:3em;">
                    <b>{{i + 1}}</b>
                  </h2>
                  <h2 v-else style="font-size:3em;">
                    <b>{{i + 1}}</b>
                  </h2>
                </div>

            </div>
            <div class="div_ranking_2" style="margin-right: 40px;">
              <div class="layer" style="text-align: left; margin-left: 25px;">
                <span style="font-size:0.81em;">{{item.name}}</span>
                <h5 style="margin-left: 25px;">{{item.avg}}</h5>
              </div>

            </div>
            <div class="div_ranking_3" style="float:right;">
              <img class="lazy-img-fadein" style="width:100%; float:right;" v-lazy="item.url"/>
            </div>
          </div>
          <!--
          <div v-if="this.$store.state.readFlag && this.$store.state.idx < 5" style="text-align:center; height:100px; z-index:1;">
            <a style="color:#000000;" v-on:click="readMore()">
              <img src="/public/img/btn_arrow_down.png" style="height:20px;margin-top: 10px;"/>
            </a>
          </div>
          -->
        </div>
  </div>
</template>
<script>
import { product } from '../../api'
export default {
  props: {
    category_type:Number
  },
  data(){
    return{
      descript:'',
      title:'',
      returnPath:''
    }
  },
  created(){
  },
  methods:{
    readMore(){
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_RANK_READMORE',{category_type:this.category_type, category:this.$store.state.rankTabStatus});
    },
    onClick(id){
      this.$store.state.productDetail_name = 'ranking'
      this.returnPath = this.$route.query.returnPath || '/detail/' + id + '/ranking'
      setTimeout(() => {
        this.$router.push(this.returnPath)
      },300)
    }
  }

}
</script>
<style>
.div_ranking_1{
  width: 10%;
  text-align:center;
}
.div_ranking_1:before {
   content: '';
   display: inline-block;
   width: 0;
   height: 25%;
   vertical-align: middle;
   margin-right: -4px;
}
.div_ranking_2{
  width: 40%;
  text-align:center;
}
.div_ranking_2:before {
   content: '';
   display: inline-block;
   width: 0;
   height: 25%;
   vertical-align: middle;
   margin-right: -4px;
}
.div_ranking_3{
  width: 30%;
}
.div_ranking_4{
  width: 100%;
  height:150px;
  position: absolute;
  z-index:0;
}
.lazy-img-fadein[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }

</style>
