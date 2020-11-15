<template>
  <div v-bind:class="{ main_web_page: webFlag, main_app_page: !webFlag }">
    <div v-if="loading" style="width:100%; height:1024px; text-align: center;">
      <div style="display: inline-block; margin-top:150px;">
        <clip-loader :loading="loading" :color="'black'" :size="'50px'"></clip-loader>
      </div>
    </div>
    <div v-else class="container" style="padding-left:0; padding-right:0">
      <RandomEvent></RandomEvent>
      <AdsenseHome v-bind:slot="8582528687"></AdsenseHome>
      <div class="row" style="margin:0; padding-top:15px;">
        <div v-for="(item, i) in category" style="width:33.3%;">
          <div v-if= "item.minor_key <7" v-ripple v-on:click="detail(item.descript)">
            <img v-lazy="item.url" class="lazy-img-fadein" alt="..." />
            <h6 style="font-weight:700; text-align:center; margin-top:10px;">{{item.descript}}</h6>
          </div>
        </div>
      </div>
      <!-- 남 여 탭 구분 -->
      <div style="padding-top:15px;">
        <ul class="tabs_sex" ref="tabbar">
           <div class="tabitem_sex" :class="index === sexactivetab ? 'active' : ''"  v-for="(tab, index) in sexarry" @click="switchTab(index)" :key="index" ref="tab">
             {{tab}}
           </div>
         </ul>
         <div style="margin-right: auto; margin-left: auto;">
           <div class="slider_sex" :style="'transform:translateX('+sexactivetab*tabwidth+'%)'">
           </div>
         </div>

         <div ref="tcon" class="tabcontainer_sex">
           <transition :name="transition" v-for="(tab, index) in sexarry" :key="index">
              <div class="tabpane_sex" v-if="index === sexactivetab">
                <div v-if="isLoading">
                  <CategoryList v-bind:sex="index"></CategoryList>
                  <AdsenseHome v-bind:slot="2567075860"></AdsenseHome>
                  <BrandList v-bind:sex="index"></BrandList>
                </div>
              </div>
           </transition>
         </div>
      </div>
    </div>
  </div>
</template>
<script>
import { search, code } from '../../api'
import CategoryList from '../Home/CategoryList';
import { mapState, mapMutations } from 'vuex'
import BrandList from '../Home/BrandList';
import AdsenseHome from '../Component/AdsenseHome';
import RandomEvent from '../Home/RandomEvent'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default{
  data(){
    return {
      category : [],
      sexarry:['여성', '남성'],
      sexactivetab : 0,
      transition: "slide-next",
      tabwidth: 400,
      middlecategory_wallet : 0,
      middlecategory_shoes : 0,
      isLoading : true,
      loading : false
    }
  },
  computed:{
    ...mapState('hereluxAll', {
      webFlag: 'webFlag'
    })
  },
  components:{
    CategoryList,
    BrandList,
    RandomEvent,
    AdsenseHome,
    ClipLoader
  },
  created(){
    this.loading = true
    setTimeout(() => {
      search.category().then(data=>{
        this.category = data;
        this.loading = false;
      }).catch(error=>{
      })
    }, 800)
  },
  methods:{
    ...mapMutations('hereluxAll',{ appClick : 'SET_WEBFLAG' }),
    detail(searchWord){
      this.$store.commit('searchList/SET_SEARCHWORD', searchWord);
      setTimeout(() => {
        this.$router.push(this.$route.query.returnPath || '/search');
      }, 300);

    },
    switchTab(n){
      let scroll, scond

      if(this.sexactivetab >n){
        this.transition = "slide-prev"
         scroll = n-1
     }else  if(this.sexactivetab<n){
         this.transition = "slide-next"
         scroll = n+1
      }
      scond = scroll>=0 && scroll < this.sexarry.length

      this.$nextTick(function() {
        this.sexactivetab = n;
        this.isLoading = false;
        setTimeout(() => {
          this.isLoading = true;
        }, 400);
      })
    }
  }
}
</script>
<style>
.tabs_sex{
  display:flex;
  color: black;
  width:100%;
  height:45px;
  white-space:nowrap;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  z-index: 1;
  padding:0;
  margin:0;
}
.tabitem_sex{
  display:flex;
  background:white;
  align-items:center;
  justify-content:center;
  width:100%;
  cursor:pointer;
  font-size:14px;
}
.tabitem_sex.active{
  font-weight: 500;
  background:white;
  color: black;
}
.slider_sex{
  height:2px;
  width:12.5%;
  background:black;
  transition:.5s ease;
  margin-left : 18.5%;
}
.main_web_page{
  padding: 100px 0 53px;
  background: #fff;
}
.main_app_page{
  padding: 70px 0 53px;
  background: #fff;
}
</style>
