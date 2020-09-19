<template>
    <div class="content">
        <div class="container" style="margin-bottom:10px">
          <div class="row" style="backgroud-color:white; padding-bottom: 15px; border-bottom: 7px solid hsla(0,0%,53%,.3);">

          </div>
          <div v-ripple class="row" style="backgroud-color:white; padding-bottom: 15px; border-bottom: 7px solid hsla(0,0%,53%,.3);"
                v-for="item in navercafe">
            <div style="width:100%;" v-ripple v-on:click="onClick(item.link)">
              <div class="div_board_1" style="margin-left:10px; margin-right:10px;">
                <!--순위대로 색을 다르게 check-->
                  <div class="layer">
                    <span style="font-size:1.4em;" v-html="item.title">
                    </span>
                    <h6 v-html="item.description" class="search_ellipsis" style="margin-top: 25px;">
                    </h6>
                  </div>

              </div>
              <div class="div_board_1" style="margin-left:10px">
                <div>
                  <img class="h6_style" src="/public/img/naver_cafe.png" style="width:15px;">
                  <h6 class="h6_style" style="font-weight: 600;"> {{item.cafename}} </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>
<script>
import { callback } from '../../api'
export default {
  props: {
    cafeSearch:Number
  },
  created(){
    callback.navercafe(this.cafeSearch).then(data=>{
      this.navercafe  = data.items;
    }).catch(error =>{
      console.log(error)
    });
  },
  data(){
    return{
      descript:'',
      title:'',
      navercafe :[]
    }
  },
  methods:{
    readMore(){
      //처음은 일단 0으로 set

    },
    onClick(url){
      gtag('event','네이버카페클릭',{'event_label':url});
      setTimeout(() => {
        this.$router.push(this.$route.query.returnPath || '/pagemove/' + encodeURIComponent(url));
      }, 200);
    }
  }

}
</script>
<style>
.div_board_1{
  text-align:left;
}
.div_board_1:before {
   content: '';
   display: inline-block;
   width: 0;
   height: 25%;
   vertical-align: middle;
   margin-right: -4px;
}
.div_board_2{
  width:100%;
  text-align:left;
}
.div_board_2:before {
   content: '';
   display: inline-block;
   width: 0;
   height: 25%;
   vertical-align: middle;
   margin-right: -4px;
}
.div_board_3{
  width: 40%;
}
.div_board_4{
  width: 100%;
  height:150px;
  position: absolute;
  z-index:0;
}
.h6_style{
  float:left;
  margin-right:10px;
  font-size :10px;
}
.board_view{
   right: 0px;
   transform: translate(0%,-150%);
   z-index: 2;
   text-align: center;
}
.search_ellipsis{
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.9em;
  font-size: 1.0em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: rgba(135, 135, 135);
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
