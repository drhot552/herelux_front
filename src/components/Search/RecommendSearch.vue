<template>
  <div>
    <div style="margin-top:15px;">
      <div v-for="item in recommend" style="display:inline-block; margin-right:10px;">
        <button type="button" class="btn btn-default" style="margin:5px;" v-on:click="search(item.recommend)"> {{item.recommend}} </button>
      </div>
    </div>
    <div :class="{'ad_android': this.flag, 'ad_iphone': !this.flag}">
      <adfit-banner
      v-on:ad-loaded
      v-on:ad-failed
      data-ad-test="N"
      data-ad-unit="DAN-u8b8wmb7vg38">
      </adfit-banner>
    </div>

  </div>

</template>
<script>
import { search } from '../../api';
export default{
  created(){

    if(navigator.userAgent.match(/Android|Tablet/i)){
      this.flag = true
    }
    else if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
      this.flag = false
    } else {
      this.flag = true
    }

    search.recommend().then(data=>{
      this.recommend = data;
    }).catch(error=>{
      //error
      console.log(error);
    })
    search.code().then(data=>{
      this.code = data
    }).catch(error=>{
      console.log(error);
    })
  },
  data(){
    return{
      recommend:[],
      code:[],
      flag: false
    }
  },
  methods:{
    search(searchWord){
      this.$store.state.wordcatch = new Array();
      var word = searchWord;
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
.ad_android{
  position:absolute;
  top: 64vh;
  left:0;
  right:0;
}
.ad_iphone{
  position:absolute;
  top: 70vh;
  left:0;
  right:0;
}
</style>
