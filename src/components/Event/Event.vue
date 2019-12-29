<template>
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
                  <div id="ad_container">

                  </div>
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
                    <div id="ad_container">

                    </div>
                  </div>
                  <div v-if="i == 1">
                    <div id="ad_container">

                    </div>
                  </div>
                </div>

              </article>
              <article class="col-md-8 ml-auto mr-auto" style="padding-bottom: 30px;">
                <div id="ad_container">

                </div>
              </article>
          </div>

      </div>
  </div>
</template>

<script>
import Card from '../Card/Cards'
import Cauly from '../Card/Cauly'
import { event } from '../../api'
 export default{
   components : {
     Card,
     Cauly
   },
   mounted(){
     //ip 정보
      window.google_ad_client = "ca-pub-4141026730478876";
      window.google_ad_slot = "6033471797";
      window.google_ad_width = 200;
      window.google_ad_height = 200;

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
</style>
