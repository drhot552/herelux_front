<template>
  <div id="app">
    <router-view name="header"></router-view>
    <div>
        <router-view/>
    </div>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
    if(navigator.userAgent.match(/Android|Tablet/i)){
      if(navigator.userAgent.match(/herelux_app_and/i)){
        window.android.check();
        window.Echo = this.Echo;
      }
    }
    else if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
      if(navigator.userAgent.match(/herelux_app_ios/i)){
        window.webkit.messageHandlers.YOURMETHOD.postMessage('check_herelux');
        window.Echo = this.Echo;
      }
    }
  },
  methods:{
    Echo(token){
      var arry = [];
      if(token != null && token != undefined){
        arry = token.split(',');
        localStorage.setItem('token', arry[0]);
        localStorage.setItem('id', arry[1]);
        localStorage.setItem('type', arry[2]);
      }


    }
  }
}
</script>
