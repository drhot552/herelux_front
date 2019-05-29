<template>
  <div class="card"
       :class="[
         {'card-plain': plain},
         {'card-raised': raised},
         {[`card-${type}`]: type}
       ]"
       :data-background-color="color">
   <div class="author" align="left" style="padding:5px;">
     <h6></h6>
       <a v-bind:href="url" target="_blank" v-on:click="trackOutboundLink(title, url)">
         <img v-lazy="logoimgurl" alt="..." class="avatar img-raised">
         <span>{{title}}</span>
       </a>
     <h6></h6>
  </div>
   <div>
     <carousel :per-page="1"  :mouse-drag="true" @pageChange="pageChange" :navigation-next-label="`>`"
                :navigation-prev-label="`<`"	:navigation-enabled="true" :pagination-padding="2"
                :minSwipeDistance="30">
       <slide v-for="item in eventimg">
         <images v-if="item.content_type === 0"
                 v-bind:type="`event`"
                 v-bind:title="title"
                 v-bind:subject="item.subject"
                 v-bind:subtitle="item.subtitle"
                 v-bind:img_url="item.img_url"
                 v-bind:direct_url="item.direct_url">
         </images>
         <!-- youtube video -->
         <div v-if="item.content_type === 1">
           <div v-if="loading" style="width:100%; height:360px; text-align: center;">
             <div style="display: inline-block; margin-top:150px;">
               <beat-loader :loading="loading" :color="'#888888'"></beat-loader>
             </div>
           </div>
           <div v-else>
             <iframe
                v-bind:id ="item.direct_url"
                class="yt_player_iframe"
                width="100%"
                height="360"
                v-bind:src="item.img_url"
                frameborder="0"
                allowfullscreen></iframe>
           </div>

            <div align="left" style="margin-left:15px;">
              <h5>
                  {{item.subject}}
              </h5>
              <h6>{{item.subtitle}}</h6>
            </div>

            <ul class="ul_style" v-for="video in eventvideo">
              <li class="li_style" v-if="video.videourl == item.direct_url">
                <h6>
                  <a v-bind:href="video.url" target="_blank">
                    <div class="div_effect">
                      <div class="div_style_1">
                        {{video.id}}.
                      </div>
                      <div class="div_style_2">
                        {{video.subject}}
                      </div>
                      <div class="div_style_3">
                        {{video.price}}원
                      </div>
                      <div class="div_style_4">
                         >
                      </div>
                    </div>
                  </a>
                </h6>
              </li>
            </ul>
          </div>
       </slide>
     </carousel>

  </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import Cauly from './Cauly';
import { event } from '../../api'

import Images from './Images'
var ytplayer = [];

export default {
    name: 'card',
    props: {
      type: String,
      title: String,
      logoimgurl: String,
      url:String,
      color: String,
      plain: Boolean,
      raised: Boolean
    },
    components:{
      Carousel,
      Slide,
      Images,
      Cauly,
      BeatLoader
    },
    created(){
      //이미지
      event.image(this.title)
        .then(data => {
          this.eventimg = data
        })
        .catch(error =>{
          console.log(error)
      })
      event.video()
        .then(data => {
          this.eventvideo = data
        })
        .catch(error =>{
          console.log(error)
      })
      //로딩
      this.fetchData();
   },
   data(){
     return{
       eventimg:[],
       eventvideo:[],
       loading:false
     }
   },
   methods:{
     trackOutboundLink: function (title,url) {
       gtag('event','이커머스클릭',{'event_category':title,'event_label':url});
     },
     trackOutboundLinkVideo: function (title,subject) {
       gtag('event','유투브상품클릭',{'event_category':title,'event_label':subject});
     },
     pageChange(){
       //현재 유투브 영상이 틀어져있으면 off
       $('.yt_player_iframe').each(function(){
          this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
        });
     },
     fetchData(){
         this.loading = true
         setTimeout(() => {
           this.loading=false
         }, 2000)
     }
   }

  }
</script>
<style>
.ul_style{
  list-style: none;
  padding: 0;
  max-width: 100%;
  margin: 10px auto;
}
.li_style{
  color: #888888;
  text-align: left;
  margin-left:15px;
  margin-right:15px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(136, 136, 136, 0.3);
}
.div_style_1{
  float: left;
  width: 10%;
}
.div_style_2{
  float: left;
  width: 55%;
}
.div_style_3{
  float: left;
  width: 30%;
}
.div_style_4{
  float: left;
  width: 5%;
}
.div_effect:active{
  color: #888888;
}
</style>
