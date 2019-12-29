<template>
  <div class="section" style="padding:51px 0px; overflow:auto; -webkit-overflow-scrolling: touch;">
    <back-to-top bottom="20px" right="20px">
      <button type="button" class="goTop">
        <i class="fa fa-chevron-up"></i>
      </button>
    </back-to-top>
    <div class="blogs-4" id="blogs-4">
        <div class="container" style="height: 71vh;">
          <div class="row" style="height: 71vh;">
                <article class="col-md-8 ml-auto mr-auto" v-for="herelux in event">
                  <div v-if="herelux.brands_name=='Herelux'" style="padding-bottom: 30px;">
                    <card type="blog" plain v-bind:title="herelux.brands_name" v-bind:url="herelux.url"
                          v-bind:logoimgurl="herelux.logoimgurl">
                    </card>
                    <br/>
                    <br/>
                  </div>
                </article>

                <article class="col-md-8 ml-auto mr-auto" v-for="(brands,i) in event">
                  <div v-if="brands.brands_name!='Herelux'" style="padding-bottom: 30px;">
                    <card type="blog" plain v-bind:title="brands.brands_name" v-bind:url="brands.url"
                        v-bind:logoimgurl="brands.logoimgurl">
                    </card>
                    <br/>
                    <br/>
                    <div v-if="i == 5">
                    </div>
                    <div v-if="i == 1">
                    </div>
                  </div>

                </article>
                <article class="col-md-8 ml-auto mr-auto" style="padding-bottom: 30px;">
  	       </article>
            </div>

        </div>
    </div>
    <div class="section-space"></div>
  </div>
</template>

<script>
import Card from '../Card/Cards'
import Cauly from '../Card/Cauly'
import { event } from '../../api'
import BackToTop from 'vue-backtotop'
 export default{
   components : {
     Card,
     Cauly,
     BackToTop
   },
   mounted(){
     //ip 정보
    /*  window.google_ad_client = "ca-pub-4141026730478876";
      window.google_ad_slot = "6033471797";
      window.google_ad_width = 1024;
      window.google_ad_height = 512;
      // container is where you want the ad to be inserted
      var container = document.getElementById('ad_container');
      var w = document.write;
      document.write = function (content) {
          container.innerHTML = content;
          document.write = w;
      };

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://pagead2.googlesyndication.com/pagead/show_ads.js';
      document.body.appendChild(script);
      */
     event.fetch().then(data => {
       this.event = data;
       this.random()  //random으로 섞기

       //adfit
       let recaptchaScript = document.createElement('script');
       recaptchaScript.setAttribute('src', '//t1.daumcdn.net/adfit/static/ad.min.js');
       document.head.appendChild(recaptchaScript);
     }).catch(error =>{
       console.log(error)
       this.errorAlert();
     });

     //cauly
     let cauly = document.createElement('script');
     cauly.setAttribute('src', '//image.cauly.co.kr/websdk/common/lasted/ads.min.js');
     document.head.appendChild(cauly);

   },
   data(){
     return{
       event:[]
     }
   },
   methods:{
     random(){
       //random으로 섞기 랜덤함수
       let randomarry = [];
       for(let i = 0; i < this.event.length; i++){
         let random = Math.floor(Math.random() * this.event.length);
         //중복을 제거
         let temp = this.event[i];
         this.event[i] = this.event[random];
         this.event[random] = temp;
       }
     }
   }
 }
</script>

<style>
.col-md-8 {
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 0px;
    padding-left: 0px;
}
.goTop {
  border-radius: 50px;
  background-color: rgba(31,45,61,.11);
  position: fixed;
  width: 45px;
  height: 45px;
  display: block;
  right: 20px;
  bottom: 75px;
  border: none;
}
</style>
