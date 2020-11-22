//backend api를 호출하는 역할
import axios from 'axios'
import router from '../router'

/* 운영서버 */
const DOMAIN ='http://54.180.120.131:4000';
export const WRITEDOMAIN = 'http://54.180.120.131:4000';

/* 개발서버 */
//const DOMAIN ='http://54.180.153.54:4000'
//export const WRITEDOMAIN = 'http://54.180.153.54:4000';

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
      //error 시 팝업 생성
      router.push('/error');
      if(status == UNAUTHORIZED) return onUnauthorized();

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
  mylist(user,page,category, major_key){
    return request('get', '/product/mylist/' + user +'/' + page + '/' + category + '/' + major_key)
  },
  detail(id){
    return request('get', '/product/detail/' + id)
  },
  //랭킹 0
  ranking(category,major_key, page){
    return request('get', '/product/ranking/'+ category +'/' + major_key + '/' + page)
  },
  //상품상세 이커머스명
  detailbrand(product_id){
    return request('get', '/product/detailbrand/' + product_id);
  },
  //상품 카운트
  productcnt(userid, product_id){
    return request('get', '/product/productcnt/' + userid + '/' + product_id);
  },
  //모든상품 리스트
  allproduct(page, category , major_key){
    return request('get', '/product/allproduct/' + page + '/' + category + '/' + major_key);
  },
  productout(brand){
    return request('get', '/product/samebrand/' + brand);
  },
  productout(id,user,url,shoppingmall,descript){
    return request('post', '/product/productout', {id,user,url,shoppingmall,descript})
  },
  //상품품절신고
  samebrand(brand){
    return request('get', '/product/samebrand/' + brand);
  },
  samecategory(category, category_type){
    return request('get', '/product/samecategory/' + category + '/' + category_type);
  },
  productview(product_id){
    return request('get', '/product/productview/' + product_id);
  },
  productlove(product_id, user_id){
    return request('get', '/product/productlove/' +  user_id + '/' + product_id);
  },
  productlovechk(product_id, user_id){
    return request('get', '/product/productlovechk/' +  user_id + '/' + product_id);
  },
  productrecommend(category_middle){
    return request('get', '/product/productrecommend/' + category_middle)
  }
}
export const event = {
  image(title){
    return request('get', '/event/' + title)
  },
  video(){
    return request('get', '/video')
  },
  fetch(){
    return request('get', '/event')
  }
}
export const comment = {
  commentInsert(board_idx,userid,name,descript){
    return request('post', '/comment', {board_idx, userid, name, descript})
  },
  commentSelect(board_idx){
    return request('get', '/comment/' + board_idx)
  },
  commentDelete(comment_idx){
    return request('get', '/comment/delete/' + comment_idx)
  },
  commentDown(comment_idx, board_idx, userid, name, descript){
    return request('post', '/comment/commentdown', {comment_idx, board_idx, userid,name, descript})
  },
  commentDownSelect(board_idx){
    return request('get', '/comment/commentdown/' + board_idx)
  },
  commentDownDelete(commentdown_idx){
    return request('get', '/comment/downdelete/' + commentdown_idx)
  }
}

export const board = {
  fetch(boardtype, page){
    return request('get', '/board/list/' + boardtype + '/' + page)
  },
  select(board_idx, boardtype){
    return request('get', '/board/select/' + board_idx + '/' + boardtype)
  },
  delete(board_idx){
    return request('get', '/board/delete/' + board_idx)
  },
  mylist(user,myboardlist_type, page){
    return request('get', '/board/mylist/' + user + '/' + myboardlist_type + '/' + page)
  },
  etc(board_idx, etc_type){
    return request('get', '/board/etc/' + board_idx + '/' + etc_type)
  }
}

export const auth = {
  login(id, password, type){
    return request('post', '/login', {id, password, type})
  },
  loginchk(id, type){
    return request('post', '/login/loginchk', {id, type})
  },
  register(id,password, type){
    return request('post', '/register', {id, password, type});
  },
  withdrawal(id, password, type){
    return request('post', '/register/out', {id, password, type});
  },
  passwordchg(id, password){
    return request('post', '/login/passwordchg', {id, password});
  },
  snslogin(id, type, token, access_token){
    return request('post', '/login/snslogin', {id, type, token, access_token})
  }
}
export const info = {
  board(userid){
    return request('get', '/info/board/' + userid)
  },
  boardupdate(userid, board_id){
    return request('get', '/info/boardcheck/' + userid + '/'+ board_id)
  },
  myinfo(userid){
    return request('get', '/info/myinfo/' + userid)
  }
}
export const callback = {
  naver(code, state){
    return request('post', '/callback', {code, state})
  },
  navermember(token){
    return request('post', '/callback/member', {token})
  },
  navershop(product){
    return request('post', '/callback/shop', {product})
  },
  naverblog(product){
    return request('post', '/callback/blog', {product})
  },
  navercafe(product){
    return request('post', '/callback/cafe', {product})
  },
  elevenstore(product){
    return request('post', '/callback/elevenstore', {product})
  }
}

