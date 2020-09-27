<template>
    <nav class="navbar fixed-top button-fixed-top" style="background-color: #ddd;">
      <div class="container" style="padding-right:0px; padding-left:0px;">
        <div class="navbar-brand" v-on:click="appClick()" style="text-align:left;">
          <img src="/public/img/btn_close.png" style="height:20px;"/>
        </div>
        <div v-on:click="appStore()">
          <img src="/public/img/btn_logo.png" style="height:40px;border-radius:10px;"/>
        </div>
        <div v-on:click="appStore()" class="board_style_middle" style="font-weight: 700;">
          앱으로 보다 편리하게 정보를 얻으세요.
        </div>
      </div>
    </nav>
</template>
<script>
  export default {
    methods:{
      appClick(){
        //이미지 삭제
        this.$store.state.webFlag = false;
      },
      appStore(url){
        if(navigator.userAgent.match(/Android|Tablet/i)){
          if(navigator.userAgent.match(/herelux_app_and/i)){
            window.android.bridge('https://play.google.com/store/apps/details?id=com.nabak.herelux');
          }
          else{
            window.open('https://play.google.com/store/apps/details?id=com.nabak.herelux', '_blank');
          }
        }
        else if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
          if(navigator.userAgent.match(/herelux_app_ios/i)){
            window.webkit.messageHandlers.YOURMETHOD.postMessage(url.trim());
          }
          else{
            window.open('https://apps.apple.com/kr/app/herelux/id1484441325', '_blank');
          }
        }
        else {
          window.open('https://apps.apple.com/kr/app/herelux/id1484441325', '_blank');
        }
      }
    }
  }
</script>
<style scoped>
nav {
  text-align: center;
}
.board_style{
  color: rgb(136, 136, 136);
}

.board_style_middle{
  width:70%;
  text-align: center;
}
.modal-view{
  width: 100%;
  height: 200px;
  overflow-y: scroll;
}
.button-fixed-top  {
  padding-top: calc(constant(safe-area-inset-top) - 10px);
  padding-top: calc(env(safe-area-inset-top) - 10px);
}
</style>
