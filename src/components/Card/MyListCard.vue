<template>
  <div class="content">
        <div class="container" style="padding-right:15px;">
          <div style="color:#888; text-align:center; margin:10px;">
            <span> 위시리스트 상품입니다.</span>
          </div>
          <div v-if="myList.length > 0" class="row" style="margin-bottom: 50px;">
            <article class="div_style" v-for="item in myList">
              <div class="in">
                <div v-ripple style="color:#000000;" v-on:click="detail(item.id)">
                  <img class="lazy-img-fadein" v-lazy="item.url" style="width: 130px; height: 130px;"alt="..." >
                  <div class="lazy-img-fadein" v-lazy:background-image="item.url"></div>
                  <h6 class="product_name"> <br /> {{item.name}} </h6>
                  <h6> <b>{{item.price}}</b> </h6>
                </div>
              </div>
            </article>
          </div>
          <div v-else class="container">
              <div v-if="!this.$store.state.isLoading" class="row" >
                  <div class="col-md-8 ml-auto mr-auto text-center">
                      <h4 class="title">선택한 상품이 없습니다.</h4>
                  </div>
              </div>
          </div>
          <div v-if="myList_readFlag" style="text-align:center; height:100px;">
            <a style="color:#000000;" v-on:click="readMore()">
              <img src="/public/img/btn_arrow_down.png" style="height:20px;margin-top: 10px;"/>
            </a>
          </div>
      </div>
    </div>
</template>


<script>
import { product } from '../../api'
import { mapState } from 'vuex'

export default{

  data(){
    return{
      returnPath : '',
      userid : ''
    }
  },
  computed:{
    ...mapState('myList', {
      myList: 'myList',
      myList_category_type : 'myList_category_type',
      myList_category : 'myList_category',
      myList_readFlag : 'myList_readFlag'
    })
  },
  created(){
    this.userid = localStorage.getItem('id');
  },
  methods:{
    readMore(){
      this.$store.dispatch('myList/FETCH_MYLIST_READMORE',{userid:this.userid, category_type:this.myList_category_type, category:this.myList_category});
    },
    detail(id){
      this.$store.commit('ISLOADING', true);
      this.$store.commit('hereluxAll/SET_PRODUCTDETAIL_NAME', 'mylist');

      this.returnPath = this.$route.query.returnPath || '/detail/' + id + '/' + 'mylist'
      setTimeout(() => {
        this.$router.push(this.returnPath)
      },300)

    }
  }
}
</script>

<style>
.div_style{
  width: 50%;
  margin-bottom: 20px;
  position:relative;
}
.in {
  width: 100%;
  text-align: center;
}
.lazy-img-fadein[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
}
.product_name {
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
