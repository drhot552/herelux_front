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
        <NewBrandEvent>
        </NewBrandEvent>
      </div>
      <div style="padding-bottom: 15px; border-bottom: 15px solid rgba(135, 135, 135, 0.1);">
      </div>
      <div style="padding-top:20px;">
        <NewStyleProduct>
        </NewStyleProduct>
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
import HereluxProduct from '../Home/HereluxProduct';
import HomeCategory from '../Home/HomeCategory';
import NewStyleProduct from '../Home/NewStyleProduct';
import RandomProduct from '../Home/RandomProduct';
import RandomBrand from '../Home/RandomBrand';
import NewBrandEvent from '../Home/NewBrandEvent';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

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
