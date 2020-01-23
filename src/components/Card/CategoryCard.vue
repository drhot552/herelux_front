<template>
    <div class="content">
        <div class="container">
          <div v-ripple class="row" style="margin-bottom: 50px;" v-for="(item,i) in this.$store.state.categoryProduct" v-on:click="onClick(item.id)">
            <div class="div_category_1" style="margin-left:10px;">
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
            <div class="div_category_2" style="margin-right: 40px;">
              <div class="layer" style="text-align: left; margin-left: 25px;">
                <span style="font-size:0.81em;">{{item.name}}</span>
                <h5 style="margin-left: 25px;">{{item.avg}}</h5>
              </div>

            </div>
            <div class="div_category_3" style="float:right;">
              <img class="lazy-img-fadein" style="width:100%; float:right;" v-lazy="item.url"/>
            </div>
          </div>
        </div>
  </div>
</template>
<script>
import { product } from '../../api'
export default {
  data(){
    return{
      returnPath:''
    }
  },
  created(){
    this.returnPath = this.$route.query.returnPath || '/detail'
    //this.readMore();
  },
  methods:{
    onClick(id){
      this.$store.state.productDetail_name = 'home'
      this.returnPath = this.returnPath +'/' + id + '/home'
      setTimeout(() => {
        this.$router.push(this.returnPath)
      }, 300);
    }
  }

}
</script>
<style>
.div_category_1{
  width: 10%;
  text-align:center;
}
.div_category_1:before {
   content: '';
   display: inline-block;
   width: 0;
   height: 25%;
   vertical-align: middle;
   margin-right: -4px;
}
.div_category_2{
  width: 40%;
  text-align:center;
}
.div_category_2:before {
   content: '';
   display: inline-block;
   width: 0;
   height: 25%;
   vertical-align: middle;
   margin-right: -4px;
}
.div_category_3{
  width: 30%;
}
.div_category_4{
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
