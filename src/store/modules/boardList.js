import * as api from '../../api';
import router from '../../router';

const state ={
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

  /* 글 알림  boradinfo */
  boardInfo:[],
  boardFlag:false
}
const mutations = {
  BOARD_IDX_INCREMENT (state) {
  //state.board_count++
    state.board_idx++
  },
  SET_INIT_BOARD(state, boardtype){
  //  state.board_count = 0
    state.board_idx = 0
    state.board = []
    state.boardtype = boardtype
  },
  SET_BOARD_TABSTATUS(state, boardTabStatus){
  //  state.board_count = 0
    state.boardTabStatus = boardTabStatus
  },
  SET_BOARD_COMMENTFLAG(state, boardCommentFlag){
  //  state.board_count = 0
    state.boardCommentFlag = boardCommentFlag
  },
  SET_BOARDINFO_INIT(state){
    state.boardInfo =[]
  }
}

const actions = {
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
  }
}

export default {namespaced: true, state, mutations, actions}
