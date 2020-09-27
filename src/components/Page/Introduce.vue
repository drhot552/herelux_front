<template>
  <div class="section">
    <div class="container" style="padding-left:0px; padding-right:0px;">
      <div>
        <HereluxProduct>
        </HereluxProduct>
      </div>
      <div style="padding-bottom: 15px; border-bottom: 15px solid rgba(135, 135, 135, 0.1);">
      </div>
      <div style="padding-top:20px;">
        <HomeCategory>
        </HomeCategory>
      </div>
      <div style="padding-bottom: 15px; border-bottom: 15px solid rgba(135, 135, 135, 0.1);">
      </div>
      <div style="padding-top:20px;">
        <RandomBrand>
        </RandomBrand>
      </div>
      <div style="padding-bottom: 15px; border-bottom: 15px solid rgba(135, 135, 135, 0.1);">
      </div>
      <div style="padding-top:20px;">
        <NewEvent>
        </NewEvent>
      </div>
      <div style="padding-bottom: 15px; border-bottom: 15px solid rgba(135, 135, 135, 0.1);">
      </div>
      <div style="padding-top:20px;">
        <FamousProduct>
        </FamousProduct>
      </div>
      <div style="padding-bottom: 15px; border-bottom: 15px solid rgba(135, 135, 135, 0.1);">
      </div>
      <div style="padding-top:20px;">
        <RandomProduct>
        </RandomProduct>
      </div>
    </div>
  </div>
</template>
<script>
import HereluxProduct from '../Introduce/HereluxProduct';
import HomeCategory from '../Introduce/HomeCategory';
import FamousProduct from '../Introduce/FamousProduct';
import RandomProduct from '../Introduce/RandomProduct';
import RandomBrand from '../Introduce/RandomBrand';
import NewEvent from '../Introduce/NewEvent';

export default {
  components:{
    HereluxProduct,
    HomeCategory,
    NewStyleProduct,
    RandomProduct,
    RandomBrand,
    NewBrandEvent
  }
}
</script>
<style>
.div_style_home{
  width: 33%;
  margin-bottom: 20px;
  position: relative;
}
.in {
  text-align: center;
}
</style>
