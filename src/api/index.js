//backend api를 호출하는 역할
import axios from 'axios'
import router from '../router'

// const DOMAIN ='http://54.180.145.103:4000' //운영서버
const DOMAIN ='http://54.180.153.54:4000'
const UNAUTHORIZED = 401

const onUnauthorized = () =>{
  router.push('/login')
}

//api 모듈 request method
const request = (method, url, data, setting) =>{
  return axios({
    method,
    url:DOMAIN + url,
    data,
    setting
  }).then(result => result.data)
    .catch(result => {
      const {status} = result.response
      if(status == UNAUTHORIZED) return onUnauthorized()
      throw Error(result)
  })
}

//토큰 인증 저장
export const setAuthInHeader = token =>{
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

export const product = {
  //처음에 가져올 때
  favoritelist(user){
    return request('get', '/product/' + user);
  },
  //선택 후
  select(id){
    return request('get', '/product/image/' + id)
  },
  //선택 후
  insert(id, user, rating){
    return request('post', '/product/list', {id, user, rating})
  },
  mylist(user,page){
    return request('get', '/product/mylist/' + user +'/' + page)
  },
  detail(id){
    return request('get', '/product/detail/' + id)
  },
  //랭킹 0
  ranking(category,major_key, page){
    return request('get', '/product/ranking/'+ category +'/' + major_key + '/' + page)
  }
}
export const event = {
  image(title){
    return request('get', '/event/' + title)
  },
  video(){
    return request('get', '/video')
  }
}

export const board = {
  /*
  write(formData, setting){
    return request('post', '/board/write', {formData}, setting)
  },
  */
  fetch(boardtype, page){
    return request('get', '/board/list/' + boardtype + '/' + page)
  },
  select(board_idx, boardtype){
    return request('get', '/board/select/' + board_idx + '/' + boardtype)
  },
  commentInsert(board_idx,userid,name,descript){
    return request('post', '/board/comment', {board_idx, userid, name, descript})
  },
  commentSelect(board_idx, boardtype){
    return request('get', '/board/comment/' + board_idx)
  },
  commentDelete(comment_idx){
    return request('get', '/board/commentdelete/' + comment_idx)
  }
}

export const auth = {
  login(id, password){
    return request('post', '/login', {id, password})
  },
  register(id,password){
    return request('post', '/register', {id, password});
  }
}

export const code = {
  category(major_key){
    return request('get', '/code/' + major_key)
  },
  forum(major_key){
    return request('get', '/code/forum/' + major_key)
  }
}
