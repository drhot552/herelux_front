<template>
  <div class="section">
    <div class="content">
        <div class="container">
          <div style="border-bottom: 3px solid rgb(0,0,0);">
            <h5>
                내가 선택한 상품 리스트
            </h5>
          </div>
          <div style="color:#888; text-align:center; margin:20px;">
            <span> 4점 이상 부여한 상품들 입니다.</span>
          </div>
          <div v-if="mylistflag" class="row">
            <div class="div_style" v-for="item in product">
              <div class="in">
                <router-link style="color:#000000;" v-bind:to="`/detail/`+item.id">
                <img v-lazy="item.url" style="width: 130px; height: 130px;"alt="..." >
                <div v-lazy:background-image="item.url"></div>
                <h6> <b>{{item.name}}</b> </h6>
                </router-link>
              </div>
            </div>
          </div>
          <div v-else class="container">
              <div class="row">
                  <div class="col-md-8 ml-auto mr-auto text-center">
                      <h4 class="title">선택한 상품이 없습니다.</h4>
                  </div>
              </div>
          </div>
          <div v-if="readFlag" style="text-align:center; height:50px;">
            <a style="color:#000000;" v-on:click="readMore()">
              <span>더보기..</span>
            </a>
          </div>
  <!--        <infinite-loading spinner="spiral" @infinite="infiniteHandler">
            <span slot="no-more">

            </span>
          </infinite-loading> -->
      </div>
    </div>
  </div>

</template>


<script>
import { product } from '../../api'
//import InfiniteLoading from 'vue-infinite-loading';

export default{
  created(){
    this.userid = localStorage.getItem('id');
    console.log(this.userid, 0);
    this.readMore();
  },
  data(){
    return{
      userid : '',
      descript : '',
      title : '',
      product :[],
      mylistflag : true,
      idx : 0,
      readFlag : true
    }
  },
  methods:{

    readMore(){
      product.mylist(this.userid, this.idx).then(data => {
        if(data.length == 0){
          this.readFlag = false;
        //  $state.complete();
        }
        else if(data.length < 6){
          this.idx += 1;
          this.product.push(...data);
          this.readFlag = false;
        }
        else{
          this.idx += 1;
          this.product.push(...data);
          this.readFlag = true;
        //  $state.loaded();
        }
      })
      .catch(error => {
        this.descript="이용에 불편을 드려 죄송합니다. 빠른 조치중에 있습니다.";
        this.title = "서버에러";
      });

    }
  }
}
</script>

<style>
.div_style{
  width: 50%;
  margin-bottom: 20px;
}
.in {
  width: 100%;
  text-align: center;
}
</style>