export const search = {
  brand(brandid, page, category , major_key){
    return request('get', '/search/brand/' + brandid + '/' + page + '/' + category + '/' + major_key)
  },
  product(word, page){
    return request('get', '/search/product/' + word + '/' + page)
  },
  recommend(){
    return request('get', '/search/recommend')
  },
  code(){
    return request('get', '/search/code')
  },
  // word/:sex/:category/:page/:type/:filter
  word(wordcatch,sex, category, page, type, filter, brand){
    return request('post','/search/word/' + sex + '/' + category + '/' + page +'/' + type + '/' + filter + '/' + brand , {wordcatch})
  },
  category(){
    return request('get', '/search/category')
  },
  wordcnt(wordcatch, category, brand){
    return request('post', '/search/wordcnt/' + category + '/' + brand, {wordcatch})
  },
  randombrands(){
    return request('get', '/search/randombrands')
  }
}

export const home ={
  productrandom(){
    return request('get', '/home/productrandom')
  },
  brandrandom(id){
    return request('get', '/home/brandrandom/' + id)
  },
  hereluxcnt(){
    return request('get', '/home/hereluxcnt')
  },
  brandfetch(id){
    return request('get', '/home/brandfetch/' + id)
  },
  category(){
    return request('get', '/home/category')
  },
  categoryfetch(id){
    return request('get', '/home/categoryfetch/' + id)
  },
  newproduct(){
    return request('get', '/home/newproduct')
  },
  eventday(){
    return request('get', '/home/eventday')
  },
  categoryproduct(middlecategory){
    return request('get', '/home/categoryproduct/' + middlecategory)
  },
  brandproduct(brand,category,page, category_type, sex, filter){
    return request('get', '/home/brandproduct/' + brand + '/' + category + '/' + page + '/' + category_type + '/' + sex + '/' + filter)
  },
  eventproduct(event_id){
    return request('get', '/home/eventproduct/' + event_id)
  }
}

export const code = {
  category(major_key){
    return request('get', '/code/' + major_key)
  },
  forum(major_key){
    return request('get', '/code/forum/' + major_key)
  },
  brand(minor_key){
    return request('get', '/code/brand/' + minor_key)
  },
  middlecategory(sex, middlecategory){
    return request('get', '/code/middlecategory/' + sex  + '/' + middlecategory)
  },
  brandsex(category, sex){
    return request('get', '/code/brandsex/' + category  + '/' + sex)
  },
  homebrand(major_key){
    return request('get', '/code/homebrand/' + major_key)
  },
  filter(major_key){
    return request('get', '/code/filter/' + major_key)
  },
  search(){
    return request('post', '/code/search')
  },
  searchcode(category_large,sex){
    return request('post', '/code/searchcode/' + sex, {category_large} )
  },
  searchbrands(){
    return request('post', '/code/searchbrands');
  }
}
export const plan = {
  plan(){
    return request('post', '/plan')
  },
  product(event_id){
    return request('get', '/plan/product/' + event_id )
  }
}
export const talk = {
  list(product_id, product_name, brand_name, category_large, category_middle){
    return request('get', '/talk/list/' + product_id + '/' + product_name + '/' + brand_name + '/' + category_large + '/' +  category_middle)
  },
  nickname(talk_id, user_id){
    return request('get', '/talk/nickname/' + talk_id + '/' + user_id)
  },
  delete(talk_id){
    return request('get', '/talk/delete/' + talk_id )
  },
  like(talk_id, user_id, product_id){
    return request('get', '/talk/like/' + talk_id + '/' + user_id + '/' + product_id)
  },
  likelist(talk_id, user_id, product_id){
    return request('get', '/talk/likelist/' + talk_id + '/' + user_id + '/' + product_id)
  }
}
export const talkcomment = {
  talkcomment(talk_id,userid, descript, name){
    return request('post', '/talkcomment/write',  {talk_id, userid, descript, name})
  },
  list(talk_id){
    return request('get', '/talkcomment/list/' + talk_id)
  },
  delete(talk_id, comment_id){
    return request('get', '/talkcomment/delete/'+ talk_id +'/'+ comment_id)
  },
  like(talk_id, comment_id, user_id, product_id) {
    return request('get', '/talkcomment/like/' + talk_id + '/' + comment_id + '/' + user_id + '/' + product_id)
  },
  likelist(talk_id, comment_id, user_id, product_id) {
    return request('get', '/talkcomment/likelist/' + talk_id + '/' + comment_id + '/' + user_id + '/' + product_id)
  }
}
