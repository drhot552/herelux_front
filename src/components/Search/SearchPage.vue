<template>
  <div>
    <ul class="tabs_category" ref="tabbar">
       <div class="tabitem_category" :class="index === searchactivetab ? 'active' : ''"  v-for="(tab, index) in searchtab" @click="switchtab(index)" :key="index" ref="tab">
         {{tab}}
       </div>
     </ul>
     <div class="slider_category" :style="'transform:translateX('+searchactivetab*tabwidth+'%)'">
     </div>
     <div ref="tcon" class="tabcontainer_category">
       <transition :name="transition" v-for="(tab, index) in searchtab" :key="index">
          <div class="tabpane_category" v-if="index === 0 && index === searchactivetab">
            <RecommendSearch>
            </RecommendSearch>
          </div>
          <div class="tabpane_category" v-if="index === 1 && index === searchactivetab">
            <BrandSearch>
            </BrandSearch>
          </div>
          <div class="tabpane_category" v-if="index === 2 && index === searchactivetab">
            <CategorySearch>
            </CategorySearch>
          </div>
       </transition>
     </div>
  </div>
</template>
<script>
import RecommendSearch from '../Search/RecommendSearch.vue';
import BrandSearch from '../Search/BrandSearch.vue';
import CategorySearch from '../Search/CategorySearch.vue';

export default{
  components:{
    RecommendSearch,
    BrandSearch,
    CategorySearch
  },
  data(){
    return{
      transition: "slide-next",
      searchactivetab: 0,
      tabwidth: 100,
      searchtab:['추천검색','브랜드관','카테고리관'],
      search_id : 0,
      initialX : null,
      initialY : null
    }
  },
  mounted(){
    document.addEventListener('touchstart', this.startTouch, false);
    document.addEventListener('touchmove', this.moveTouch, false);
  },
  beforeDestroy () {
    document.removeEventListener('touchstart', this.startTouch, false);
    document.removeEventListener('touchmove', this.moveTouch, false);
  },
  methods:{
    startTouch(e) {
      this.initialX = e.touches[0].clientX;
      this.initialY = e.touches[0].clientY;
    },
    moveTouch(e) {
      if (this.initialX === null) {
        return;
      }

      if (this.initialY === null) {
        return;
      }

      var currentX = e.touches[0].clientX;
      var currentY = e.touches[0].clientY;

      var diffX = this.initialX - currentX;
      var diffY = this.initialY - currentY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0) {
          // swiped left
          console.log("swiped left");
          if(this.searchactivetab == undefined)
          {
          }
          else if(this.searchactivetab >= 0 && this.searchactivetab < this.searchtab.length - 1)
          {
            this.switchtab(this.searchactivetab + 1);
            if(this.searchactivetab == 0){
            }
          }
          else{
          }
        } else {
          // swiped right
          if(this.searchactivetab == undefined)
          {
            this.switchtab(1);
          }
          else if(this.searchactivetab >= 1)
          {
            this.switchtab(this.searchactivetab - 1);
            if(this.searchactivetab == 0){
              //this.switchtab(0);
            }
          }
          else{
            //this.switchtab(0);
          }
          console.log("swiped right");
        }
      } else {
        // sliding vertically
        if (diffY > 0) {
          // swiped up
          console.log("swiped up");
        } else {
          // swiped down
          console.log("swiped down");
        }
      }

      this.initialX = null;
      this.initialY = null;
    },
    switchtab(n,id){
      let scroll, scond

      if(this.searchactivetab>n){
        this.transition = "slide-prev"
         scroll = n-1
      } else  if(this.searchactivetab < n){
         this.transition = "slide-next"
         scroll = n+1
      }
      scond = scroll>=0 && scroll < this.searchtab.length

       this.$nextTick(function() {
         this.searchactivetab = n;
       })
     }
  }
}
</script>
<style>
.slide-next-leave-active, .slide-next-enter-active, .slide-prev-enter-active, .slide-prev-leave-active {
}
.slide-next-enter,.slide-next-leave, .slide-prev-leave-to
{
}

.slide-next-leave-to, .slide-prev-enter, .slide-prev-leave {
}
.tabs_category{
  display:flex;
  color: black;
  width:100%;
  height:48px;
  overflow-x:scroll;
  white-space:nowrap;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  z-index: 1;
  padding:0;
  margin:0;
}
.tabs::-webkit-scrollbar  {
  width: 0 !important;
  height:0 !important;
}
.tabitem_category{
  display:flex;
  background:white;
  align-items:center;
  justify-content:center;
  width:100%;
  cursor:pointer;
  font-size:14px;

}
.tabitem_category.active{
  font-weight: 500;
  background:white;
  color: black;
}
.slider_category{
  height:2px;
  width:33%;
  background:black;
  transition:.5s ease;
}
.tabcontainer_category {
  height:480px;
  position: relative;
  min-height: 100%;
  width: 100%;
  z-index: 0;
  touch-action: pan-y !important;
}
.tabpane_category{
    position: absolute;
    width: 100%;
    align-items:center;
    justify-content:center;
}
</style>
