<template>
    <div>

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
