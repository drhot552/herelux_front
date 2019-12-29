<template>
  <div class="section">
    <div class="container" style="padding-left:0px; padding-right:0px; overflow:auto; height:80vh;">
      <div>
        <FamousProduct>
        </FamousProduct>
      </div>
      <div>
        <TodayBrand>
        </TodayBrand>
      </div>
      <div>
        <NewStyleProduct>
        </NewStyleProduct>
      </div>
      <div>
        <RandomProduct>
        </RandomProduct>
      </div>
    </div>
  </div>
</template>
<script>
import FamousProduct from '../Home/FamousProduct';
import NewStyleProduct from '../Home/NewStyleProduct';
import RandomProduct from '../Home/RandomProduct';
import TodayBrand from '../Home/TodayBrand';
export default {
  components:{
    FamousProduct,
    NewStyleProduct,
    RandomProduct,
    TodayBrand
  }
}
</script>
<style>
</style>
