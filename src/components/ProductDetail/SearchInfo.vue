<template>
  <div>
    <div align="left" style="margin-left:15px; margin-right:15px; margin-bottom:20px;">
      <img src="/public/img/naver_logo.png" style="width:70px; margin-bottom: 3px;">
      <img src="/public/img/kakao_logo.jpg" style="width:80px; margin-bottom: 10px; margin-left:5px;">
      <h5 style="display:inline-block; margin-left:5px;">
        검색 정보
      </h5>
    </div>
    <div align="left" style="margin-bottom:10px; margin-left:15px; margin-right:15px; ">
      <span style="margin-right:10px;">
        #{{this.brand_name}}
      </span>
      <span style="margin-right:10px;">
        #{{this.category_large_name}}
      </span>
      <h5 style="font-size:1.1em; font-weight:550;">
        #{{this.name}}
      </h5>
    </div>
    <CafeCard v-bind:cafeSearch="this.name"></CafeCard>
    <BlogCard v-bind:blogSearch="this.name"></BlogCard>
    <KaKaoCard v-bind:kakaoSearch="this.name"></KaKaoCard>
  </div>
</template>
<script>
import BlogCard from '../Card/BlogCard'
import KaKaoCard from '../Card/KaKaoCard'
import CafeCard from '../Card/CafeCard'
export default {
  props: {
    id: Number,
    name:String,
    size:String,
    color:String,
    price: String,
    star : Number,
    count : Number,
    sub_name : String,
    reg_dttm : String,
    category_large : Number,
    category_middle : Number,
    brand : Number,
    brand_name : String,
    category_middle_name : String,
    category_large_name : String
  },
  components:{
    BlogCard,
    KaKaoCard,
    CafeCard
  }
}
</script>
<style>
</style>
