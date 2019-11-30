import Vuex from 'vuex'
import Vue from 'vue'
import * as api from '../api'
import router from '../router'

Vue.use(Vuex)

//store 객체

const store = new Vuex.Store({
  // counter 라는 state 속성을 추가
  state: {
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

    /* Loading */
    isLoading : false,
    /* Datacheck */
    dataCheck : false,

    /* 글 알림 */
    boardInfo:[],
    boardFlag:false

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
      state.myList = [],
      state.myList_idx = 0
    },
    SET_BRANDLIST_INIT(state){
      state.brandList = [],
      state.brandList_idx = 0
    },
    SET_CATEGORY_INIT(state){
      state.brandList_category = 0;
      state.myList_category = 0;
      state.rankTabStatus = 0;
    },
    SET_BOARDINFO_INIT(state){
      state.boardInfo =[]
    },
    ISLOADING(state,isloading){
      state.isLoading = isloading;
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
        console.log("error",error);
        alert("서버와의 통신 에러가 발생하였습니다.");
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
        console.log("error",error);
        alert("서버와의 통신 에러가 발생하였습니다.");
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
        console.log("error",error);
        alert("서버와의 통신 에러가 발생하였습니다.");
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
        console.log("error",error);
        alert("서버와의 통신 에러가 발생하였습니다.");
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
        console.log("error",error);
        alert("서버와의 통신 에러가 발생하였습니다.");
        router.push('/error');
      });
    },
    SELECT_BOARD_INFO_ALERT({commit, state}, {userid}){
      return api.info.board(userid).then(data=>{
        console.log("SELECT_BOARD_INFO_ALERT", userid)
        if(data.length > 0){
          state.boardInfo.push(...data);
          state.boardFlag = true;
          console.log(state.boardInfo);
        } else {
          state.boardFlag = false;
        }
      }).catch(error=>{
        console.log("error",error);
    //    alert("서버와의 통신 에러가 발생하였습니다.");
        router.push('/error');
      });
    }
  }
})

export default store
