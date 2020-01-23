<template>
    <div>
      <div v-if="this.category.length > 0" class="row" style="margin-top: 20px; margin-bottom:60px;">
        <article class="div_style" v-for="item in category">
          <div class="in">
            <div v-ripple style="color:#000000;" v-on:click="detail(item.descript)">
              <img v-lazy="item.url" class="lazy-img-fadein"  style="width: 100px; height: 100px;" alt="..." />
              <h6 style="font-weight:700; margin-top:10px;">{{item.descript}}</h6>
            </div>
          </div>
        </article>
      </div>
    </div>
</template>
<script>
import { search } from '../../api'
export default{
  data(){
    return{
        category:[],
        code:[]
    }
  },
  created(){
    search.category().then(data=>{
      this.category = data;
    }).catch(error=>{

    })
    search.code().then(data=>{
      this.code = data
    }).catch(error=>{
      console.log(error);
    })
  },
  methods:{
    detail(searchWord){
        this.$store.state.wordcatch = new Array();
        var word = searchWord;
        this.$store.state.searchWord = word;
        $("#search").val(searchWord);
        //단어 <- code에서 있는지 확인
        //샤넬 남성가방 <-
        for(var i=0; i<this.code.length; i++){
            var re = new RegExp(this.code[i].descript);
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
            if(this.code[j].descript.indexOf(word) != -1){
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
          this.$store.state.searchList_readFlag = false;
          this.$store.state.searchFlag = true;
          this.$store.commit('SET_SEARCHPRODUCT_INIT');
          this.$store.dispatch('FETCH_SEARCHCODELIST_READMORE',{wordcatch:this.$store.state.wordcatch});
        }
    }
  }
}
</script>
<style>
</style>
