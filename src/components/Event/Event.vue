<template>
  <div class="blogs-4" id="blogs-4">
      <div class="container">
        <div class="row">
              <article class="col-md-8 ml-auto mr-auto" v-for="herelux in event">
                <div v-if="herelux.brands_name=='Herelux'">
                  <card type="blog" plain v-bind:title="herelux.brands_name" v-bind:url="herelux.url"
                        v-bind:logoimgurl="herelux.logoimgurl">
                  </card>
                  <br/>
                  <br/>
                  <Cauly v-bind:type="1">
                  </Cauly>
                </div>
              </article>

              <article class="col-md-8 ml-auto mr-auto" v-for="(brands,i) in event">
                <div v-if="brands.brands_name!='Herelux'">
                  <card type="blog" plain v-bind:title="brands.brands_name" v-bind:url="brands.url"
                      v-bind:logoimgurl="brands.logoimgurl">
                  </card>
                  <br/>
                  <br/>
                  <div v-if="i == 5">
                    <Cauly v-bind:type="2">
                    </Cauly>
                  </div>
                  <div v-if="i == 1">
                    <Cauly v-bind:type="3">
                    </Cauly>
                  </div>
                </div>

              </article>
              <article class="col-md-8 ml-auto mr-auto">
                <Cauly v-bind:type="0">
                </Cauly>
              </article>
          </div>
      </div>
  </div>
</template>

<script>
import Card from '../Card/Cards'
import Cauly from '../Card/Cauly'
 export default{
   components : {
     Card,
     Cauly
   },
   mounted(){
     //ip 정보
     this.$http.get('http://54.180.145.103:4000/event').then((response)=>{
       this.event = response.data
       this.random()  //random으로 섞기

       //adfit
       let recaptchaScript = document.createElement('script');
       recaptchaScript.setAttribute('src', '//t1.daumcdn.net/adfit/static/ad.min.js');
       document.head.appendChild(recaptchaScript);


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
