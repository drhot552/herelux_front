<template>
  <div>
    <div v-if="loading" style="width:100%; height:1024px; text-align: center;">
      <div style="display: inline-block; margin-top:150px;">
        <clip-loader :loading="loading" :color="'black'" :size="'50px'"></clip-loader>
      </div>
    </div>
    <div v-else>
      <div class="lstbx" style="height:300px;">
        <strong class="tit">추천검색어</strong>
        <ul class="srch_lst">
          <li v-ripple v-on:click="search(item.recommend)" class="search_result" style="border-bottom: 1px solid #eee;" v-for="(item,i) in recommend_left">
            <span style="color:red;font-weight: 450;font-size: 13px;">{{i + 1 }} . </span>
            {{item.recommend}}
          </li>
        </ul>
        <ul class="srch_lst">
          <li  v-ripple v-on:click="search(item.recommend)" class="search_result" style="border-bottom: 1px solid #eee; border-left: 1px solid #eee;" v-for="(item,i) in recommend_right">
            <span style="color:red;font-weight: 450;font-size: 13px;">{{i + 6 }} . </span>
            {{item.recommend}}
          </li>
        </ul>
      </div>
      <div class="lstbx" style="height:300px;">
        <strong class="tit">추천명품</strong>
        <ul class="srch_lst">
          <li v-ripple v-on:click="search(item.descript)" class="search_result" style="border-bottom: 1px solid #eee;" v-for="(item,i) in brandrecommend_left">
            <span style="color:red;font-weight: 450;font-size: 13px;">{{i + 1 }} . </span>
            {{item.descript}}
          </li>
        </ul>
        <ul class="srch_lst">
          <li  v-ripple v-on:click="search(item.descript)" class="search_result" style="border-bottom: 1px solid #eee; border-left: 1px solid #eee;" v-for="(item,i) in brandrecommend_right">
            <span style="color:red;font-weight: 450;font-size: 13px;">{{i + 6 }} . </span>
            {{item.descript}}
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
import { search } from '../../api'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
export default{
  components:{
    ClipLoader
  },
  data(){
    return{
        recommend : [],
        brandrecommend : [],
        brandrecommend_left : [],
        brandrecommend_right : [],
        recommend_left : [],
        recommend_right : [],
        code : [],
        loading: false
    }
  },
  activated(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 500)
  },
  created(){
    this.loading = true;
    setTimeout(() => {
      search.recommend().then(data=>{
        this.recommend = data;
        //2개로 나눠서 저장
        for(var i = 0; i < this.recommend.length; i++){
          if(i > 4){
            this.recommend_right.push(this.recommend[i]);
          } else {
            this.recommend_left.push(this.recommend[i]);
          }
        }
        this.loading = false;
      }).catch(error=>{
        console.log(error);
      })
      search.randombrands().then(data=>{
        this.brandrecommend = data;
        for(var i = 0; i < this.brandrecommend.length; i++){
          if(i > 4){
            this.brandrecommend_right.push(this.brandrecommend[i]);
          } else {
            this.brandrecommend_left.push(this.brandrecommend[i]);
          }
        }
      })
      search.code().then(data=>{
        this.code = data
      }).catch(error=>{
        console.log(error);
      })
    }, 500)

  },
  methods:{
    search(searchWord){
      this.$store.state.wordcatch = new Array();
      var word = searchWord;
      this.$store.state.searchWord = word
      $("#search").val(searchWord);
      //단어 <- code에서 있는지 확인
      //샤넬 남성가방 <-
      this.$store.state.isLoadingSearch=false;
      setTimeout(() => {
        this.$store.state.isLoadingSearch = true;
      }, 700)

      for(var i=0; i<this.code.length; i++){
          var re = new RegExp(this.code[i].descript);
          if(word.indexOf(this.code[i].descript) != -1){

            var wordObj = new Object();
            word = word.replace(re,"");
            word = word.trim();
            if(this.code[i].major_key == 1 || this.code[i].major_key == 7778){
              wordObj.code = 'brand_name';
              wordObj.minor_key = this.code[i].minor_key;
              wordObj.descript = this.code[i].descript;
              this.$store.state.wordcatch.push(wordObj);
            } else if(this.code[i].major_key == 2){
              wordObj.code = 'category_large';
              wordObj.minor_key = this.code[i].minor_key;
              wordObj.descript = this.code[i].descript;
              this.$store.state.wordcatch.push(wordObj);
            } else {
              wordObj.code = 'category_middle';
              wordObj.minor_key = this.code[i].minor_key;
              wordObj.descript = this.code[i].descript;
              this.$store.state.wordcatch.push(wordObj);
            }
          }
      }
      //코드 <- 단어에서 있는지 확인
      if(word.length > 0){
        for(var j=0; j<this.code.length; j++){
          if(this.code[j].descript.indexOf(word) != -1){
            var codeObj = new Object();
            if(this.code[j].major_key == 1 || this.code[j].major_key == 7778){
              codeObj.code = 'brand_name';
              codeObj.minor_key = this.code[j].minor_key;
              codeObj.descript = this.code[j].descript;
              this.$store.state.wordcatch.push(codeObj);
            } else if(this.code[j].major_key == 2){
              codeObj.code = 'category_large';
              codeObj.minor_key = this.code[j].minor_key;
              codeObj.descript = this.code[j].descript;
              this.$store.state.wordcatch.push(codeObj);
            } else {
              codeObj.code = 'category_middle';
              codeObj.minor_key = this.code[j].minor_key;
              codeObj.descript = this.code[j].descript;

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
        this.$store.state.searchList_readFlag = false;
        this.$store.state.searchFlag = true;
        this.$store.commit('SET_SEARCHPRODUCT_INIT');
        this.$store.dispatch('FETCH_SEARCHCODELIST_READMORE',{wordcatch:this.$store.state.wordcatch, sex:99, category:0, type:0, filter:0, brand:0});
        this.$store.dispatch('SEARCHLIST_CNT',{wordcatch:this.$store.state.wordcatch, category:0, brand:0});
      }

    }
  }
}
</script>
<style>
.tit{
  display: block;
  height: 45px;
  padding: 0 16px;
  border-bottom: 1px solid #ddd;
  font-size: 15px;
  color: #888;
  line-height: 44px;
  text-align: center;
  box-sizing: border-box;
  font-weight: normal;
}
.srch_lst {
    float: left;
    width: 50%;
    box-sizing: border-box;
    list-style: none;
    padding : 0;
}
.srch_cont.single .lstbx{
    overflow: auto;
    float: none;
    position: relative;
    width: 100%;
    clear: both;
}
.search_result{
  display: block;
    line-height: 44px;
    padding: 0 16px;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 560;
}
</style>
