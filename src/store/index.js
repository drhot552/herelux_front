import Vuex from 'vuex'
import Vue from 'vue'
import * as api from '../api'

Vue.use(Vuex)

//store 객체

const store = new Vuex.Store({
  // counter 라는 state 속성을 추가
  state: {
    /* Ranking 변수 */
    product: [],
    idx : 0,
    category : 0,
    category_type : 1,
    readFlag : false,
    /* Ranking Tab 변수 */
    rankTabStatus : 0,
    /* Write 변수 */
    writeBoard_Category : 0,
    writeBoard_Forum : 0,
    writeBoard_name : '',
    writeBoard_image : [],
    formData : Object,
    /* Board 변수 */
    board:[],
    board_readFlag : false,
    boardtype : 0,
    board_idx : 0,
    /* Board 상세 변수 */
    boardDetail_name : '',
    /* Tab 상태 저장변수 및 댓글 수정가능 저장변수 */
    boardTabStatus : 0,
    boardCommentFlag : false
  },
  //변수 set
  mutations: {
    IDX_INCREMENT (state) {
      state.idx++
    },
    BOARD_IDX_INCREMENT (state) {
      state.board_idx++
    },
    SET_INIT (state, category) {
      state.idx = 0
      state.product = []
      state.category = category
    },
    SET_INIT_BOARD(state, boardtype){
      state.board_idx = 0
      state.board = []
      state.boardtype = boardtype
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
        else if(data.length < 6){
          commit('IDX_INCREMENT', 1);
          state.product.push(...data);
          state.readFlag = false;
        }
        else{
          commit('IDX_INCREMENT', 1);
          state.product.push(...data);
          state.readFlag = true;

        }
      })
    },
    FETCH_BOARD_READMORE({commit, state}, {boardtype}){
      return api.board.fetch(boardtype, state.board_idx).then(data=>{
        if(data.length == 0){
          state.board_readFlag = false;
        }
        else if(data.length <= 6){
          commit('BOARD_IDX_INCREMENT',1)
          state.board.push(...data);
          state.board_readFlag = false;
        }
        else{
          commit('BOARD_IDX_INCREMENT',1)
          state.board.push(...data);
          state.board_readFlag = true;
        }
      })
    }
  }
})

export default store
