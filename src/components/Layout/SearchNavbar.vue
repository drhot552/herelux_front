<template>
    <nav class="navbar navbar-expand-lg bg-white fixed-top">
      <div class="search_btn" v-on:click="searchEnter()">
        <img src="/public/img/btn_search.png" style="height:20px;">
        </img>
      </div>
      <input class="searchpage_textarea"  contenteditable="true" v-model="search" id="search" ref="search" placeholder="검색어를 입력하세요."
                style="width: 100%; max-height: 58px; height: 38px; float:left; z-index:100;" v-on:keyup.enter="searchEnter()">

      </input>

      <div class="search_before" v-on:click="serachBefore()">
        <img src="/public/img/btn_close.png" style="height:20px;">
        </img>
      </div>
    </nav>
</template>

<script>
import { search,code } from '../../api'
  export default {
    data(){
      return{
        search:'',
        code : [],
        obj : Object,
        searchTable:[]
      }
    },
    created(){
      this.$nextTick(() => this.$refs.search.focus())
      search.code().then(data=>{
        this.code = data
      }).catch(error=>{
        console.log(error)
      })
      code.search().then(data=>{
        for(var i = 0; i < data.length; i++){
          this.searchTable.push(data[i].descript)
        }
      }).catch(error=>{
        console.log(error)
      })

    },
    watch: {
      // 질문이 변경될 때 마다 이 기능이 실행됩니다.
      search: function (newQuestion) {
        if(newQuestion == ''){
          this.$store.state.searchFlag = false
        } else {
          this.$store.state.searchFlag = true
          this.$store.state.isLoadingSearch = true;
        }
      }
    },
    methods:{
      serachBefore(){
        this.$store.state.pageKeepAlive = false;
        if(this.$store.state.searchFlag){
          //초기화
          this.$store.commit('SET_SEARCHPRODUCT_INIT');
          this.$store.state.searchFlag = false;
          $("#search").val("");
          this.$store.state.searchWord = '';
        } else {
          this.$router.push(this.$route.query.returnPath || '/');
        }
      },
      searchEnter(){
        this.$store.state.pageKeepAlive = true;
        this.$store.state.wordcatch = new Array();
        this.search = $("#search").val();
        this.$store.state.searchWord = this.search; // 검색어 임시저장

        var word = this.search;
        word=word.replace(/ /gi, "");    // 모든 공백을 제거

        this.$store.state.isLoadingSearch=false;
        setTimeout(() => {
          this.$store.state.isLoadingSearch = true;
        }, 700)
        //단어 <- code에서 있는지 확인
        //샤넬 남성가방 <-
        for(var i=0; i<this.code.length; i++){
            var descript = this.code[i].descript;
            descript = descript.replace(/ /gi, "");
            descript = descript.replace(/,/gi, "");

            var re = new RegExp(descript);
            if(word.indexOf(descript) != -1){
              var wordObj = new Object();
              word = word.replace(",","");
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
            var descript = this.code[j].descript;
            descript = descript.replace(/ /gi, "");

            if(descript.indexOf(word) != -1){
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
        } else {
          var searchWord = '';
          this.$store.state.searchType = 0;
          this.$store.state.searchList_readFlag = false;
          this.$store.state.searchFlag = true;
          this.$store.commit('SET_SEARCHPRODUCT_INIT');
          searchWord = this.search;
          if(searchWord.trim() != ''){
            if(searchWord == '.' ||  searchWord == '#' || searchWord =='?'){
              alert('검색어를 단어로 입력하세요.');
            } else {
              this.$store.dispatch('FETCH_SEARCHPRODUCTLIST_READMORE',{word:this.search});
            }
          } else {
            alert('검색어를 한 단어 이상 입력하세요.');
          }
        }
      }
    }
  }
</script>
<style scoped>
nav {
  text-align: center;
}
.search_style{
  width:15%;
  color: rgb(136, 136, 136);
}
.search_before{
  right: 10px;
  position: absolute;
  z-index: 103;
  padding-left: 10px;
  width: 45px;
}
.search_btn{
  position: absolute;
  z-index: 1032;
  margin: 5px;
  height: 34px;
  margin-right: 15px;
}
.searchpage_textarea{
  margin: 0;
  height: inherit;
  outline: 0;
  padding-left: 8px;
  margin-left:40px;
  width: 75%;
  border:none;
  border-radius: 10px;
}
.search_navbar {
  padding-top: 0;
  padding-bottom: 0;
  min-height: 53px;
}
.search_style_middle{
  width:100%;
  text-align: center;
}
.modal-view{
  width: 100%;
  height: 200px;
  overflow-y: scroll;
}
</style>
