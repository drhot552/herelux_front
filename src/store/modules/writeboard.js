import * as api from '../../api';
import router from '../../router';

const state = {
  /* Write 변수 */
  writeBoard_Category : 1,
  writeBoard_Forum : 0,
  writeBoard_name : "",
  writeBoard_image : [],
  formData : Object,
}

const mutations = {
  SET_WRITEBOARD_FORUM(state, writeBoard_forum){
    state.writeBoard_forum = writeBoard_forum;
  },
  SET_WRITEBOARD_CATEGORY(state, writeBoard_Category){
    state.writeBoard_Category = writeBoard_Category;
  },
  SET_WRITEBOARD_NAME(state, writeBoard_name){
    state.writeBoard_name = writeBoard_name;
  },
  SET_WRITEBOARD_IMAGE(state){
    state.writeBoard_image = [];
  },
  SET_WRITEBOARD_OBJECT_IMG1(state, {image}){
    state.formData.append('image_1', image)
  },
  SET_WRITEBOARD_OBJECT_IMG2(state, {image}){
    state.formData.append('image_2', image)
  },
  SET_WRITEBOARD_FORM(state){
    state.formData = new FormData();
  },
  SET_WRITEBOARD_OBJECT(state, {userid,descript,subject,boardtype, boardforum, url_1, url_2}){
    console.log(userid,descript,subject,boardtype, boardforum, url_1, url_2);
    state.formData.append('userid', userid);
    state.formData.append('descript', descript);
    state.formData.append('subject', subject);
    state.formData.append('boardtype', boardtype);
    state.formData.append('boardforum', boardforum);
    state.formData.append('url_1', url_1);
    state.formData.append('url_2', url_2);
  }
}

const actions = {

}

export default {namespaced: true, state, mutations, actions}
