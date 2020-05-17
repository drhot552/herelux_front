<template>
  <div style="padding: 70px 0 53px; background: #fff;">
    <div v-for="item in page">
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

</template>
<script>
import { plan } from '../../api'
import Images from '../Card/Images'
import PlanProductCard from '../Card/PlanProductCard';
export default{
  data(){
    return{
      page : [],
      eventproduct : []
    }
  },
  components:{
    PlanProductCard,
    Images
  },
  created(){
    plan.plan().then(data=>{
        this.page = data;
    }).catch(error=>{
        console.log(error);
    })
  }
}
</script>

<style>

</style>
