import * as api from '../../api';
import router from '../../router';

const state ={
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
  myboardList_flag : false
}
const mutations = {
  MYLIST_IDX_INCREMENT(state){
    state.myList_idx++
  },
  MYBOARDLIST_IDX_INCREMENT(state){
    state.myboardList_idx++
  },
  SET_MYLIST_INIT(state){
    state.myList = []
    state.myList_idx = 0
  },
  SET_INIT_MYLIST_BOARD(state, myboard_type){
    state.myboardList_type = myboard_type
    state.myboardList = []
    state.myboardList_idx = 0
  },
  SET_MYLIST_CATEGORY_TYPE(state, myList_category_type){
    state.myList_category_type = myList_category_type
  },
  SET_MYLIST_CATEGORY(state, myList_category){
    state.myList_category = myList_category
  }
}

const actions = {
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
  }
}

export default {namespaced: true, state, mutations, actions}
