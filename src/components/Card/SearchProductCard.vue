<template>
  <div class="content">
    <div v-if="!isLoadingSearch" style="width:100%; height:1024px; text-align: center;">
      <div style="display: inline-block; margin-top:150px;">
        <clip-loader :loading="!isLoadingSearch" :color="'black'" :size="'50px'"></clip-loader>
      </div>
    </div>
    <div v-else>
      <div>
        <h6></h6>
           <h6 style="margin-top: 30px; margin-right:10px; text-align:right;">
             <b style="float:left; margin-left:15px;">
               총 {{searchList_cnt}} 개 상품
             </b>
             <a v-on:click="popup(2)">
               <b>{{brand_name_descript}}</b>
               <img src="/public/img/btn_arrow_down.png" style="height:10px; margin-right:10px;"/>
             </a>
             <a v-on:click="popup(0)">
               <img src="/public/img/sort_btn.jpg" style="height:20px;"/>
               <b style="margin-right:10px;">{{filter_data}}</b>
             </a>
             <a v-on:click="popup(1)">
               <img src="/public/img/btn_filter.png" style="height:18px;"/>
               <b>{{category_middle_descript}}</b>
             </a>
           </h6>
        <h6></h6>
      </div>
      <div class="container">
          <div v-if="searchList.length > 0" class="row" style="margin-bottom: 50px; margin-top:20px;">
            <div class="div_style" v-for="item in searchList">
              <div v-ripple class="in" v-on:click="detail(item.id)">
                <img class="lazy-img-fadein"  v-lazy="item.url" alt="..." >
                  <div class="lazy-img-fadein" v-lazy:background-image="item.url"></div>
                  <h6 class="product_name"> <br /> {{item.name}} </h6>
                  <h6> <b>{{item.price}}</b> </h6>
              </div>
            </div>
          </div>
          <div v-else class="container">
              <div class="row" >
                  <div class="col-md-8 ml-auto mr-auto text-center">
                      <h4 class="title">명품상품이 없습니다.</h4>
                  </div>
              </div>
          </div>
          <div v-if="searchList_readFlag" style="text-align:center; height:100px;">
            <a style="color:#000000;" v-on:click="readMore()">
              <img src="/public/img/btn_arrow_down.png" style="height:20px;margin-top: 10px;"/>
            </a>
          </div>
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
        <div class="searchmodal_btn">
          <img src="/public/img/btn_search.png" style="height:20px;">
          </img>
        </div>
        <input class="searchmodal_textarea"  contenteditable="true" v-model="categorysearch" id="categorysearch" ref="categorysearch" placeholder="검색어를 입력하세요."
                  style="max-height: 58px; height: 38px; float:left; z-index:100;">

        </input>
        <div class="modal-view">
          <div style="text-align:center; border-bottom:1px solid hsla(0,0%,53%,.3); padding:5px;" v-for="item in filteredList">
            <a v-on:click="categorySelect(item.minor_key, item.descript)">{{item.descript}}</a>
          </div>
        </div>
      </modal>
      <!-- 부 카테고리 팝업 -->
      <modal :show.sync="modalBrandShow" headerClasses="justify-content-center">
        <div class="searchmodal_btn">
          <img src="/public/img/btn_search.png" style="height:20px;">
          </img>
        </div>
        <input class="searchmodal_textarea"  contenteditable="true" v-model="brandsearch" id="brandsearch" ref="brandsearch" placeholder="검색어를 입력하세요."
                  style="max-height: 58px; height: 38px; float:left; z-index:100;">

        </input>
        <div class="modal-view">
          <div style="text-align:center; border-bottom:1px solid hsla(0,0%,53%,.3); padding:5px;" v-for="item in brandfilteredList">
            <a v-on:click="brandSelect(item.minor_key, item.descript)">{{item.descript}}</a>
          </div>
        </div>
      </modal>
    </div>
</template>


