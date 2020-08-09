<template>
  <div class="section">
    <div class="content">
        <div class="container">
          <div class="projects-5">
              <div class="container">
                  <div class="row">
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

    this.$route.params.url = this.$route.params.url.replace(/!!/gi,'/');
    this.$route.params.url = this.$route.params.url.replace(/@@/gi,'?');
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
    }, 800);
  }
}
</script>
<style>
</style>
