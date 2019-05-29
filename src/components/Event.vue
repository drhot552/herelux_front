<template>
  <div class="wrapper">
    <div class="section-space"></div>
    <back-to-top bottom="20px" right="20px">
      <button type="button" class="goTop">
        <i class="fa fa-chevron-up"></i>
      </button>
    </back-to-top>
    <EventComponent/>
    <div class="section-space"></div>
  </div>
</template>

<script>
import EventComponent from './Event/Event.vue'
import BackToTop from 'vue-backtotop'
export default {
  components : {
    EventComponent,
    BackToTop
  }
}
</script>
<style>
.goTop {
  border-radius: 50px;
  background-color: rgba(31,45,61,.11);
  position: fixed;
  width: 45px;
  height: 45px;
  display: block;
  right: 20px;
  bottom: 75px;
  border: none;
}
</style>
