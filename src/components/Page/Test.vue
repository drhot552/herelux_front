<template>
  <div style="padding:100px;" v-on:click="test()">
    test
  </div>
</template>
<script>
export default{
  mounted(){
  },
  methods:{
    test(){
      this.$router.push(this.$route.query.returnPath || '/boarddetail/'+1 + '/board');
    }
  }

}
</script>
