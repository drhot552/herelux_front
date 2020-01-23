<template>
  <div class="content">
        <div class="container" style="padding-right:15px;">
          <div style="color:#888; text-align:center; margin:10px;">
            <span> 4점 이상 부여한 상품들 입니다.</span>
          </div>
          <div v-if="this.$store.state.myList.length > 0" class="row" style="margin-bottom: 50px;">
            <article class="div_style" v-for="item in this.$store.state.myList">
              <div class="in">
                <div v-ripple style="color:#000000;" v-on:click="detail(item.id)">
                  <img class="lazy-img-fadein" v-lazy="item.url" style="width: 130px; height: 130px;"alt="..." >
                  <div class="lazy-img-fadein" v-lazy:background-image="item.url"></div>
                  <h6> <br /> {{item.name}} </h6>
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
          <div v-if="this.$store.state.myList_readFlag" style="text-align:center; height:100px;">
            <a style="color:#000000;" v-on:click="readMore()">
              <img src="/public/img/btn_arrow_down.png" style="height:20px;margin-top: 10px;"/>
            </a>
          </div>
      </div>
    </div>
</template>


<script>
import { product } from '../../api'

export default{

  created(){
    this.returnPath = this.$route.query.returnPath || '/detail'
    this.userid = localStorage.getItem('id');
    console.log("hi");
    //this.readMore();
  },
  data(){
    return{
      returnPath : '',
      userid : ''
    }
  },
  methods:{
    readMore(){
      this.$store.commit('ISLOADING', true);
      this.$store.dispatch('FETCH_MYLIST_READMORE',{userid:this.userid, category_type:this.$store.state.myList_category_type, category:this.$store.state.myList_category});
    },
    detail(id){
      this.$store.state.productDetail_name = 'mylist'
      this.returnPath = this.returnPath +'/' + id + '/' + 'mylist'
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
</style>
