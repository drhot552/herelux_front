<template>
  <div id="app">
    <div v-if="webFlag">
      <router-view name="app"></router-view>
    </div>
    <router-view name="header"></router-view>
    <div>
      <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!--<keeap-alive v-if="this.$store.state.pageKeepAlive">
        <router-view></router-view>
      </keeap-alive>
      <div v-else>
        <router-view></router-view>
      </div> -->
    </div>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed:{
    ...mapState('hereluxAll', {
      webFlag: 'webFlag'
    })
  },
  created(){
    if(navigator.userAgent.match(/Android|Tablet/i)){
      if(navigator.userAgent.match(/herelux_app_and/i)){
        window.android.check();
        window.Echo = this.Echo;
      }
      else {
        this.$store.commit('hereluxAll/SET_WEBFLAG', true);
      }
    }
    else if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
      if(navigator.userAgent.match(/herelux_app_ios/i)){
        window.webkit.messageHandlers.YOURMETHOD.postMessage('check_herelux');
        window.Echo = this.Echo;
      }
      else {
        this.$store.commit('hereluxAll/SET_WEBFLAG', true);
      }
    }
    else {
      this.$store.commit('hereluxAll/SET_WEBFLAG', true);
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
