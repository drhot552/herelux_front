<template>
    <nav class="navbar navbar-expand-lg bg-white fixed-top">
      <div class="container">
        <div class="search_before" v-on:click="serachBefore()">
          <img src="/public/img/btn_back.png" style="height:20px;">
          </img>
        </div>
        <input class="searchpage_textarea"  contenteditable="true" v-model="searchpage" id="searchpage" ref="search" placeholder="검색"
                  style="width: 100%; max-height: 58px; height: 38px; float:left; z-index:100;" v-on:keyup.enter="searchEnter()">

        </input>
        <div class="search_btn" v-on:click="searchEnter()">
          <img src="/public/img/btn_search.png" style="height:20px;">
          </img>
        </div>

      </div>
    </nav>
</template>

<script>
  export default {
    data(){
      return{
        searchpage:''
      }
    },
    created(){
      this.$nextTick(() => this.$refs.search.focus())
    },
    methods:{
      serachBefore(){
        this.$router.push(this.$route.query.returnPath || '/search');
      },
      searchEnter(){
        let searchWord = '';
        this.$store.state.searchList_readFlag = false;
        this.$store.state.searchFlag = true;
        this.$store.commit('SET_SEARCHPRODUCT_INIT');
        searchWord = this.searchpage;
        if(searchWord.trim() != ''){
          if(searchWord == '.' ||  searchWord == '#'){
            alert('검색어를 단어로 입력하세요.');
          } else {
            //this.$store.dispatch('FETCH_SEARCHPRODUCTLIST_READMORE',{word:this.search});
          }
        } else {
          alert('검색어를 한 단어 이상 입력하세요.');
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
  left: 0;
  position: absolute;
  z-index: 103;
  padding-left: 10px;
  width: 45px;
}
.search_btn{
  position: absolute;
  right: 0;
  z-index: 1032;
  margin: 5px;
  height: 34px;
  width: 50px;
  margin-right: 15px;
}
.searchpage_textarea{
  margin: 0;
  height: inherit;
  outline: 0;
  padding-left: 8px;
  margin-left:40px;
  border:none;
  border-radius: 10px;
  background-color: #E2E2E2;
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
