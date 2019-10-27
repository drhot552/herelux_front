<template>
  <div class="section" style="padding: 49px 0 53px; overflow:auto; -webkit-overflow-scrolling: touch;">
    <div class="navbar navbar-expand-lg bg-white" style="position: fixed;width: 100%;">
      <div class="edit_div">
        <div class="container" style="padding-right:0px; padding-left:0px;">
          <div class="search_textarea"  contenteditable="true" id="search" placeholder="검색어를 입력하세요." style="width: 100%; max-height: 35px; height: 30px; float:left; z-index:100;">

          </div>
        </div>
      </div>
    </div>
    <div class="container" style="padding-left:15px; padding-right:15px; padding-top:50px; height:80vh;">
      <div v-if="this.items.length > 0" class="row" style="margin-bottom: 50px; margin-top: 20px;">
        <div class="div_style" v-for="item in this.items">
          <div class="in" v-if="item.sub_descript != null">
            <a style="color:#000000;" v-on:click="detail(item.minor_key)">
              <img v-lazy="`/public/img/brand/${item.sub_descript}.png`" style="width: 130px; height: 130px;"alt="..." >
              <div v-lazy:background-image="item.url"></div>
            </a>
          </div>
        </div>
      </div>
      <!--  <tabs slot="raw-content">
              <tab-pane >
                  <template slot="label">
                       상품
                  </template>
              </tab-pane>
              <tab-pane >
                  <template slot="l abel">
                       브랜드
                  </template>
              </tab-pane>
              <tab-pane >
                  <template slot="label">
                       게시판
                  </template>
              </tab-pane>
        </tabs>-->
      </div>
      <loading :active.sync="this.$store.state.isLoading"
                :can-cancel="true"
                :is-full-page="true"
                :z-index="1060">
      </loading>
  </div>
</template>
<script>
import Tabs from '../Component/SearchTab';
import TabPane from '../Component/Tab';
import { code } from '../../api'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default{
  components:{
    Tabs,
    TabPane
  },
  data(){
    return{
      items:[]
    }
  },
  created(){
    //Brand name
    this.$store.commit('ISLOADING', true);
    code.forum(1).then(data=>{
      if(data.length == 0){

      }
      else{
        this.items = data;
      }
      this.$store.commit('ISLOADING', false);
    }).catch(error =>{
      console.log("error",error);
      //alert 후 페이지 이동
      this.errorAlert();
    });
  },
  methods:{
    detail(productId){
      this.$router.push(this.$route.query.returnPath || '/brand/' + productId);
    }
  }
}
</script>
<style>
[contenteditable=true]:empty:before{
  content: attr(placeholder);
  color:#888;
  font-size: small;
  display: block; /* For Firefox */
}
.edit_div{
  line-height: 1;
  color: #181818;
  width: 100%;
  height: inherit;
  background-color: white;
}
.search_textarea{
  box-sizing: border-box;
  margin: 0;
  height: inherit;
  padding: 8px 10px 0px;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 7px;
  outline: 0;
  overflow: auto;
}
.div_style{
  width: 50%;
  margin-bottom: 20px;
}
.in {
  text-align: center;
}
</style>
