<template>
  <div>
    <ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4141026730478876"
     data-ad-format="auto"
     data-full-width-responsive="true"
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
