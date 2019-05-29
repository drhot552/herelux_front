<template>
  <div v-if="type==0">
    <div id='caulyDisplay'>
    </div>
  </div>
  <div v-else-if="type==1">
    <div id='caulyDisplay1'>
    </div>
  </div>
  <div v-else-if="type==2">
    <div id='caulyDisplay2'>
    </div>
  </div>
  <div v-else>
    <div id='caulyDisplay3'>
    </div>
  </div>
</template>

<script>
export default{
  name: 'cauly',
 props:{
   type: Number
 },
 mounted(){
   //adfit
   switch(this.type){
     case 0:
       let CaulyAd = new CaulyAds({
         app_code:'DlaeFvRr',
         placement:1,
         displayid:'caulyDisplay',
         passback:function(){},
         success:function(){}
       });
       break;
    case 1:
       new CaulyAds({
         app_code: 'H0VvUkF3',
         placement: 1,
         displayid: 'caulyDisplay1',
         passback: function () { },
         success: function () { }
       });
       break;
     case 2:
       new CaulyAds({
         app_code: 'H0VvUkF3',
         placement: 1,
         displayid: 'caulyDisplay2',
         passback: function () { },
         success: function () { }
       });
       break;
     case 3:
      new CaulyAds({
         app_code: 'WVhualNq',
         placement: 1,
         displayid: 'caulyDisplay3',
         passback: function () { },
         success: function () { }
       });
       break;
    }
  }
}
</script>

<style>
</style>
