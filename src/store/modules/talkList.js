import * as api from '../../api';
import router from '../../router';

const state = {
  /* talk 변수 */
  talk:[],
  talk_flag : false,
  talkObject : Object,
  talknickName : "",
  talkCommentFlag : false,
  talkCommentId : 0,
  talkCommentdescript : String,
  talkCommentName : String,
  talkCommentObject : Object,
  talkmodalShow : false,
  talkmodalId : 0,
  talkmodalDescript : "" ,
  talkmodalTitle : "",
  talkmodalGubun : "",
  talkmodalcommentId : 0,
  talkisLoading : true
}

const mutations = {
  SET_TALK_INIT(state){
    state.talk = []
  },
  SET_TALK_OBJECT_INIT(state){
    state.talkObject = new FormData();
  },
  SET_TALK_FLAG(state, talk_flag){
    state.talk_flag = talk_flag
  },
  SET_TALK_ISLOADING(state, talkisLoading){
    state.talkisLoading = talkisLoading
  },
  SET_TALK_NICKNAME(state, talknickName){
    state.talknickName = talknickName
  },
  SET_TALK_MODAL(state, {talkmodalShow, talkmodalcommentId, talkmodalId, talkmodalDescript, talkmodalTitle, talkmodalGubun}){
    state.talkmodalShow = talkmodalShow
    state.talkmodalId = talkmodalId
    state.talkmodalcommentId = talkmodalcommentId
    state.talkmodalDescript = talkmodalDescript
    state.talkmodalTitle = talkmodalTitle
    state.talkmodalGubun = talkmodalGubun
  },
  SET_TALK_OBJECT(state, {id,name,nickname,brand_name,category_large_name, category_middle_name,userid,descript}){
    state.talkObject.append('product_id', id)
    state.talkObject.append('product_name', name)
    state.talkObject.append('name', nickname)
    state.talkObject.append('brand_name', brand_name)
    state.talkObject.append('category_large_name', category_large_name)
    state.talkObject.append('category_middle_name', category_middle_name)
    state.talkObject.append('userid', userid)
    state.talkObject.append('descript', descript)
  },
  SET_TALK_OBJECT_IMAGE(state, image){
    state.talkObject.append('image_1', image)
  },
  SET_TALKCOMMENT_OBJECT_INIT(state){
    state.talkCommentObject = new FormData();
  },
  SET_TALKCOMMENT_OBJECT(state, {talk_id,user_id,name,descript}){
    state.talkCommentObject.append('talk_id', talk_id)
    state.talkCommentObject.append('user_id', user_id)
    state.talkCommentObject.append('name', name)
    state.talkCommentObject.append('descript', descript)
  },
  SET_TALKCOMMENT_OBJECT_IMAGE(state, {image}){
    state.talkCommentObject.append('image_1', image)
  },
  SET_TALKCOMMENT_FLAG(state, talkCommentFlag){
    state.talkCommentFlag = talkCommentFlag
  },
  SET_TALKCOMMENT_PARAM(state, {talkCommentFlag, talkCommentId, talkCommentdescript, talkCommentName}){
    state.talkCommentFlag = talkCommentFlag
    state.talkCommentId = talkCommentId
    state.talkCommentdescript = talkCommentdescript
    state.talkCommentName = talkCommentName
  }
}

const actions = {
  FETCH_TALK_READMORE({commit, state}, {product_id, product_name, brand_name, category_large, category_middle}){
    return api.talk.list(product_id, product_name, brand_name, category_large, category_middle).then(data=>{

      if(data.length > 0){
        state.talk.push(...data)
      }
    }).catch(error =>{
      router.push('/error');
    });
  }
}

export default {namespaced: true, state, mutations, actions}
