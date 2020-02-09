import Vuex from 'vuex'
import Vue from 'vue'
import * as api from '../api'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    /* localstorage User ID */
    userId : String,
    token : String,
    type : String,
    /* Ranking 변수 */
    product: [],
    idx : 0,
    category_type : 1,
    readFlag : false,
    /* Ranking Tab 변수 */
    rankTabStatus : 0,
    /* 상품상세 클릭시 해당 플래그 set */
    productDetail_name : String,

    /* Write 변수 */
    writeBoard_Category : 1,
    writeBoard_Forum : 0,
    writeBoard_name : String,
    writeBoard_image : [],
    formData : Object,
    /* Board 변수 */
    board:[],
    board_readFlag : false,
    boardtype : 0,
    board_idx : 0,
    /* Board 상세 변수 */
    boardDetail_name : String,
    /* Tab 상태 저장변수 및 댓글 수정가능 저장변수 */
    boardTabStatus : 0,
    boardCommentFlag : false,

    /* Mylist 관련 Data*/
    myList:[],
    myList_idx: 0,
    myList_readFlag : false,
    myList_category : 0,
    myList_category_type : 1,

    /* MyBoard List */
    myboardList:[],
    myboardList_idx : 0,
    myboardList_type : 0,
    myboardList_flag : false,

    /* 명품관 관련 Data*/
    brandList:[],
    brandList_idx : 0,
    brandList_readFlag : false,
    brandList_category : 0,
    brandList_category_type : 1,
    brandId : 0,

    /* 검색 상품 List */
    searchList:[],
    searchList_idx : 0,
    searchList_readFlag : false,
    searchFlag : false,
    searchType : 0,
    searchPageType : 0,
    wordcatch : Object,
    searchWord : '', /* 검색어 저장 설정 */
    /* Loading */
    isLoading : false,
    /* Datacheck */
    dataCheck : false,

    /* 글 알림  boradinfo */
    boardInfo:[],
    boardFlag:false,

    /* homepage category(NewStyleProduct) */
    categoryProduct:[],
    /* homepage All Product list*/
    productList:[],
    productList_idx : 0,
    productList_category : 0,
    productList_category_type : 1,
    productList_readFlag : false,

    /* page keepAlive */
    pageKeepAlive : false
  },
  //변수 set
  mutations: {
    IDX_INCREMENT (state) {
      state.idx++
    },
    BOARD_IDX_INCREMENT (state) {
    //state.board_count++
      state.board_idx++
    },
    MYLIST_IDX_INCREMENT(state){
      state.myList_idx++
    },
    BRAND_IDX_INCREMENT(state){
      state.brandList_idx++
    },
    MYBOARDLIST_IDX_INCREMENT(state){
      state.myboardList_idx++
    },
    SEARCHPRODUCTLIST_IDX_INCREMENT(state){
      state.searchList_idx++
    },
    ALLPRODUCTLIST_IDX_INCREMENT(state){
      state.productList_idx++
    },

    SET_INIT (state) {
      state.idx = 0
      state.product = []
    },
    SET_INIT_BOARD(state, boardtype){
    //  state.board_count = 0
      state.board_idx = 0
      state.board = []
      state.boardtype = boardtype
    },
    SET_INIT_MYLIST_BOARD(state, myboard_type){
      state.myboardList_type = myboard_type
      state.myboardList = []
      state.myboardList_idx = 0
    },
    SET_MYLIST_INIT(state){
      state.myList = []
      state.myList_idx = 0
    },
    SET_BRANDLIST_INIT(state){
      state.brandList = []
      state.brandList_idx = 0
    },
    SET_CATEGORY_INIT(state){
      state.brandList_category = 0
      state.myList_category = 0
      state.rankTabStatus = 0
      state.searchWord = ''
    },
    SET_SEARCHPRODUCT_INIT(state){
      state.searchList = []
      state.searchList_idx = 0
      state.searchList_readFlag = false
    },
    SET_BOARDINFO_INIT(state){
      state.boardInfo =[]
    },
    SET_CATEGORYPRODUCT_INIT(state){
      state.categoryProduct = []
    },
    SET_PRODUCTLIST_INIT(state){
      state.productList = []
      state.productList_idx = 0
    },
    ISLOADING(state,isloading){
      state.isLoading = isloading
    }
  },
  //보드를 추가하는 액션 api 콜을 해서 보드 생성 -> 비동기 처리시 actions 사용
  actions:{
    FETCH_RANK_READMORE({commit, state} , {category_type, category}){
      var key = 0;
      if(category == 0) {
        key = 99;
      }
      else {
        key = category;
      }

      return api.product.ranking(category_type, key, state.idx).then(data=>{
        if(data.length == 0){
          state.readFlag = false;
        }
        else if(data.length < 20){
          commit('IDX_INCREMENT', 1);
          state.product.push(...data);
          state.readFlag = false;

        }
        else{
          commit('IDX_INCREMENT', 1);
          state.product.push(...data);
          state.readFlag = true;
        }

          commit('ISLOADING', false);
      }).catch(error =>{
        router.push('/error');
      });
    },
    FETCH_BOARD_READMORE({commit, state}, {boardtype}){
      return api.board.fetch(boardtype, state.board_idx).then(data=>{
        if(data.length == 0){
          state.board_readFlag = false;
        }
        else if(data.length < 20){
          commit('BOARD_IDX_INCREMENT',1)
          state.board.push(...data);
          state.board_readFlag = false;
        }
        else{
          commit('BOARD_IDX_INCREMENT',1)
          state.board.push(...data);
          state.board_readFlag = true;
        }
          commit('ISLOADING', false);
      }).catch(error =>{
        router.push('/error');
      });
    },
    FETCH_MYLIST_READMORE({commit, state}, {userid, category_type, category}){
      var key = 0;
      if(category == 0) {
        key = 99;
      }
      else {
        key = category;
      }
      return api.product.mylist(userid, state.myList_idx, category_type, key).then(data=>{
        if(data.length == 0){
          state.myList_readFlag = false;
        }
        else if(data.length < 20){
          commit('MYLIST_IDX_INCREMENT',1)
          state.myList.push(...data);
          state.myList_readFlag = false;

        }
        else{
          commit('MYLIST_IDX_INCREMENT',1)
          state.myList.push(...data);
          state.myList_readFlag = true;
        }
          commit('ISLOADING', false);
      }).catch(error =>{
        router.push('/error');
      });
    },
    FETCH_MYBOARDLIST_READMORE({commit, state}, {userid, myboardlist_type}){

      return api.board.mylist(userid, myboardlist_type, state.myboardList_idx).then(data=>{
        if(data.length == 0){
          state.myboardList_flag = false;
        }
        else if(data.length < 20){
          commit('MYBOARDLIST_IDX_INCREMENT',1)
          state.myboardList.push(...data);
          state.myboardList_flag = false;
        }
        else{
          commit('MYBOARDLIST_IDX_INCREMENT',1)
          state.myboardList.push(...data);
          state.myboardList_flag = true;
        }
          commit('ISLOADING', false);
      }).catch(error =>{
        router.push('/error');
      });
    },
    FETCH_SEARCHPRODUCTLIST_READMORE({commit, state}, {word}){
      return api.search.product(word, state.searchList_idx).then(data=>{
        if(data.length == 0){
          state.searchList_readFlag = false;
        }
        else if(data.length < 20){
          commit('SEARCHPRODUCTLIST_IDX_INCREMENT',1)
          state.searchList.push(...data);
          state.searchList_readFlag = false;
        }
        else{
          commit('SEARCHPRODUCTLIST_IDX_INCREMENT',1)
          state.searchList.push(...data);
          state.searchList_readFlag = true;
        }
          commit('ISLOADING', false);
      }).catch(error =>{
        router.push('/error');
      });
    },
    FETCH_SEARCHCODELIST_READMORE({commit, state}, {wordcatch}){
      return api.search.word(wordcatch, state.searchList_idx).then(data=>{
        if(data.length == 0){
          state.searchList_readFlag = false;
        }
        else if(data.length < 20){
          commit('SEARCHPRODUCTLIST_IDX_INCREMENT',1)
          state.searchList.push(...data);
          state.searchList_readFlag = false;

        }
        else{
          commit('SEARCHPRODUCTLIST_IDX_INCREMENT',1)
          state.searchList.push(...data);
          state.searchList_readFlag = true;
        }
          commit('ISLOADING', false);
      }).catch(error =>{
        router.push('/error');
      });
    },
    //브랜드관 출시
    FETCH_BRANDLIST_READMORE({commit, state}, {brandid, category_type, category}){
      var key = 0;
      if(category == 0) {
        key = 99;
      }
      else {
        key = category;
      }
      return api.search.brand(brandid, state.brandList_idx, category_type, key).then(data=>{
        if(data.length == 0){
          state.brandList_readFlag = false;
        }
        else if(data.length < 20){
          commit('BRAND_IDX_INCREMENT',1)
          state.brandList.push(...data);
          state.brandList_readFlag = false;

        }
        else{
          commit('BRAND_IDX_INCREMENT',1)
          state.brandList.push(...data);
          state.brandList_readFlag = true;
        }
          commit('ISLOADING', false);
      }).catch(error =>{
        router.push('/error');
      });
    },
    SELECT_BOARD_INFO_ALERT({commit, state}, {userid}){
      return api.info.board(userid).then(data=>{
        if(data.length > 0){
          state.boardInfo.push(...data);
          state.boardFlag = true;
        } else {
          state.boardFlag = false;
        }
      }).catch(error=>{
        console.log("error",error);
        router.push('/error');
      });
    },
    FETCH_ALLPRODUCT_LIST_READMORE({commit, state}, {category_type, category}){
      var key = 0;
      if(category == 0) {
        key = 99;
      }
      else {
        key = category;
      }
      return api.product.allproduct(state.productList_idx, category_type, key).then(data=>{
        if(data.length == 0){
          state.productList_readFlag = false;
        }
        else if(data.length < 20){
          commit('ALLPRODUCTLIST_IDX_INCREMENT',1)
          state.productList.push(...data);
          state.productList_readFlag = false;

        }
        else{
          commit('ALLPRODUCTLIST_IDX_INCREMENT',1)
          state.productList.push(...data);
          state.productList_readFlag = true;
        }
          commit('ISLOADING', false);
      }).catch(error =>{
        router.push('/error');
      });
    }
  }
})

export default store
