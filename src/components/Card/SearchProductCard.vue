<template>
  <div class="content">
      <div>
        <h6></h6>
           <h6 style="margin-top: 30px; margin-right:10px; text-align:right;">
             <b style="float:left; margin-left:15px;">
               총 {{this.$store.state.searchList_cnt}} 개 상품
             </b>
             <a v-on:click="popup(2)">
               <b>브랜드검색</b>
               <img src="/public/img/btn_arrow_down.png" style="height:10px; margin-right:10px;"/>
             </a>
             <a v-on:click="popup(0)">
               <img src="/public/img/sort_btn.jpg" style="height:20px;"/>
               <b style="margin-right:10px;">{{filter_data}}</b>
             </a>
             <a v-on:click="popup(1)">
               <img src="/public/img/btn_filter.png" style="height:18px;"/>
               <b>필터링</b>
             </a>
           </h6>
        <h6></h6>
      </div>
      <div class="container">
          <div v-if="this.$store.state.searchList.length > 0" class="row" style="margin-bottom: 50px; margin-top:20px;">
            <div class="div_style" v-for="item in this.$store.state.searchList">
              <div v-ripple class="in" v-on:click="detail(item.id)">
                <img class="lazy-img-fadein"  v-lazy="item.url" alt="..." >
                  <div class="lazy-img-fadein" v-lazy:background-image="item.url"></div>
                  <h6 class="product_name"> <br /> {{item.name}} </h6>
                  <h6> <b>{{item.price}}</b> </h6>
              </div>
            </div>
          </div>
          <div v-else class="container">
              <div v-if="!this.$store.state.isLoading" class="row" >
                  <div class="col-md-8 ml-auto mr-auto text-center">
                      <h4 class="title">명품상품이 없습니다.</h4>
                  </div>
              </div>
          </div>
          <div v-if="this.$store.state.searchList_readFlag" style="text-align:center; height:100px;">
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
      <!-- 부 카테고리 팝업 -->
      <modal :show.sync="modalBrandShow" headerClasses="justify-content-center">
        <h4 slot="header" class="title title-up"></h4>
        <div class="modal-view">
          <div style="text-align:center; border-bottom:1px solid hsla(0,0%,53%,.3); padding:5px;" v-for="item in brands_name">
            <a v-on:click="brandSelect(item.minor_key)">{{item.descript}}</a>
          </div>
        </div>
      </modal>
    </div>
</template>


<script>
import { code, search } from '../../api'
import Modal from '../Component/Modal';
export default{
  created(){
    this.$store.commit('SET_SEARCHPRODUCT_INIT');
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
  components:{
    Modal
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
      category_middle_descript : ''
    }
  },
  methods:{
    readMore(){
      this.searchWord = $("#search").val();
      this.$store.commit('ISLOADING', true);
      if(this.$store.state.searchType == 0){
        this.$store.dispatch('FETCH_SEARCHPRODUCTLIST_READMORE',{word:$("#search").val()});
      } else {
        this.$store.dispatch('FETCH_SEARCHCODELIST_READMORE',{wordcatch:this.$store.state.wordcatch, sex:this.sex, category:this.category_key, type:0, filter:this.filter_key, brand:this.brand_key});
        this.$store.dispatch('SEARCHLIST_CNT',{wordcatch:this.$store.state.wordcatch, category:this.category_key, brand:this.brand_key});
      }
    },
    detail(id){
      this.searchWord = $("#search").val();
      this.$store.state.productDetail_name = 'search'
      this.returnPath = this.$route.query.returnPath || '/detail/' + id + '/' + 'search'
      setTimeout(() => {
        this.$router.push(this.returnPath)
      }, 300);
    },
    onScroll(){
      if (Math.round( $(window).scrollTop()) == $(document).height() - $(window).height() && this.$store.state.searchList_readFlag) {
        this.$store.commit('ISLOADING', true);
        if(this.$store.state.searchType == 0){
          this.$store.dispatch('FETCH_SEARCHPRODUCTLIST_READMORE',{word:$("#search").val()});
        } else {
          this.$store.dispatch('FETCH_SEARCHCODELIST_READMORE',{wordcatch:this.$store.state.wordcatch, sex:this.sex, category:this.category_key, type:0, filter:this.filter_key, brand:this.brand_key});
          this.$store.dispatch('SEARCHLIST_CNT',{wordcatch:this.$store.state.wordcatch, category:this.category_key, brand:this.brand_key});
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

        for(var i =0; i< this.$store.state.wordcatch.length;  i++ ){
          if(this.$store.state.wordcatch[i].code == "category_large"){
              this.category_large_type.push((this.$store.state.wordcatch[i].minor_key * 10) +1);
          }
          else if(this.$store.state.wordcatch[i].code == "category_middle"){
              category_middle_obj.minor_key = this.$store.state.wordcatch[i].minor_key;
              category_middle_obj.descript = this.$store.state.wordcatch[i].descript;
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
        for(var i =0; i< this.$store.state.wordcatch.length;  i++ ){
          if(this.$store.state.wordcatch[i].code == "brand_name"){
              brands_name_obj.descript = this.$store.state.wordcatch[i].descript;
              brands_name_obj.minor_key = this.$store.state.wordcatch[i].minor_key;
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
    brandSelect(key){
      this.brand_key = key;
      this.$store.commit('SET_SEARCHPRODUCT_INIT');
      this.$store.dispatch('FETCH_SEARCHCODELIST_READMORE',{wordcatch:this.$store.state.wordcatch, sex:this.sex, category:this.category_key, type:0, filter:this.filter_key, brand:this.brand_key});
      this.$store.dispatch('SEARCHLIST_CNT',{wordcatch:this.$store.state.wordcatch, category:this.category_key, brand:this.brand_key});
      this.modalBrandShow = false;

    },
    filterSelect(key, descript){
      this.filter_data = descript;
      this.filter_key = key;
      this.$store.commit('SET_SEARCHPRODUCT_INIT');
      this.$store.dispatch('FETCH_SEARCHCODELIST_READMORE',{wordcatch:this.$store.state.wordcatch, sex:this.sex, category:this.category_key, type:0, filter:this.filter_key, brand:this.brand_key});
      this.$store.dispatch('SEARCHLIST_CNT',{wordcatch:this.$store.state.wordcatch, category:this.category_key, brand:this.brand_key});
      this.modalFilterShow = false;
    },
    categorySelect(key){
      // 카테고리 타입이 2이면 부카테고리로 set한다
      this.category_key = key;
      this.$store.commit('SET_SEARCHPRODUCT_INIT');
      this.$store.dispatch('FETCH_SEARCHCODELIST_READMORE',{wordcatch:this.$store.state.wordcatch, sex:this.sex, category:this.category_key, type:0, filter:this.filter_key, brand:this.brand_key});
      this.$store.dispatch('SEARCHLIST_CNT',{wordcatch:this.$store.state.wordcatch, category:this.category_key, brand:this.brand_key});
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
</style>
