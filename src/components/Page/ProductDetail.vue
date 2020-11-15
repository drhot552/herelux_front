<template>
  <div class="section" v-bind:class="{ main_web_page: webFlag, main_product_app_page: !webFlag }">
    <div class="blogs-4">
        <div v-if="loading" style="width:100%; height:1024px; text-align: center;">
          <div style="display: inline-block; margin-top:150px;">
            <clip-loader :loading="loading" :color="'black'" :size="'50px'"></clip-loader>
          </div>
        </div>
          <div v-else class="container">
            <div class="row">
              <article class="col-md-8 ml-auto mr-auto">
                <div v-if="productflag">
                  <ul class="tabs_category" ref="tabbar">
                     <div class="tabitem_category" :class="index === detailactivetab ? 'active' : ''"  v-for="(tab, index) in detailtab" @click="switchtab(index)" :key="index" ref="tab">
                       {{tab}}
                     </div>
                   </ul>
                   <div class="slider_category" :style="'transform:translateX('+detailactivetab*tabwidth+'%)'">
                   </div>
                  <swiper ref="mySwiper" :options="swiperOptions" @slideChangeTransitionStart="onSwiperSlideChangeTransitionStart">
                    <swiper-slide v-for="(loop, index) in detailtab" >
                      <div class="tabpane_category" v-if="index === 0 && index === detailactivetab">
                        <Detail
                          v-bind:id="product[0].id"
                          v-bind:brand="product[0].brand_name"
                          v-bind:category_large="product[0].category_large"
                          v-bind:category_middle="product[0].category_middle"
                          v-bind:brand_name="product[0].brand_name_descript"
                          v-bind:category_large_name="product[0].category_large_name"
                          v-bind:category_middle_name="product[0].category_middle_name"
                          v-bind:name="product[0].name"
                          v-bind:size="product[0].size"
                          v-bind:color="product[0].color"
                          v-bind:price="product[0].price"
                          v-bind:star="product[0].star"
                          v-bind:count="product[0].count"
                          v-bind:sub_name="product[0].sub_name"
                          v-bind:reg_dttm="product[0].reg_dttm">
                        </Detail>
                      </div>
                       <div class="tabpane_category" v-if="index === 1 && index === detailactivetab">
                         <Talk v-bind:id="product[0].id"
                         v-bind:brand="product[0].brand_name"
                         v-bind:category_large="product[0].category_large"
                         v-bind:category_middle="product[0].category_middle"
                         v-bind:brand_name="product[0].brand_name_descript"
                         v-bind:category_large_name="product[0].category_large_name"
                         v-bind:category_middle_name="product[0].category_middle_name"
                         v-bind:name="product[0].name"
                         v-bind:size="product[0].size"
                         v-bind:color="product[0].color"
                         v-bind:price="product[0].price"
                         v-bind:star="product[0].star"
                         v-bind:count="product[0].count"
                         v-bind:sub_name="product[0].sub_name"
                         v-bind:reg_dttm="product[0].reg_dttm">
                         </Talk>
                       </div>
                    </swiper-slide>
                  </swiper>
                  <br/>
                  <br/>
                </div>
                <div style="padding-right: 15px;position: absolute;top: 5px;right: 0; width:40%;">
                  <a style="margin-top:10px; float:right; width:15%;" v-on:click="doCopy()">
                    <img src="/public/img/btn_share.png"/>
                  </a>
                  <a v-if="!this.likeFlag" style="margin-top:10px; margin-right:10px; float:right; width:15%;" v-on:click="doLove()">
                   <img src="/public/img/btn_heart_default.png"/>
                  </a>
                  <a v-else style="margin-top:10px; margin-right:10px; float:right; width:15%;" v-on:click="doLove()">
                   <img src="/public/img/btn_heart_over.png"/>
                  </a>
                </div>
              </article>
            </div>
          </div>
    </div>
    <div class="section-space"></div>
    <notifications group="alert" position="top center" style="margin-top: 40vh;"/>
    <modal :show.sync="talkmodalShow" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">{{talkmodalTitle}}</h4>
      <p>{{talkmodalDescript}}</p>
      <template slot="footer" class="justify-content-center">
        <button class="btn btn-secondary" v-on:click="onClose()">Close</button>
        <button class="btn btn-primary" v-on:click="handleOk()">Ok</button>
      </template>
    </modal>
    <modal :show.sync="modalShow" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">{{title}}</h4>
      <p>{{descript}}</p>
      <template slot="footer" class="justify-content-center">
        <button class="btn btn-secondary" v-on:click="onClose()">Close</button>
        <button class="btn btn-primary" v-on:click="handleLoginOk()">Ok</button>
      </template>
    </modal>
  </div>
