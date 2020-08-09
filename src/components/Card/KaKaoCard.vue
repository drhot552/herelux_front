<template>
    <div class="content">
        <div class="container" style="margin-bottom:80px">
          <div v-ripple class="row" style="padding-bottom: 15px; border-bottom: 7px solid hsla(0,0%,53%,.3);"
                v-for="item in kakaosearchArry">
            <div style="width:100%;" v-ripple v-on:click="onClick(item.url)">
              <div class="div_board_1" style="margin-left:10px; margin-right:10px;">
                <!--순위대로 색을 다르게 check-->
                  <div class="layer">
                    <span style="font-size:1.4em;" v-html="item.title">
                    </span>
                    <h6 v-html="item.contents" class="search_ellipsis" style="margin-top: 25px;">
                    </h6>
                  </div>

              </div>
              <div class="div_board_1" style="margin-left:10px">
                <div>
                  <img class="h6_style" src="/public/img/kakao_logo.jpg" style="width:50px;">
                  <h6 class="h6_style"> | </h6>
                  <h6 class="h6_style" style="font-weight: 600;"> {{`작성시간 : ` + item.datetime}} </h6>
                </div>
              </div>
            </div>
            <div style="margin-top:35px; position: relative;">
            </div>
          </div>
        </div>
  </div>
</template>
<script>
import { callback } from '../../api'
import axios from 'axios'
export default {
  props: {
    kakaoSearch:String
  },
  created(){
    let settings = { headers: { 'Authorization': 'KakaoAK b958cdc7ceb1e2d91ebaf41f59e8decd' } }
    axios.get( 'https://dapi.kakao.com/v2/search/web?query=' + this.kakaoSearch, settings)
     .then(data => {
      this.kakaosearchArry = data.data.documents;
     }).catch(response => {
      console.log("error",response)
     })
  },
  data(){
    return{
      descript:'',
      title:'',
      kakaosearchArry :[]
    }
  },
  methods:{
    readMore(){
      //처음은 일단 0으로 set

    },
    onClick(url){
      gtag('event','카카오블로그클릭',{'event_label':url});
      url = url.replace(/\//gi,'!!');
      url = url.replace(/\?/gi,'@@');
      setTimeout(() => {
        this.$router.push(this.$route.query.returnPath || '/pagemove/' + url);
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
.write_button {
  border-radius: 50px;
  background-color: #ffffff;
  position: fixed;
  width: 45px;
  height: 45px;
  display: block;
  right: 20px;
  bottom: 75px;
  border: none;
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
