<template>
  <div>
    <ins class="adsbygoogle"
     style="display:inline-block;width:320px;height:50px"
     data-ad-client="ca-pub-4141026730478876"
     :data-ad-slot="this.slot"></ins>
  </div>
</template>
<script>
export default{
  props:{
    slot : String
  },
  mounted(){
    (adsbygoogle = window.adsbygoogle || []).push({});
  }
}
</script>
