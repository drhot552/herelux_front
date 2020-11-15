<template>
  <div>
    <div style="padding-left:15px; white-space:nowrap; overflow:auto;  width:100%; display: flex;">
      <div style="display: height:210px; block; margin: 0px auto; width:90%;" v-for="item in brandcard">
        <div style="width:70px; margin-right:15px;">
          <div class="card card-plain">
           <div class="author" align="left" style="padding:5px;">
             <img v-on:click="brand(item.minor_key, item.sub_descript)" v-lazy="`/public/img/brand/${item.sub_descript}.png`" style="height:60px; width:60px;" alt="..." class="avatar img-raised lazy-img-fadein">
           </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ul class="tabs_brandcategory" ref="tabbar">
         <div class="tabitem_brandcategory" :class="index === categoryactivetab ? 'active' : ''"  v-for="(tab, index) in categorylist" @click="switchTab(index)" :key="index" ref="tab">
           {{tab}}
         </div>

       </ul>
       <div style="margin-right: auto; margin-left: auto;">
         <div class="slider_brandcategory" :style="'transform:translateX('+categoryactivetab*tabwidth+'%)'">
         </div>
       </div>

       <div ref="tcon" class="tabcontainer_brandcategory">
         <transition :name="transition" v-for="(tab, index) in categorylist" :key="index">
            <div class="tabpane_brandcategory" v-if="index === categoryactivetab">
              <HomeBrandCard v-bind:sex="sex"></HomeBrandCard>
            </div>
         </transition>
       </div>
    </div>
  </div>
</template>