</template>
<script>
import Detail from '../ProductDetail/Detail.vue'
import Talk from '../ProductDetail/Talk.vue'
import SearchInfo from '../ProductDetail/SearchInfo'
import AtherShop from '../ProductDetail/AtherShop.vue'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import Modal from '../Component/Modal';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { product, talk, talkcomment } from '../../api'
import { mapState } from 'vuex'

export default {
  components: {
    ClipLoader,
    Detail,
    AtherShop,
    SearchInfo,
    Talk,
    Swiper,
    SwiperSlide,
    Modal
  },
  directives: {
    swiper: directive
  },
  data(){
    return{
      product:[],
      productflag : true,
      productId : 0,
      loading : false,
      transition: "slide-next",
      detailactivetab : 0,
      tabwidth: 100,
      detailtab:['상품정보','Talk'],
      userid : "",
      likeFlag : false,
      title : "",
      descript : "",
      modalShow : false
    }
  },
  watch: {
      '$route' (to, from) {
        if(to.path !== from.path ) {
          this.product = []
          this.productId = to.params.id;
          this.listProduct();
        }
      }
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      },
      ...mapState('hereluxAll', {
        webFlag: 'webFlag'
      }),
      ...mapState('product',{
        id : 'id',
        name : 'name',
        brand_name : 'brand_name',
        category_middle_name : 'category_middle_name',
        category_large_name : 'category_large_name'
      }),
      ...mapState('talkList',{
        talkmodalShow : 'talkmodalShow',
        talkmodalId : 'talkmodalId',
        talkmodalDescript : 'talkmodalDescript' ,
        talkmodalTitle : 'talkmodalTitle',
        talkmodalGubun : 'talkmodalGubun',
        talkmodalcommentId : 'talkmodalcommentId'
      })
  },
  beforeDestroy () {
    this.$store.commit('talkList/SET_TALK_FLAG', false);
  },
  created(){
    this.productId = this.$route.params.id;
    if(this.userid != ""){
      product.productlovechk(this.userid, this.id).then(data =>{
        if(data == 500){
          this.errorAlert();
        } else if(data.length > 0){
          this.likeFlag = true;
        }
      }).catch(error =>{
        this.errorAlert();
      });
    }
    this.loginCheck();
    this.listProduct();
  },
  methods:{
    switchtab(n){
      this.detailactivetab = n;
      if(this.detailactivetab == 0){
        this.$store.commit('talkList/SET_TALK_FLAG', false);
      } else {
        this.loginCheck();
      }
      this.swiper.activeIndex = this.detailactivetab;
    },
    onSwiperSlideChangeTransitionStart(){
      this.detailactivetab = this.swiper.activeIndex;
      if(this.detailactivetab == 0){
        this.$store.commit('talkList/SET_TALK_FLAG', false);
      } else {
        //로그인 했는지 확인
        this.loginCheck();
        this.$store.commit('talkList/SET_TALK_ISLOADING', true);
        setTimeout(() => {
          this.$store.commit('talkList/SET_TALK_ISLOADING', false);
        }, 500);
      }
    },
    doCopy() {
      var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname;

      this.$notify({
         group: 'alert',
         title: '복사되었습니다.',
         text: newURL,
         duration: 500
       });
        this.$copyText(newURL).then(function (e) {

          console.log(e)
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })
     },
     doLove(){
       if(this.userid != null){
         product.productlove(this.id, this.userid).then(data=>{
           if(data == 200){
             if(this.likeFlag){
               this.$notify({
                  group: 'alert',
                  title: '상품을 위시리스트에 제외하였습니다.',
                  duration: 500
                });
                this.likeFlag = false;
             } else {
               this.$notify({
                  group: 'alert',
                  title: '상품을 위시리스트에 담았습니다.',
                  duration: 500
                });
                this.likeFlag = true;
             }

           }
         })
       } else{
         this.title = "로그인 확인"
         this.descript = "로그인 후 위시리스트에 담을 수 있습니다. 로그인 하시겠습니까?"
         this.modalShow = true;
       }

     },
    //talk
    loginCheck(){
      this.userid = localStorage.getItem('id');
      if(this.userid == null){
        this.$store.commit('talkList/SET_TALK_FLAG', false);
      } else {
        this.$store.commit('talkList/SET_TALK_FLAG', true);
      }
    },
    onClose(){
      this.modalShow = false;
      this.$store.commit('talkList/SET_TALK_MODAL', {talkmodalShow:false, talkmodalId:0, talkmodalDescript:"", talkmodalTitle:"", talkmodalGubun:""});
    },
    handleLoginOk(){
      this.modalShow = false;
      this.$router.push(this.$route.query.returnPath || '/login');
    },
    handleOk(){
      if(this.talkmodalGubun == "talk"){
        talk.delete(this.talkmodalId).then(data=>{
          this.$store.commit('talkList/SET_TALK_MODAL', {talkmodalShow:false,talkmodalcommentId:0, talkmodalId:0, talkmodalDescript:"", talkmodalTitle:"", talkmodalGubun:""});
          this.talkInit();
        }).catch(error => {
          console.log(error);
          alert("서버와의 통신 에러가 발생하였습니다.");
          this.$router.push(this.$route.query.returnPath || '/error');
        })
      } else {
        talkcomment.delete(this.talkmodalId, this.talkmodalcommentId).then(data=>{
          this.$store.commit('talkList/SET_TALK_MODAL', {talkmodalShow:false,talkmodalcommentId:0, talkmodalId:0, talkmodalDescript:"", talkmodalTitle:"", talkmodalGubun:""});
          this.talkInit();
        }).catch(error => {
          console.log(error);
          alert("서버와의 통신 에러가 발생하였습니다.");
          this.$router.push(this.$route.query.returnPath || '/error');
        })
      }
    },
    talkInit(){
      this.$store.commit('talkList/SET_TALK_INIT');
      this.$store.dispatch('talkList/FETCH_TALK_READMORE',{product_id:this.id, product_name:this.name,brand_name:this.brand_name, category_large_name:this.category_large_name, category_middle_name:this.category_middle_name});
      this.descript = "";
      this.$store.commit('talkList/SET_TALK_ISLOADING', true);
      setTimeout(() => {
        this.$store.commit('talkList/SET_TALK_ISLOADING', false);
      }, 500);
    },
    listProduct(){
      this.$store.commit('ISLOADING', true);
      this.loading = true
      setTimeout(() => {
        product.detail(this.productId).then(data => {
          //만약에 없으면 금일 상품을 모두 선택했다는 메시지로 변경
          if(data.length > 0){
            this.product = data;
            this.product[0].name = this.product[0].name.substring(0,50);
            this.productflag = true;
          }
          else{
            this.productflag = false;
          }
          this.loading = false;
          this.$store.commit('ISLOADING', false);
        })
        .catch(error =>{
          console.log(error);
          alert("서버와의 통신 에러가 발생하였습니다.");
          this.$router.push(this.$route.query.returnPath || '/error');
        });
      }, 800)
    }
  }
}
</script>
<style>
.col-md-8 {
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 0px;
    padding-left: 0px;
}
.tabs_category{
  display:flex;
  width:50%;
  height:48px;
  overflow-x:scroll;
  white-space:nowrap;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  z-index: 1;
  padding:0;
  margin:0;
}
.tabs::-webkit-scrollbar  {
  width: 0 !important;
  height:0 !important;
}
.tabitem_category{
  font-size: 15px;
  font-weight: 700;
  color: #888;
  display:flex;
  background:white;
  align-items:center;
  justify-content:center;
  width:100%;
  cursor:pointer;

}
.tabitem_category.active{
  font-size: 15px;
  font-weight: 700;
  background:white;
  color: black;
}
.slider_category{
  height:2px;
  width:25%;
  background:black;
  transition:.5s ease;
}
.tabcontainer_category {
  height:480px;
  position: relative;
  min-height: 100%;
  width: 100%;
  z-index: 0;
  touch-action: pan-y !important;
}
.tabpane_category{
    width: 100%;
    align-items:center;
    justify-content:center;
}
.main_web_page{
  padding: 100px 0 53px;
  background: #fff;
}
.main_product_app_page{
  padding: 50px 0 53px;
  background: #fff;
}
</style>
