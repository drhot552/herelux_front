import * as api from '../../api';
import router from '../../router';

const state = {
  /* 검색 상품 List */
  searchList:[],
  searchList_idx : 0,
  searchList_readFlag : false,
  searchFlag : false,
  searchType : 0,
  searchPageType : 0,
  wordcatch : Object,
  searchList_cnt : 0,
  isLoadingSearch : false,
  searchWord : '' /* 검색어 저장 설정 */
}

const mutations = {
  SEARCHPRODUCTLIST_IDX_INCREMENT(state){
    state.searchList_idx++
  },
  SET_SEARCHPRODUCT_INIT(state){
    state.searchList = []
    state.searchList_idx = 0
    state.searchList_readFlag = false,
    state.searchList_cnt = 0
  },
  SET_SEARCHFLAG(state, searchFlag){
    state.searchFlag = searchFlag
  },
  SET_LOADINGSEARCHFLAG(state, isLoadingSearch){
    state.isLoadingSearch = isLoadingSearch
  },
  SET_SEARCHWORD(state, searchWord){
    state.searchWord = searchWord
  },
  SET_SEARCHPAGETYPE(state, searchPageType){
    state.searchPageType = searchPageType
  },
  SET_WORDCATCH(state){
    state.wordcatch = new Array();
  },
  SET_WORDCATCH_PUSH(state, wordObj){
    state.wordcatch.push(wordObj);
  },
  SET_SEARCHTYPE(state, searchType){
    state.searchType = searchType;
  },
  SET_SEARCHREADFLAG(state, searchList_readFlag){
    state.searchList_readFlag = searchList_readFlag;
  }

}

const actions = {
  SEARCHLIST_CNT({commit, state}, {wordcatch, category, brand}){
      return api.search.wordcnt(wordcatch, category, brand).then(data=>{
        state.searchList_cnt = data[0].cnt;
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
    }).catch(error =>{
      router.push('/error');
    });
  },
  FETCH_SEARCHCODELIST_READMORE({commit, state}, {wordcatch, sex, category, type, filter, brand}){
    return api.search.word(wordcatch, sex, category, state.searchList_idx, type, filter, brand).then(data=>{
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
    }).catch(error =>{
      router.push('/error');
    });
  }
}

export default {namespaced: true, state, mutations, actions}
