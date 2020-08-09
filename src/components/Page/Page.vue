<template>
  <div style="padding: 70px 0 53px; background: #fff;">
    <div v-if="loading" style="width:100%; height:1024px; text-align: center;">
      <div style="display: inline-block; margin-top:150px;">
        <clip-loader :loading="loading" :color="'black'" :size="'50px'"></clip-loader>
      </div>
    </div>
    <div v-else v-for="item in page">
      <div>
        <images v-if="item.content_type === 0"
                v-bind:type="`event`"
                v-bind:title="item.title"
                v-bind:subject="item.subject"
                v-bind:subtitle="item.subtitle"
                v-bind:img_url="item.img_url"
                v-bind:direct_url="item.direct_url">
        </images>
        <PlanProductCard v-bind:eventId="item.event_id"></PlanProductCard>
      </div>
    </div>
  </div>

</template>
<script>
import { plan } from '../../api'
import Images from '../Card/Images'
import PlanProductCard from '../Card/PlanProductCard'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default{
  data(){
    return{
      page : [],
      eventproduct : [],
      loading : false
    }
  },
  components:{
    PlanProductCard,
    Images,
    ClipLoader
  },
  created(){
    this.loading = true
    setTimeout(() => {
      plan.plan().then(data=>{
          this.page = data;
          this.loading=false
      }).catch(error=>{
          console.log(error);
      })
    }, 800)
  }
}
</script>

<style>

</style>
