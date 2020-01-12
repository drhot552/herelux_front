<template>
    <div>
      <div v-if="this.category.length > 0" class="row" style="margin-top: 20px;">
        <article class="div_style" v-for="item in category">
          <div class="in">
            <a style="color:#000000;" v-on:click="detail(item.minor_key)">
              <img v-lazy="item.url" class="lazy-img-fadein"  style="width: 130px; height: 130px;"alt="..." >
            </a>
          </div>
        </article>
      </div>
    </div>
</template>
<script>
import { search } from '../../api'
export default{
  data(){
    return{
        category:[]
    }
  },
  created(){
    search.category().then(data=>{
      this.category = data;
    }).catch(error=>{

    })
  }
}
</script>
<style>
</style>
