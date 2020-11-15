<template>
  <div>
    <!-- 신발 -->
    <div style="padding-top:15px;" v-on:click="detail(middlecategory_shoes)">
      <div style="padding-top:25px; display:inline-block; padding-left:15px; margin-top: 0px; margin-bottom: 10px; font-weight: 700; font-size: 1.2em;">
        {{this.middlecategory_shoes}}
      </div>
      <div style="float:right; padding-top:26px; margin-bottom: 10px; display:inline-block; padding-right:15px;">
        <img src="/public/img/arrow.png" style="height:15px; width:15px;">
      </div>

    </div>
    <div style="padding-top:15px; padding-left:15px; white-space:nowrap; overflow:auto;  width:100%; display: flex;">
      <div style="display: block; height:210px; margin: 0px auto; width:90%;" v-if="middlecategory_bagProduct.length == 0">

      </div>
      <div v-else style="display: height:210px; block; margin: 0px auto; width:90%;" v-for="item in middlecategory_shoesProduct">
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
    <!-- 가방 -->
    <div style="padding-top:30px;" v-on:click="detail(middlecategory_bag)">
      <div style="padding-top:25px; display:inline-block; padding-left:15px; margin-top: 0px; margin-bottom: 10px; font-weight: 700; font-size: 1.2em;">
        {{this.middlecategory_bag}}
      </div>
      <div style="float:right; padding-top:26px; margin-bottom: 10px; display:inline-block; padding-right:15px;" v-on:click="brandClick(this.minor_key)">
        <img src="/public/img/arrow.png" style="height:15px; width:15px;">
      </div>
    </div>
    <div style="padding-top:15px; padding-left:15px; white-space:nowrap; overflow:auto;  width:100%; display: flex;">
      <div style="display: block; height:210px; margin: 0px auto; width:90%;" v-if="middlecategory_shoesProduct.length == 0">

      </div>
      <div v-else style="display: block; height:210px;  margin: 0px auto; width:90%;" v-for="item in middlecategory_bagProduct">
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
    <!-- 지갑 -->
    <div style="padding-top:30px;" v-on:click="detail(middlecategory_wallet)">
      <div style="padding-top:25px; display:inline-block; padding-left:15px; margin-top: 0px; margin-bottom: 10px; font-weight: 700; font-size: 1.2em;">
        {{this.middlecategory_wallet}}
      </div>
      <div style="float:right; padding-top:26px; margin-bottom: 10px; display:inline-block; padding-right:15px;" v-on:click="brandClick(this.minor_key)">
        <img src="/public/img/arrow.png" style="height:15px; width:15px;">
      </div>
    </div>
    <div style="padding-top:15px; padding-left:15px; white-space:nowrap; overflow:auto;  width:100%; display: flex;">
      <div style="display: block; height:210px; margin: 0px auto; width:90%;" v-if="middlecategory_walletProduct.length == 0">

      </div>
      <div v-else style="display: block; height:210px;  margin: 0px auto; width:90%;" v-for="item in middlecategory_walletProduct">
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
    <!-- 옷 -->
    <div style="padding-top:30px;" v-on:click="detail(middlecategory_cloth)">
      <div style="padding-top:25px; display:inline-block; padding-left:15px; margin-top: 0px; margin-bottom: 10px; font-weight: 700; font-size: 1.2em;">
        {{this.middlecategory_cloth}}
      </div>
      <div style="float:right; padding-top:26px; margin-bottom: 10px; display:inline-block; padding-right:15px;" v-on:click="brandClick(this.minor_key)">
        <img src="/public/img/arrow.png" style="height:15px; width:15px;">
      </div>
    </div>
    <div style="padding-top:15px; padding-left:15px; white-space:nowrap; overflow:auto;  width:100%; display: flex;">
      <div style="display: block; height:210px; margin: 0px auto; width:90%;" v-if="middlecategory_clothProduct.length == 0">

      </div>
      <div v-else style="display: block; height:210px;  margin: 0px auto; width:90%;" v-for="item in middlecategory_clothProduct">
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
import { home, code } from '../../api'
export default {
  props:{
    sex : String
  },
  data(){
    return{
      middlecategory_type : 0,
      middlecategory_shoes : '',
      middlecategory_bag : '',
      middlecategory_wallet : '',
      middlecategory_cloth : '',
      middlecategory_shoesProduct : [],
      middlecategory_bagProduct : [],
      middlecategory_walletProduct : [],
      middlecategory_clothProduct: []

    }
  },
  created(){
    code.middlecategory(this.sex, 41).then(data=>{
      this.middlecategory_type = 41
      this.middlecategory_shoes = data[0].descript;
      this.fetch(data[0].minor_key)

    });
    //여성 가방,옷
    if(this.sex == 0){
      code.middlecategory(this.sex, 21).then(data=>{
        this.middlecategory_type = 21
        this.middlecategory_bag = data[0].descript;
        this.fetch(data[0].minor_key)
      });
      code.middlecategory(this.sex, 51).then(data=>{
        this.middlecategory_type = 51
        this.middlecategory_cloth = data[0].descript;
        this.fetch(data[0].minor_key)
      });
    }
    // 남성가방, 옷
    else {
      code.middlecategory(this.sex, 31).then(data=>{
        this.middlecategory_type = 31
        this.middlecategory_bag = data[0].descript;
        this.fetch(data[0].minor_key)
      });
      code.middlecategory(this.sex, 61).then(data=>{
        this.middlecategory_type = 61
        this.middlecategory_cloth = data[0].descript;
        this.fetch(data[0].minor_key)
      });
    }
    //지값
     code.middlecategory(this.sex, 11).then(data=>{
      this.middlecategory_type = 11
      this.middlecategory_wallet = data[0].descript;
      this.fetch(data[0].minor_key)
    });
  },
  methods:{
    fetch(category){
      if(this.middlecategory_type == 11){
        home.categoryproduct(category).then(data=>{
          this.middlecategory_walletProduct = data;
        })
      } else if(this.middlecategory_type == 21 || this.middlecategory_type == 31){
        home.categoryproduct(category).then(data=>{
          this.middlecategory_bagProduct = data;
        })
      } else if (this.middlecategory_type == 51 || this.middlecategory_type == 61){
        home.categoryproduct(category).then(data=>{
          this.middlecategory_clothProduct = data;
        })
      }
      else {
        home.categoryproduct(category).then(data=>{
          this.middlecategory_shoesProduct = data;
        })
      }
    },
    productClick(id){
      this.$store.commit('hereluxAll/SET_PRODUCTDETAIL_NAME', 'home');
      this.returnPath = this.$route.query.returnPath || '/detail/' + id + '/home'
      setTimeout(() => {
        this.$router.push(this.returnPath)
      }, 200);
    },
    detail(searchWord){
      this.$store.commit('searchList/SET_SEARCHWORD', searchWord);
      setTimeout(() => {
        this.$router.push(this.$route.query.returnPath || '/search');
      }, 200);

    }
  }
}
</script>
<style>
.lazy-img-fadein[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
}
.category_product_name {
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
