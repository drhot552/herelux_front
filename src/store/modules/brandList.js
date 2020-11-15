import * as api from '../../api';
import router from '../../router';

const state = {
  brandcategoryproduct :[],
  brandcategory_idx : 0,
  brandcategory_readFlag : false,
  brandcategory_descript : '',
  brandcategory_category : 0,
  brandcateogry_brand : 0,
  brandcateogry_category_type : 0,
  brandcategory_filter : 0,

}
const mutations = {
  SET_BRANDCATEGORYPRODUCT_INIT(state){
    state.brandcategoryproduct = []
    state.brandcategory_idx = 0
    state.brandcategory_readFlag = false
  },
  SET_BRNADCATEGORY_BRAND(state,{brandcategory_descript, brandcateogry_brand}){
    state.brandcategory_descript = brandcategory_descript;
    state.brandcateogry_brand = brandcateogry_brand;
  },
  SET_BRNADCATEGORY_CATEGORYTYPE(state,brandcateogry_category_type){
    state.brandcateogry_category_type = brandcateogry_category_type;
  },
  SET_BRNADCATEGORY_CATEGORY(state,brandcategory_category){
    state.brandcategory_category = brandcategory_category;
  },
  SET_BRNADCATEGORY_FILTER(state,brandcategory_filter){
    state.brandcategory_filter = brandcategory_filter;
  }
}

const actions = {
  FETCH_BRANDCATEGORYLIST_READMORE({commit, state},{brand,category, category_type, sex, filter}){
    return api.home.brandproduct(brand, category,  state.brandcategory_idx, category_type, sex, filter).then(data=>{
      if(data.length == 0){
        state.brandcategory_readFlag = false;
      }
      else if(data.length < 20){
        commit('BRANDCATEGORYPRODUCT_IDX_INCREMENT',1)
        state.brandcategoryproduct.push(...data);
        state.brandcategory_readFlag = false;

      }
      else{
        commit('BRANDCATEGORYPRODUCT_IDX_INCREMENT',1)
        state.brandcategoryproduct.push(...data);
        state.brandcategory_readFlag = true;
      }
    }).catch(error =>{
      router.push('/error');
    });
  }
}

export default {namespaced: true, state, mutations, actions}
