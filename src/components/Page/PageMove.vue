<template>
  <div class="section">
    <div class="content">
        <div class="container">
          <div class="projects-5" style="padding-top: 30px;">
              <div class="container">
                  <div class="row" style="text-align:center">
                    <h4 style="margin-top: 0px; margin-bottom: 10px; font-weight: 700; font-size: 2.2em; width:100%;">
                      HERELUX
                    </h4>
                    <h5 style="font-weight: 400; font-size: 1em; width:100%; margin-top:0px;">
                      전 세계 쇼핑몰들의 명품 정보를 한자리에
                    </h5>
                    <h5 style="padding: 20px; font-weight: 400; font-size: 1em; width:100%; border: 1px solid #9a9a9a; border-radius:10px;">
                      히어럭스는 상품판매에 직접관여하지 않으며, 가격과 사이트 주소는 판매 사이트의 사정으로 변동이 생길 수 있습니다.
                    </h5>
                  </div>
                  <div class="row">
                      <div class="col-md-8 ml-auto mr-auto text-center">
                        <AdsenseMove v-bind:slot="3141913982"></AdsenseMove>
                      </div>
                  </div>
                  <hr/>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import AdsenseMove from '../Component/AdsenseMove.vue'
export default {
  components:{
    AdsenseMove
  },
  created(){

    this.$route.params.url = decodeURIComponent(this.$route.params.url);
    
    setTimeout(() => {
      if(navigator.userAgent.match(/Android|Tablet/i)){
        if(navigator.userAgent.match(/herelux_app_and/i)){
          window.android.bridge(this.$route.params.url);
        }
        else{
          window.open(this.$route.params.url, '_blank');
        }
      }
      else if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
        if(navigator.userAgent.match(/herelux_app_ios/i)){
          window.webkit.messageHandlers.YOURMETHOD.postMessage('url_herelux|'+this.$route.params.url.trim());
        }
        else{
          window.open(this.$route.params.url, '_blank');
        }
      }
      else {
        window.open(this.$route.params.url, '_blank');
      }
      this.$router.go(-1)
    }, 4000);
  }
}
</script>
<style>
</style>
