<template>
  <div>
    <div style="padding-left: 50px; padding-right: 50px; text-align: center;">
      <h4 style="margin-top: 0px; margin-bottom: 10px; font-weight: 700; font-size: 1.8em;">
        현재 HERELUX에서 <br />가장 인기있는 스타일!
      </h4>
      <div v-on:click="pageMove('/ranking')" style="color:black; font-weight:700;">
        전체 랭킹 보러가기 >
      </div>
    </div>
    <div style="margin-top:20px;">
    </div>
    <div>
      <ul class="tabs_category" ref="tabbar">
         <div class="tabitem_category" :class="index === categoryactivetab ? 'active' : ''"  v-for="(tab, index) in category" @click="switchtab(index, tab.minor_key)" :key="index" ref="tab">
           {{tab.descript}}
         </div>

       </ul>
       <div class="slider_category" :style="'transform:translateX('+categoryactivetab*tabwidth+'%)'">
       </div>
       <div ref="tcon" class="tabcontainer_category">
         <transition :name="transition" v-for="(tab, index) in category" :key="index">
            <div class="tabpane_category" v-if="index === categoryactivetab">
              <CategoryCard>
              </CategoryCard>
            </div>
         </transition>
       </div>
    </div>
  </div>

</template>
<script>
import { home } from '../../api'
import CategoryCard from '../Card/CategoryCard'

export default {
  components:{
    CategoryCard
  },
  data() {
    return {
      transition: "slide-next",
      categoryactivetab: 0,
      tabwidth: 100,
      category:[],
      category_id : 0
    }
  },
  mounted(){
   this.$refs.tabbar.style.setProperty('--tabwidth', this.tabwidth+'px')
  },
  created(){
    home.category().then(data=>{
      this.category = data;
      //첫번째 카태고리 set
      this.category_id = data[0].minor_key;
      this.fetch();
    }).catch(error=>{

    })
  },
  methods:{
    switchtab(n,id){
       let scroll, scond

       if(this.categoryactivetab >n){
         this.transition = "slide-prev"
          scroll = n-1
      }else  if(this.categoryactivetab<n){
          this.transition = "slide-next"
          scroll = n+1
       }
       scond = scroll>=0 && scroll < this.category.length

       this.$nextTick(function() {
         this.categoryactivetab = n;
         this.category_id = id;
         this.fetch();
       })
     },
     fetch(){
       this.$store.commit('SET_CATEGORYPRODUCT_INIT');
       home.categoryfetch(this.category_id).then(data=>{
         this.$store.state.categoryProduct = data;
       }).catch(error=>{

       })
     },
     pageMove(page){
       this.returnPath = this.$route.query.returnPath || page
       this.$router.push(this.returnPath)
     }
  }
}
</script>
<style>
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
  height:95vh;
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