<script>
import { code, home, search } from '../../api'
import { mapState } from 'vuex'
import HomeBrandCard from '../Card/HomeBrandCard'
export default {
    props:{
      sex : String
    },
    data(){
      return{
          brandcard : [],
          brandproduct : [],
          sub_descript : '',
          minor_key : 0,
          transition: "slide-next",
          tabwidth: 250,
          categorylist : ['전체','지갑','가방','신발','의류'],
          categoryactivetab : 0
      }
    },
    computed:{
      ...mapState('brandList', {
        brandcategory_readFlag: 'brandcategory_readFlag',
        brandcategory_category: 'brandcategory_category',
        brandcateogry_category_type: 'brandcateogry_category_type',
        brandcategory_filter:'brandcategory_filter'
      })
    },
    components:{
      HomeBrandCard
    },
    mounted(){
     this.$refs.tabbar.style.setProperty('--tabwidth', this.tabwidth+'px')
     document.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy(){
      document.removeEventListener('scroll', this.onScroll);
    },
    activated(){
      document.addEventListener('scroll', this.onScroll);
    },
    deactivated(){
      document.removeEventListener('scroll', this.onScroll);
    },
    created(){
        code.homebrand(1).then(data=>{
          if(data.length > 0){
            this.brandcard = data;
            this.brand(this.brandcard[0].minor_key, this.brandcard[0].sub_descript);
          }
        })
    },
    methods:{
      brand(brand, sub_descript){
        this.brandproduct = []
        this.$store.commit('brandList/SET_BRNADCATEGORY_BRAND', {brandcategory_descript:`/public/img/brand/` + sub_descript + `.png`, brandcateogry_brand:brand});
        this.minor_key = brand
        this.brandcategoryfetch()

      },
      productClick(id){
        this.$store.commit('brandList/SET_BRNADCATEGORY_PRODUCTNAME', 'home');
        this.returnPath = this.$route.query.returnPath || '/detail/' + id + '/home'
        setTimeout(() => {
          this.$router.push(this.returnPath)
        }, 300);

      },
      brandClick(id){
        this.returnPath = this.$route.query.returnPath || '/brand/' + id
        setTimeout(() => {
          this.$router.push(this.returnPath)
        }, 300);
      },
      switchTab(n){
        let scroll, scond

        if(this.categoryactivetab >n){
          this.transition = "slide-prev"
           scroll = n-1
       }else  if(this.categoryactivetab<n){
           this.transition = "slide-next"
           scroll = n+1
        }
        scond = scroll>=0 && scroll < this.categorylist.length

        this.$nextTick(function() {
          this.categoryactivetab = n;
          this.brandcategoryfetch();
        })
      },
      brandcategoryfetch(){
        this.$store.commit('brandList/SET_BRNADCATEGORY_CATEGORYTYPE', 0);
        this.$store.commit('brandList/SET_BRANDCATEGORYPRODUCT_INIT');

        //전체
        if(this.categoryactivetab == 0){
          this.$store.dispatch('brandList/FETCH_BRANDCATEGORYLIST_READMORE',{brand:this.minor_key, category:50, category_type:0, sex:this.sex, filter:0});
          this.$store.commit('brandList/SET_BRNADCATEGORY_CATEGORY', 50);
        }
        //가방
        else if(this.categoryactivetab == 2){
          if(this.sex == 0){
            this.$store.dispatch('brandList/FETCH_BRANDCATEGORYLIST_READMORE',{brand:this.minor_key, category:21, category_type:0, sex:this.sex, filter:0});
            this.$store.commit('brandList/SET_BRNADCATEGORY_CATEGORY', 21);
          } else {
            this.$store.dispatch('brandList/FETCH_BRANDCATEGORYLIST_READMORE',{brand:this.minor_key, category:31, category_type:0, sex:this.sex, filter:0});
            this.$store.commit('brandList/SET_BRNADCATEGORY_CATEGORY', 31);
          }
        }
        //신발
        else if(this.categoryactivetab == 3){
          this.$store.dispatch('brandList/FETCH_BRANDCATEGORYLIST_READMORE',{brand:this.minor_key, category:41, category_type:0, sex:this.sex, filter:0});
          this.$store.commit('brandList/SET_BRNADCATEGORY_CATEGORY', 41);
        }
        //지갑
        else if (this.categoryactivetab == 4){
          if(this.sex == 0){
            this.$store.dispatch('brandList/FETCH_BRANDCATEGORYLIST_READMORE',{brand:this.minor_key, category:51, category_type:0, sex:this.sex, filter:0});
            this.$store.commit('brandList/SET_BRNADCATEGORY_CATEGORY', 51);
          } else {
            this.$store.dispatch('brandList/FETCH_BRANDCATEGORYLIST_READMORE',{brand:this.minor_key, category:61, category_type:0, sex:this.sex, filter:0});
            this.$store.commit('brandList/SET_BRNADCATEGORY_CATEGORY', 61);
          }
        }
        else {
          this.$store.dispatch('brandList/FETCH_BRANDCATEGORYLIST_READMORE',{brand:this.minor_key, category:11, category_type:0, sex:this.sex, filter:0});
          this.$store.commit('brandList/SET_BRNADCATEGORY_CATEGORY', 11);
        }
      },
      onScroll(){
        if (Math.round( $(window).scrollTop()) >= $(document).height() - $(window).height() && this.brandcategory_readFlag) {
          this.$store.dispatch('brandList/FETCH_BRANDCATEGORYLIST_READMORE',{brand:this.minor_key, category:this.brandcategory_category, category_type:this.brandcateogry_category_type, sex:this.sex, filter:this.brandcategory_filter});
        }
      }
    }
}
</script>
<style>
.tabs_brandcategory{
  display: flex;
    width: 100%;
    height: 35px;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    z-index: 1;
    padding: 0;
    margin: 0;
}
.tabitem_brandcategory{
  display:flex;
  background:white;
  align-items:center;
  justify-content:center;
  width:100%;
  cursor:pointer;
  font-size:14px;
}
.tabpane_brandcategory{
    width: 100%;
    align-items:center;
    justify-content:center;
    height: 95vh;
}
.tabitem_brandcategory.active{
  font-weight: 500;
  background:white;
  color: black;
}
.slider_brandcategory{
  height:2px;
  width:8%;
  background:black;
  transition:.5s ease;
  margin-left : 6.5%;
}
</style>
