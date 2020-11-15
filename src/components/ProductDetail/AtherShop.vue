<template>
  <div>
    <div align="left" style="text-align: center; margin-left:15px; margin-right:15px; ">
      <NaverShopCard v-bind:navershopserach="this.sub_name"
                     v-bind:navershopcategory_large="this.category_large_name"
                     v-bind:navershopbrand_name="this.brand_name"
                     v-bind:navershopcategory_middle="this.category_middle_name"></NaverShopCard>
    </div>
    <div style="border-bottom: 7px solid rgba(135, 135, 135, 0.3);">

    </div>
    <div align="left" style="margin-top: 10px; margin-left:15px; margin-right:15px; text-align: center;">
      <ElevenShopCard v-bind:elevenshopserach="this.sub_name"
                     v-bind:elevenshopcategory_large="this.category_large_name"
                     v-bind:elevenshopbrand_name="this.brand_name"
                     v-bind:elevenshopcategory_middle="this.category_middle_name"></ElevenShopCard>
    </div>
  </div>
</template>
<script>
import NaverShopCard from '../Card/NaverShopCard'
import ElevenShopCard from '../Card/ElevenShopCard'
export default{
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
    NaverShopCard,
    ElevenShopCard
  }
}
</script>
<style>
</style>
