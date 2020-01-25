<template>
  <div>
    <div style="padding-left: 50px; padding-right: 50px; text-align: center;">
      <h4 style="margin-top: 0px; margin-bottom: 10px; font-weight: 700; font-size: 1.8em;">
        명품 쇼핑몰 <br />실시간 이벤트 정보
      </h4>
      <div v-on:click="pageMove('/event')" style="color:black; font-weight:700;">
        전체 이벤트 보러가기 >
      </div>
    </div>
    <div style="margin-top:20px;">
    </div>
    <div class="card card-plain">
      <carousel :per-page="1"  :mouse-drag="true" :navigation-next-label="`>`"
                 :navigation-prev-label="`<`"	:navigation-enabled="true" :pagination-padding="2"
                 :minSwipeDistance="30" :paginationEnabled="false">
        <slide v-for="item in eventcard">
          <div class="author" align="left" style="padding:5px;">
            <h6></h6>
              <a>
                <img v-lazy="item.logoimgurl" alt="..." class="avatar img-raised lazy-img-fadein">
                <span>{{item.brands_name}}</span>
              </a>
            <h6></h6>
          </div>
          <images v-if="item.content_type === 0"
                  v-bind:type="`event`"
                  v-bind:title="item.title"
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
             <div align="left" style="margin-left:15px;">
               <h5>
                   {{item.subject}}
               </h5>
               <h6>{{item.subtitle}}</h6>
             </div>
           </div>
        </slide>
      </carousel>
    </div>
  </div>

</template>
<script>
import { home } from '../../api'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import Images from '../Card/Images'
import { Carousel, Slide } from 'vue-carousel'
export default {
  components:{
    Images,
    BeatLoader,
    Carousel,
    Slide
  },
  data() {
    return {
      returnPath:'',
      eventcard:[]
    }
  },
  created(){
    home.eventday().then(data=>{
      this.eventcard = data;
    }).catch(error=>{

    })
  }, 
  methods:{
    pageMove(page){
      this.returnPath = this.$route.query.returnPath || page
      this.$router.push(this.returnPath)
    }
  }
}
</script>
<style>
</style>
