<template>
  <div class="card card-plain">
    <div style="padding-bottom:50px; padding-left:15px; white-space:nowrap; overflow:auto;  width:100%; display: flex;">
      <div style="display: height:210px; block; margin: 0px auto; width:90%;" v-for="item in productplan">
        <div style="width:150px; margin-right:15px;" v-ripple v-on:click="productClick(item.id)">
          <img v-lazy="item.url" class="lazy-img-fadein"  style="border-radius: 10px; width: 150px; height: 150px;" alt="..." />
          <h6 class="category_product_name" style="margin-top:10px;">
            {{item.name}}
          </h6>
          <h6 style="font-weight:700;">
            {{item.price}}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { plan } from '../../api'
export default{
  props:{
    eventId : String
  },
  data(){
    return{
        productplan : []
    }
  },
  created(){
    plan.product(this.eventId).then(data=>{
      this.productplan = data;
    }).catch(error=>{
        console.log(error);
    })
  },
  methods:{
    productClick(id){
      this.returnPath = this.$route.query.returnPath || '/detail/' + id + '/page'
      setTimeout(() => {
        this.$router.push(this.returnPath)
      }, 300)
    }
  }
}
</script>

<style>
</style>
