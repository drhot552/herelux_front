<template>
<div class="rQDP3 tN4sQ">
  <div class="NgKI_">
    <div class="qqm6D" align="left">
      <ul class="YlNGR" style="padding-left:0px; padding-right:0px;">
        <li class="_-1_m6" style="opacity:1; list-style-type:none;">
          <div v-if="loading" style="width:100%; height:360px; text-align: center;">
            <div style="display: inline-block; margin-top:150px;">
              <beat-loader :loading="loading" :color="'#888888'"></beat-loader>
            </div>
          </div>
          <div v-else style="text-align: center;">
            <img  v-lazy="img_url" />
            <div v-lazy:background-image="img_url"></div>
          </div>
          <h1></h1>
          <a v-if="type=='event'" v-bind:href="direct_url" target="_blank" v-on:click="trackOutboundLink(title, subject)">
            <div style="border-bottom: 1px solid rgba(136, 136, 136, 0.3);">
              <div align="left" style="margin-left:15px; margin-bottom:7px;">
                지금 보러가기 >
              </div>
            </div>
           </a>
           <div align="left" style="margin-left:15px;">
             <h5>
                 {{subject}}
             </h5>
             <h6>{{subtitle}}</h6>
           </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'

export default{
  name : 'images',
  components:{
    BeatLoader
  },
  props: {
    subject: String,
    subtitle: String,
    img_url: String,
    title:String,
    direct_url : String,
    type:String
  },
  data(){
    return{
      loading: false
    }
  },
  created(){
    this.fetchData()
  },
  methods:{
    trackOutboundLink: function (title,subject) {
      gtag('event','상품클릭',{'event_category':title,'event_label':subject});
    },
    fetchData(){
        this.loading = true
        setTimeout(() => {
          this.loading=false
        }, 1000)
    }
  }
}
</script>

<style>

._-1_m6 {
    -webkit-transition-duration: .05s,.3s;
    transition-duration: .05s,.3s;
    -webkit-transition-property: opacity,width;
    transition-property: opacity,width;
    -webkit-transition-timing-function: linear,ease;
    transition-timing-function: linear,ease;
}
.YlNGR {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.qqm6D {
    display: inline-block;
    line-height: 18px;
}
.NgKI_ {
    display: block;
    line-height: 0;
    overflow: hidden;
}
.rQDP3 .tN4sQ {
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
}
</style>
