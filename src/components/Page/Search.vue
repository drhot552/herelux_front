  <template>
  <div class="section" v-bind:class="{ main_web_page: webFlag, main_app_page: !webFlag }">
    <div class="blogs-4" id="blogs-4">
      <div>
        <div v-if="!searchFlag">
          <SearchMain>
          </SearchMain>
        </div>
        <div v-else>
          <SearchProductCard></SearchProductCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { code,search } from '../../api'
import SearchPage from '../Search/SearchPage.vue'
import SearchMain from '../Search/SearchMain.vue'
import SearchProductCard from '../Card/SearchProductCard.vue';
import { mapState } from 'vuex'

export default{
  components:{
    SearchProductCard,
    SearchPage,
    SearchMain
  },
  data(){
    return{
      brand_items:[],
      category_items:[],
      search : '',
      word : '',
      code: []

    }
  },
  watch: {
      '$route' (to, from) {
        if(to.path !== from.path) {
          if(from.path.match(/detail/gi)){

          } else if(from.path.match(/search/gi)){

          } else {
            this.searchCheck();
          }
        }
      }
  },
  computed: {
    ...mapState('hereluxAll', {
      webFlag: 'webFlag',
      pageKeepAlive : 'pageKeepAlive'
    }),
    ...mapState('searchList',  {
      searchFlag: 'searchFlag',
      searchWord: 'searchWord',
      wordcatch : 'wordcatch'
    }),
   filteredList() {
     return this.brand_items.filter(item => {
       return item.sub_descript.toLowerCase().includes(this.search.toLowerCase())
     })
   }
  },
  created(){
    this.searchCheck();
  },
  methods:{
    searchCheck(){
      //검색에 관련된 전역변수 초기화
      //기억된 단어가 있을경우에는 word=
      this.$store.commit('hereluxAll/SET_PAGEKEEPLIVE', true);
      if(this.searchWord != ''){
        this.word = "page-" + this.searchWord
      } else {
        this.word = "page-";
      }
      this.$store.commit('searchList/SET_SEARCHPRODUCT_INIT');
      if(this.word == "page-"){
        this.$store.commit('searchList/SET_SEARCHPAGETYPE',0);
        this.$store.commit('searchList/SET_SEARCHFLAG',false);
      } else {
        search.code().then(data=>{
          this.code = data
          console.log(this.word);
          this.word = this.word.replace(/page-/gi,'');
          $("#searchword").val(this.word);
          this.$store.commit('searchList/SET_SEARCHPAGETYPE',2);
          this.$store.commit('searchList/SET_SEARCHFLAG',true);

          this.searchLogic(this.word);
        }).catch(error=>{
          console.log(error);
        })

      }
      code.forum(1).then(data=>{
        if(data.length == 0){

        }
        else{
          this.brand_items = data;
        }
      }).catch(error =>{
        console.log("error",error);
        //alert 후 페이지 이동
      });

      code.forum(2).then(data=>{
        if(data.length == 0){

        }
        else{
          this.category_items = data;
        }

      }).catch(error =>{
        console.log("error",error);
        //alert 후 페이지 이동
      });
    },
    detail(productId){
      this.$router.push(this.$route.query.returnPath || '/brand/' + productId);
    },
    searchClick(){
      this.$router.push(this.$route.query.returnPath || '/searchpage');
    },
    searchLogic(searchWord){
      //Word new Array()로 초기화
      this.$store.commit('searchList/SET_WORDCATCH');
      var word = searchWord;
      //단어 <- code에서 있는지 확인
      //샤넬 남성가방 <-
      this.$store.commit('searchList/SET_LOADINGSEARCHFLAG',false);
      setTimeout(() => {
        this.$store.commit('searchList/SET_LOADINGSEARCHFLAG',true);
      }, 700)
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
              wordObj.descript = this.code[i].descript;
              this.$store.commit('searchList/SET_WORDCATCH_PUSH',wordObj);
            } else if(this.code[i].major_key == 2){
              wordObj.code = 'category_large';
              wordObj.minor_key = this.code[i].minor_key;
              wordObj.descript = this.code[i].descript;
              this.$store.commit('searchList/SET_WORDCATCH_PUSH',wordObj);
            } else {
              wordObj.code = 'category_middle';
              wordObj.minor_key = this.code[i].minor_key;
              wordObj.descript = this.code[i].descript;
              this.$store.commit('searchList/SET_WORDCATCH_PUSH',wordObj);
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
              this.$store.commit('searchList/SET_WORDCATCH_PUSH',codeObj);
            } else if(this.code[j].major_key == 2){
              codeObj.code = 'category_large';
              codeObj.minor_key = this.code[j].minor_key;
              codeObj.descript = this.code[j].descript;
              this.$store.commit('searchList/SET_WORDCATCH_PUSH',codeObj);
            } else {
              codeObj.code = 'category_middle';
              codeObj.minor_key = this.code[j].minor_key;
              codeObj.descript = this.code[j].descript;
              this.$store.commit('searchList/SET_WORDCATCH_PUSH',codeObj);
            }
          }
        }
      }
      //두개 존재하면 검색에 포함
      //둘중 하나도 없으면
      //하나만 있으면 검색에 포함 x
      if(this.wordcatch.length > 0){
        this.$store.commit('searchList/SET_SEARCHTYPE',1);
        this.$store.commit('searchList/SET_SEARCHFLAG',true);
        this.$store.commit('searchList/SET_SEARCHPRODUCT_INIT');
        this.$store.dispatch('searchList/FETCH_SEARCHCODELIST_READMORE',{wordcatch:this.wordcatch, sex:99, category:0, type:0, filter:0, brand:0});
        this.$store.dispatch('searchList/SEARCHLIST_CNT',{wordcatch:this.wordcatch, category:0, brand:0});
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
.main_web_page{
  padding: 100px 0 53px;
  background: #fff;
}
.main_app_page{
  padding: 70px 0 53px;
  background: #fff;
}
</style>