<script>
import { code, search } from '../../api'
import Modal from '../Component/Modal';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import { mapState } from 'vuex'
export default{
  created(){
    this.$store.commit('searchList/SET_SEARCHPRODUCT_INIT');
    this.$nextTick(() => this.$refs.categorysearch.focus())
  },
  mounted(){
    document.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy(){
    document.removeEventListener('scroll', this.onScroll);
  },
  activated(){
    document.addEventListener('scroll', this.onScroll);
  },
  deactivated(){
    document.removeEventListener('scroll', this.onScroll);
  },
  computed: {
    ...mapState('searchList',  {
      isLoadingSearch : 'isLoadingSearch',
      searchList : 'searchList',
      searchList_cnt : 'searchList_cnt',
      wordcatch : 'wordcatch',
      searchType : 'searchType',
      searchWord : 'searchWord',
      searchList_readFlag : 'searchList_readFlag'
    }),
    filteredList() {
      return this.category_middle.filter(post => {
        return post.descript.toLowerCase().includes(this.categorysearch.toLowerCase())
      })
    },
    brandfilteredList() {
      return this.brands_name.filter(post => {
        return post.descript.toLowerCase().includes(this.brandsearch.toLowerCase())
      })
    }
  },
  components:{
    Modal,
    ClipLoader
  },
  data(){
    return{
      returnPath : '',
      brandId : 0,
      searchWord : '',
      filter : [],
      category_middle : [],
      filter_data : "최신순",
      filter_key : 0,
      category_key : 0,
      brand_key : 0,
      modalFilterShow : false,
      modalShow :  false,
      modalBrandShow : false,
      sex : 0,
      category_large_type : [],
      category_middle_type : [],
      brands_name : [],
      category_middle_descript : '필터링',
      brand_name_descript : '브랜드검색',
      categorysearch : '',
      brandsearch:''
    }
  },
  methods:{
    readMore(){
      this.searchWord = $("#searchword").val();
      if(this.searchType == 0){
        this.$store.dispatch('searchList/FETCH_SEARCHPRODUCTLIST_READMORE',{word:this.searchWord});
      } else {
        this.$store.dispatch('searchList/FETCH_SEARCHCODELIST_READMORE',{wordcatch:this.wordcatch, sex:this.sex, category:this.category_key, type:0, filter:this.filter_key, brand:this.brand_key});
        this.$store.dispatch('searchList/SEARCHLIST_CNT',{wordcatch:this.wordcatch, category:this.category_key, brand:this.brand_key});
      }
    },
    detail(id){
      this.searchWord = $("#searchword").val();
      this.$store.commit('hereluxAll/SET_PRODUCTDETAIL_NAME', 'search');
      this.returnPath = this.$route.query.returnPath || '/detail/' + id + '/' + 'search'
      setTimeout(() => {
        this.$router.push(this.returnPath)
      }, 300);
    },
    onScroll(){
      if (Math.round( $(window).scrollTop()) == $(document).height() - $(window).height() && this.searchList_readFlag) {
        if(this.searchType == 0){
          this.$store.dispatch('searchList/FETCH_SEARCHPRODUCTLIST_READMORE',{word:this.searchWord});
        } else {
          this.$store.dispatch('searchList/FETCH_SEARCHCODELIST_READMORE',{wordcatch:this.wordcatch, sex:this.sex, category:this.category_key, type:0, filter:this.filter_key, brand:this.brand_key});
          this.$store.dispatch('searchList/SEARCHLIST_CNT',{wordcatch:this.wordcatch, category:this.category_key, brand:this.brand_key});
        }
      }
    },
    popup(flag){
      //여자
      if(flag == 0){
        code.filter(8000).then(data=>{
          this.filter = data;
          this.modalFilterShow = true;
        })
      } else if(flag == 1){
        //중카테고리 set
        if(this.searchWord.indexOf("여자") != -1){
          this.sex = 0;
        }
        else if(this.searchWord.indexOf("여성") != -1){
          this.sex = 0;
        }
        else if(this.searchWord.indexOf("남자") != -1){
          this.sex = 1;
        }
        else if(this.searchWord.indexOf("남성") != -1){
          this.sex = 1;
        }
        else {
          this.sex = 99;
        }
        //카테고리 타입 관련
        var category_middle_obj = new Object();
        this.category_middle_type = [];
        this.category_middle = [];
        this.category_large_type = [];

        for(var i =0; i< this.wordcatch.length;  i++ ){
          if(this.wordcatch[i].code == "category_large"){
              this.category_large_type.push((this.wordcatch[i].minor_key * 10) +1);
          }
          else if(this.wordcatch[i].code == "category_middle"){
              category_middle_obj.minor_key = this.wordcatch[i].minor_key;
              category_middle_obj.descript = this.wordcatch[i].descript;
              this.category_middle_type.push(category_middle_obj);
          }
          else{
            //브랜드만 있는경우
          }
        }
        //므랜드만 검색한 경우
        if(this.category_large_type.length == 0 && this.category_middle_type.length == 0){
          this.category_large_type = [11,21,31,41,51,61,71,81];
        }
        var searchObj = new Object();

        if(this.category_large_type == 0){
          this.category_middle = this.category_middle_type;
          this.modalShow = true;

        } else {
          code.searchcode(this.category_large_type, this.sex).then(data=>{
            this.category_middle = data;
            this.modalShow = true;
          })
        }
      }
      //flag == 2
      else {
        //브랜드가 있으면
        var brands_name_obj = new Object();
        this.brands_name = [];
        for(var i =0; i< this.wordcatch.length;  i++ ){
          if(this.wordcatch[i].code == "brand_name"){
              brands_name_obj.descript = this.wordcatch[i].descript;
              brands_name_obj.minor_key = this.wordcatch[i].minor_key;
              this.brands_name.push(brands_name_obj);
          }
        }
        if(this.brands_name.length == 0){
          code.searchbrands().then(data=>{
            this.brands_name = data;
            this.modalBrandShow = true;
          })
        } else {
          this.modalBrandShow = true;
        }
      }
    },
    brandSelect(key,descript){
      this.brand_key = key;
      this.brand_name_descript = descript;
      this.$store.commit('searchList/SET_SEARCHPRODUCT_INIT');
      this.$store.dispatch('searchList/FETCH_SEARCHCODELIST_READMORE',{wordcatch:this.wordcatch, sex:this.sex, category:this.category_key, type:0, filter:this.filter_key, brand:this.brand_key});
      this.$store.dispatch('searchList/SEARCHLIST_CNT',{wordcatch:this.wordcatch, category:this.category_key, brand:this.brand_key});
      this.modalBrandShow = false;

    },
    filterSelect(key, descript){
      this.filter_data = descript;
      this.filter_key = key;
      this.$store.commit('searchList/SET_SEARCHPRODUCT_INIT');
      this.$store.dispatch('searchList/FETCH_SEARCHCODELIST_READMORE',{wordcatch:this.wordcatch, sex:this.sex, category:this.category_key, type:0, filter:this.filter_key, brand:this.brand_key});
      this.$store.dispatch('searchList/SEARCHLIST_CNT',{wordcatch:this.wordcatch, category:this.category_key, brand:this.brand_key});
      this.modalFilterShow = false;
    },
    categorySelect(key,descript){
      // 카테고리 타입이 2이면 부카테고리로 set한다
      this.category_key = key;
      this.category_middle_descript = descript;
      this.$store.commit('searchList/SET_SEARCHPRODUCT_INIT');
      this.$store.dispatch('searchList/FETCH_SEARCHCODELIST_READMORE',{wordcatch:this.wordcatch, sex:this.sex, category:this.category_key, type:0, filter:this.filter_key, brand:this.brand_key});
      this.$store.dispatch('searchList/SEARCHLIST_CNT',{wordcatch:this.wordcatch, category:this.category_key, brand:this.brand_key});
      this.modalShow = false;
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
.searchmodal_textarea{
  margin: 0;
  height: inherit;
  outline: 0;
  padding-left: 8px;
  margin-left:40px;
  width: 75%;
  border:none;
  border-radius: 10px;
}
.searchmodal_btn{
  position: absolute;
  z-index: 1032;
  margin: 5px;
  height: 34px;
  margin-right: 15px;
}
</style>
