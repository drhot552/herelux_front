<template>
<div class="rQDP3 tN4sQ">
  <div class="NgKI_">
    <div class="qqm6D" align="left">
      <ul class="YlNGR" style="padding-left:0px; padding-right:0px;">
        <li class="_-1_m6" style="opacity:1; list-style-type:none;" v-ripple v-on:click="trackOutboundLink(title, subject, direct_url)">
          <div style="text-align: center;">
            <img class="lazy-img-fadein" v-lazy="img_url" />
            <div v-lazy:background-image="img_url"></div>
          </div>
          <h1></h1>
          <div v-if="type=='event'" style="border-bottom: 1px solid rgba(136, 136, 136, 0.3);">
            <div  align="left" style="margin-left:15px; margin-bottom:7px;">
              지금 보러가기 >
            </div>
          </div>
          <!--<a v-on:click="trackOutboundLink(title, subject, direct_url)">
          </a> -->
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

export default{
  name : 'images',
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
  methods:{
    trackOutboundLink: function (title,subject, url) {
      if(url != null){
        gtag('event','상품클릭',{'event_category':title,'event_label':subject});
        this.$store.state.pageMoveURL = url;
        setTimeout(() => {
          this.$router.push(this.$route.query.returnPath || '/pagemove');
        }, 200);
      }


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
.lazy-img-fadein[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
}
</style>
