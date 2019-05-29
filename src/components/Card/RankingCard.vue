<template>
    <div class="content">
        <div class="container">
          <div class="row" v-for="(item,i) in this.$store.state.product">
            <div class="div_ranking_1" style="margin-left:10px;">
              <!--순위대로 색을 다르게 check-->
                <div class="layer">
                  <h1 v-if="i+1==1" style="color:#ffd700;">
                    <b>{{i + 1}}</b>
                  </h1>
                  <h1 v-else-if="i+1==2" style="color:#c0c0c0;">
                    <b>{{i + 1}}</b>
                  </h1>
                  <h1 v-else-if="i+1==3" style="color:#964b00;">
                    <b>{{i + 1}}</b>
                  </h1>
                  <h1 v-else>
                    <b>{{i + 1}}</b>
                  </h1>
                </div>

            </div>
            <div class="div_ranking_2">
              <div class="layer">
                <span>{{item.name}}</span>
                <h5>{{item.avg}}</h5>
              </div>

            </div>
            <div class="div_ranking_3">
              <img v-lazy="item.url"/>
            </div>
            <router-link class="div_ranking_4" v-bind:to="`/detail/`+item.id">
            </router-link>

          </div>
          <div v-if="this.$store.state.readFlag" style="text-align:center; height:50px;">
            <a style="color:#000000;" v-on:click="readMore()">
              <span>더보기..</span>
            </a>
          </div>
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
      title:''
    }
  },
  created(){
    this.readMore();
  },
  methods:{
    readMore(){

      this.$store.dispatch('FETCH_RANK_READMORE',{category_type:this.category_type, category:this.$store.state.rankTabStatus});
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
  width: 40%;
}
.div_ranking_4{
  width: 100%;
  height:150px;
  position: absolute;
  z-index:0;
}

</style>
