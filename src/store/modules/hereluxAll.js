import * as api from '../../api';
import router from '../../router';

const state = {
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

  /* 로그인 및 회원가입 후 returnPath */
  loginreturnPath : String,

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

  /* homepage category(NewStyleProduct) */
  categoryProduct:[],

  /* homepage All Product list*/
  productList:[],
  productList_idx : 0,
  productList_category : 0,
  productList_category_type : 1,
  productList_readFlag : false,

  /* page keepAlive */
  pageKeepAlive : false,

  /* page Move Url Keep */
  pageMoveURL : '',

  /* app flag */
  webFlag : false
}

const mutations = {
  IDX_INCREMENT (state) {
    state.idx++
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

  ALLPRODUCTLIST_IDX_INCREMENT(state){
    state.productList_idx++
  },
  BRANDCATEGORYPRODUCT_IDX_INCREMENT(state){
    state.brandcategory_idx++
  },

  SET_WEBFLAG(state, flag){
    state.webFlag = flag
  },
  SET_PAGEKEEPLIVE(state,pageKeepAlive){
    state.pageKeepAlive = pageKeepAlive
  },
  SET_PRODUCTDETAIL_NAME(state, productDetail_name){
    state.productDetail_name = productDetail_name
  },
  SET_PAGEMOVEURL(state, pageMoveURL){
    state.pageMoveURL = pageMoveURL
  },
  SET_LOGINPATH(state, loginreturnPath){
    state.loginreturnPath = loginreturnPath;
  },
  SET_INIT (state) {
    state.idx = 0
    state.product = []
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
}

const actions = {

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

export default {namespaced: true, state, mutations, actions}
