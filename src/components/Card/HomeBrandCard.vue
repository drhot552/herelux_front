<template>
  <div class="content">
        <div style="padding-right:15px; padding-left:15px;">
          <div class="card card-plain">
           <div class="author" align="left" style="padding:5px;">
             <h6></h6>
                <img :src="this.$store.state.brandcategory_descript" style="height:60px; width:60px;" alt="..." class="avatar img-raised lazy-img-fadein">
                <h6 style="float: right; margin-top: 30px;">
                  <a v-on:click="popup(0)">
                    <img src="/public/img/sort_btn.jpg" style="height:20px;"/>
                    <b style="margin-right:15px;">{{filter_data}}</b>
                  </a>
                  <a v-on:click="popup(1)">
                    <img src="/public/img/btn_filter.png" style="height:18px;"/>
                    <b>필터링</b>
                  </a>
                </h6>
             <h6></h6>
           </div>
         </div>
          <div class="row" style="margin-bottom: 50px;">
            <div class="div_style" v-for="item in this.$store.state.brandcategoryproduct">
              <div v-ripple class="in" v-on:click="detail(item.id)">
                <img class="lazy-img-fadein"  v-lazy="item.url" alt="..." >
                  <div class="lazy-img-fadein" v-lazy:background-image="item.url"></div>
                  <h6 class="product_name"> <br /> {{item.name}} </h6>
                  <h6> <b>{{item.price}}</b> </h6>
              </div>
            </div>
          </div>
          <div v-if="this.$store.state.brandcategory_readFlag" style="text-align:center; height:100px;">
            <a style="color:#000000;" v-on:click="readMore()">
              <img src="/public/img/btn_arrow_down.png" style="height:20px;margin-top: 10px;"/>
            </a>
          </div>
      </div>
      <modal :show.sync="modalFilterShow" headerClasses="justify-content-center">
        <h4 slot="header" class="title title-up"></h4>
        <div class="modal-view">
          <div style="text-align:center; border-bottom:1px solid hsla(0,0%,53%,.3); padding:5px;" v-for="item in filter">
            <a v-on:click="filterSelect(item.minor_key, item.descript)">{{item.descript}}</a>
          </div>
        </div>
      </modal>
      <!-- 부 카테고리 팝업 -->
      <modal :show.sync="modalShow" headerClasses="justify-content-center">
        <h4 slot="header" class="title title-up"></h4>
        <div class="modal-view">
          <div style="text-align:center; border-bottom:1px solid hsla(0,0%,53%,.3); padding:5px;" v-for="item in category_middle">
            <a v-on:click="categorySelect(item.minor_key)">{{item.descript}}</a>
          </div>
        </div>
      </modal>
  </div>
</template>
<script>
import Modal from '../Component/Modal';
import { code } from '../../api'
export default{
  props:{
    sex:String
  },
  data(){
    return{
      modalShow : false,
      modalFilterShow : false,
      category_middle : [],
      category_key : 0,
      filter : [],
      filter_key : 0,
      filter_data : "최신순"
    }
  },
  components:{
    Modal
  },
  methods:{
    brandClick(){

    },
    deatil(){

    },
    readMore(){
      this.$store.dispatch('FETCH_BRANDCATEGORYLIST_READMORE',{brand:this.$store.state.brandcateogry_brand, category:this.$store.state.brandcategory_category, category_type:this.$store.state.brandcateogry_category_type, sex:this.sex, filter:this.filter_key});
    },
    popup(flag){
      //여자
      if(flag == 0){
        code.filter(8000).then(data=>{
          this.filter = data;
          this.modalFilterShow = true;
        })
      } else {
        code.brandsex(this.$store.state.brandcategory_category, this.sex).then(data=>{
          this.category_middle = data;
          this.modalShow = true;
        })
      }

    },
    filterSelect(key, descript){
      this.filter_data = descript
      this.filter_key = key;
      this.$store.state.brandcategory_filter = key;
      this.$store.commit('SET_BRANDCATEGORYPRODUCT_INIT');
      this.$store.dispatch('FETCH_BRANDCATEGORYLIST_READMORE',{brand:this.$store.state.brandcateogry_brand, category:this.$store.state.brandcategory_category, category_type:this.$store.state.brandcateogry_category_type, sex:this.sex, filter:this.filter_key});
      this.modalFilterShow = false;
    },
    categorySelect(key){
      // 카테고리 타입이 2이면 부카테고리로 set한다
      this.category_key = key;
      this.$store.state.brandcateogry_category_type = 1
      this.$store.commit('SET_BRANDCATEGORYPRODUCT_INIT');
      this.$store.dispatch('FETCH_BRANDCATEGORYLIST_READMORE',{brand:this.$store.state.brandcateogry_brand, category:key, category_type:this.$store.state.brandcateogry_category_type, sex:this.sex, filter:this.filter_key});
      this.modalShow = false;
    },
    detail(id){
      this.$store.state.productDetail_name = 'home'
      this.returnPath = this.$route.query.returnPath || '/detail/' + id + '/home'
      setTimeout(() => {
        this.$router.push(this.returnPath)
      }, 300);
    }
  }

}
</script>
<style>
.div_style{
  width: 50%;
  margin-bottom: 20px;
}
.in {
  width: 100%;
  text-align: center;
}
.lazy-img-fadein[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
}
.product_name {
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.modal-view{
  width: 100%;
  height: 200px;
  overflow-y: scroll;
}
</style>
