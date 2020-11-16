import Vuex from 'vuex'
import Vue from 'vue'
import hereluxAll from './modules/hereluxAll'
import brandList from './modules/brandList'
import searchList from './modules/searchList'
import talkList from './modules/talkList'
import product from './modules/product'
import writeboard from './modules/writeboard'
import boardList from './modules/boardList'
import myList from './modules/myList'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules :{
    hereluxAll,
    brandList,
    searchList,
    talkList,
    product,
    writeboard,
    boardList,
    myList
  }
})

export default store
