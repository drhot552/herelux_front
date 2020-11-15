import * as api from '../../api';
import router from '../../router';

const state = {
  id : 0,
  name : '',
  brand_name : '',
  category_middle_name : '',
  category_large_name : ''
}
const mutations = {
  SET_PRODUCT_ID(state, id){
    state.id = id
  },
  SET_PRODUCT_NAME(state, name){
    state.name = name
  },
  SET_PRODUCT_BRANDNAME(state, brand_name){
    state.brand_name = brand_name
  },
  SET_PRODUCT_CATEGORY_MIDDLE(state, category_middle_name){
    state.category_middle_name = category_middle_name
  },
  SET_PRODUCT_CATEGORY_LARGE(state, category_large_name){
    state.category_large_name = category_large_name
  }
}
const actions = {

}

export default {namespaced: true, state, mutations, actions}
