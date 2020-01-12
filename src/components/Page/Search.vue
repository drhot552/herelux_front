<template>
  <div class="section" style="padding: 49px 0 53px;">
    <div class="blogs-4" id="blogs-4">
      <div class="container" style="padding-left:15px; padding-right:15px;">
        <div v-if="!this.$store.state.searchFlag">
          <SearchPage>
          </SearchPage>
        </div>
        <div v-else>
          <SearchProductCard></SearchProductCard>
        </div>
      </div>
    </div>
    <loading :active.sync="this.$store.state.isLoading"
              :can-cancel="true"
              :is-full-page="true"
              :z-index="1060">
    </loading>
  </div>
</template>
<script>
import { code } from '../../api'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import SearchPage from '../Search/SearchPage.vue'
import SearchProductCard from '../Card/SearchProductCard.vue';
export default{
  components:{
    SearchProductCard,
    SearchPage
  },
  data(){
    return{
      brand_items:[],
      category_items:[],
      search:''

    }
  },
  computed: {
   filteredList() {
     return this.brand_items.filter(item => {
       return item.sub_descript.toLowerCase().includes(this.search.toLowerCase())
     })
   }
  },
  created(){
    //Brand name
    this.$store.state.searchFlag = false;
    this.$store.commit('ISLOADING', true);
    code.forum(1).then(data=>{
      if(data.length == 0){

      }
      else{
        this.brand_items = data;
      }
      this.$store.commit('ISLOADING', false);
    }).catch(error =>{
      console.log("error",error);
      //alert 후 페이지 이동
      this.errorAlert();
    });
    this.$store.commit('ISLOADING', true);
    code.forum(2).then(data=>{
      if(data.length == 0){

      }
      else{
        this.category_items = data;
      }
      this.$store.commit('ISLOADING', false);
    }).catch(error =>{
      console.log("error",error);
      //alert 후 페이지 이동
      this.errorAlert();
    });
  },
  methods:{
    detail(productId){
      this.$router.push(this.$route.query.returnPath || '/brand/' + productId);
    },
    searchClick(){
      this.$router.push(this.$route.query.returnPath || '/searchpage');
    }
  }
}
</script>
<style>
[contenteditable=true]:empty:before{
  content: attr(placeholder);
  color:#888;
  font-size: small;
  display: block; /* For Firefox */
}
.edit_div{
  line-height: 1;
  color: #181818;
  width: 100%;
  height: inherit;
  background-color: white;
}
.search_textarea{
  box-sizing: border-box;
  margin: 0;
  height: inherit;
  padding: 8px 10px 0px;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 7px;
  outline: 0;
  overflow: auto;
}
.div_style{
  width: 50%;
  margin-bottom: 20px;
  position: relative;
}
.in {
  text-align: center;
}
</style>
