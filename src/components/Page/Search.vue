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
import { code,search } from '../../api'
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
      search:'',
      word : '',
      code: []

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

    //검색에 관련된 전역변수 초기화
    //기억된 단어가 있을경우에는 word
    if(this.$store.state.searchWord != ''){
      this.word = "page-" + this.$store.state.searchWord
    } else {
      this.word = "page-";
    }
    this.$store.commit('SET_SEARCHPRODUCT_INIT');
    if(this.word == "page-"){
      this.$store.state.searchPageType = 0;
      this.$store.state.searchFlag = false;
    } else {
      search.code().then(data=>{
        this.code = data
        this.word = this.word.replace(/page-/gi,'');
        $("#search").val(this.word);
        this.$store.state.searchPageType = 2;
        this.$store.state.searchFlag = true;
        this.searchWord(this.word);
      }).catch(error=>{
        console.log(error);
      })

    }
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
    });
  },
  methods:{
    detail(productId){
      this.$router.push(this.$route.query.returnPath || '/brand/' + productId);
    },
    searchClick(){
      this.$router.push(this.$route.query.returnPath || '/searchpage');
    },
    searchWord(searchWord){
      this.$store.state.wordcatch = new Array();
      var word = searchWord;
      //단어 <- code에서 있는지 확인
      //샤넬 남성가방 <-
      word=word.replace(/ /gi, "");    // 모든 공백을 제거

      for(var i=0; i<this.code.length; i++){
          var descript = this.code[i].descript;
          descript = descript.replace(/ /gi, "");

          var re = new RegExp(descript);

          if(word.indexOf(this.code[i].descript) != -1){

            var wordObj = new Object();
            word = word.replace(re,"");
            word = word.trim();
            if(this.code[i].major_key == 1 || this.code[i].major_key == 7778){
              wordObj.code = 'brand_name';
              wordObj.minor_key = this.code[i].minor_key;
              this.$store.state.wordcatch.push(wordObj);
            } else if(this.code[i].major_key == 2){
              wordObj.code = 'category_large';
              wordObj.minor_key = this.code[i].minor_key;
              this.$store.state.wordcatch.push(wordObj);
            } else {
              wordObj.code = 'category_middle';
              wordObj.minor_key = this.code[i].minor_key;
              this.$store.state.wordcatch.push(wordObj);
            }
          }
      }
      //코드 <- 단어에서 있는지 확인
      if(word.length > 0){
        for(var j=0; j<this.code.length; j++){
          var descript = this.code[j].descript;
          descript = descript.replace(/ /gi, "");
          if(descript.indexOf(word) != -1){
            var codeObj = new Object();
            if(this.code[j].major_key == 1 || this.code[j].major_key == 7778){
              codeObj.code = 'brand_name';
              codeObj.minor_key = this.code[j].minor_key;
              this.$store.state.wordcatch.push(codeObj);
            } else if(this.code[j].major_key == 2){
              codeObj.code = 'category_large';
              codeObj.minor_key = this.code[j].minor_key;
              this.$store.state.wordcatch.push(codeObj);
            } else {
              codeObj.code = 'category_middle';
              codeObj.minor_key = this.code[j].minor_key;
              this.$store.state.wordcatch.push(codeObj);
            }
          }
        }
      }
      //두개 존재하면 검색에 포함
      //둘중 하나도 없으면
      //하나만 있으면 검색에 포함 x
      if(this.$store.state.wordcatch.length > 0){
        this.$store.state.searchType = 1;
        this.$store.state.searchFlag = true;

        this.$store.commit('SET_SEARCHPRODUCT_INIT');
        this.$store.dispatch('FETCH_SEARCHCODELIST_READMORE',{wordcatch:this.$store.state.wordcatch});
      }
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
