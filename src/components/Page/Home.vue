<template>
  <div class="section">
    <div class="container" style="padding-left:0; padding-right:0">
      <div style="padding-left:10px; white-space:nowrap; overflow:auto;  width:100%; display: flex;">
        <div style="display: block; margin: 0px auto; width:90%;" v-for="item in category">
          <div v-if= "item.minor_key <5 " style="width:80px; margin-right:10px;" v-ripple v-on:click="detail(item.descript)">
            <img v-lazy="item.url" class="lazy-img-fadein"  style="border-radius: 10px; width: 80px; height: 80px;" alt="..." />
            <h6 style="font-weight:700; text-align:center; margin-top:10px;">{{item.descript}}</h6>
          </div>
        </div>
      </div>
      <div style="padding-left:5px; white-space:nowrap; overflow:auto;  width:100%; display: flex;">
        <div style="display: block; margin: 0px auto; width:90%;" v-for="item in test">
          <div v-if= "item.minor_key <5 " style="width:150px; margin-right:10px;" v-ripple v-on:click="detail(item.descript)">
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
                  <RandomEvent></RandomEvent>
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
import BrandList from '../Home/BrandList';
import AdsenseHome from '../Component/AdsenseHome';
import RandomEvent from '../Home/RandomEvent'
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
      isLoading : true
    }
  },
  components:{
    CategoryList,
    BrandList,
    RandomEvent,
    AdsenseHome
  },
  created(){
    search.category().then(data=>{
      this.category = data;
    }).catch(error=>{

    })

  },
  mounted(){
   this.$refs.tabbar.style.setProperty('--tabwidth', this.tabwidth+'px')
  },
  methods:{
    detail(searchWord){
      this.$store.state.searchWord = searchWord;
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
</style>
