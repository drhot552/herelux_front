<template>
  <div class="card card-plain">
  <div v-if="productflag">
   <carousel :per-page="1"  :mouse-drag="true"  :navigation-next-label="`>`"
              :navigation-prev-label="`<`" :pagination-position="`top-overlay`"	:navigation-enabled="true" :pagination-padding="2"
              :minSwipeDistance="30">
     <slide v-for="item in productimg">
       <div v-if="loading" style="width:100%; height:100%; text-align: center;">
         <div style="display: inline-block; margin-top:150px;">
           <beat-loader :loading="loading" :color="'#888888'"></beat-loader>
         </div>
       </div>
       <div v-else>
         <images v-bind:img_url="item.url">
         </images>
      </div>
    </slide>
   </carousel>
   <div v-if="loading" style="width:100%; height:100%; text-align: center;">

   </div>
   <div v-else>
     <div align="left" style="margin-left:15px; margin-right:15px; margin-top:0px;">
       <div style="border-bottom: 3px solid rgb(0,0,0);">
         <h5>
             {{name}}
         </h5>
         <a style="margin-top:10px; float:right; width:6%;" v-on:click="doCopy()">
           <img src="/public/img/btn_share.png"/>
        </a>
       </div>
       <h5 style="margin-bottom: 15px;">가격 : {{price}}</h5>
       <ul v-for="(item,i) in detailbrand" class="brand ul_style">
        <li v-ripple class="li_style" style="height: 60px; position:relative; z-index:1001;" >
          <div v-on:click="detailClick(item.url)" >
            <img v-lazy="item.logoimgurl" alt="..." class="avatar img-raised lazy-img-fadein" style="float:left;">
            <span class="span_style">
              >
            </span>
            <span v-if="item.stock=='Y'" class="span_style">
              {{item.price}} {{item.price_symbol}}
            </span>
            <span v-else class="span_style" style="color:#808080;">
              {{item.price}} {{item.price_symbol}}
            </span>

          </div>
          <img src="/public/img/information.png" alt="..." class="info_avatar img-raised lazy-img-fadein" style="float:right; z-index:5002;" v-on:click="stockalert(item.product_id, item.url, item.shopping_mall)">
          <span v-if="i ==0" class="span_style_1">
            * 이미지출처
          </span>
        </li>
        <div v-if="item.stock=='N'" style="height: 60px; width:100%; top:-60px; position: relative; background-color:rgba(0,0,0,0.1); z-index:5003;">

        </div>
      </ul>
      <div align="left" style="border-bottom: 3px solid rgb(0,0,0);">
        <div style="padding-top : 10px">
          <Adsense
              data-ad-client="ca-pub-4141026730478876"
              data-ad-slot="6033471797">
          </Adsense>
        </div>
      </div>
      <div id="collapse">
          <div class="row">
              <div class="col-md-12">
                  <collapse>
                      <collapse-item title="상품정보">
                        <h6 v-if="avg > 0">평균점수 {{avg}} 점 </h6>
                        <h6 v-else >평균점수 투표 전 </h6>
                        <h6>크기 : {{size}}</h6>
                        <h6>색상 : {{color}}</h6>
                        <h6>모델/상품번호 : {{sub_name}}</h6>
                        <h6>상품 등록일 : {{reg_dttm}}</h6>
                      </collapse-item>
                  </collapse>
              </div>
          </div>
      </div>
       <h6></h6>
     </div>
     <div align="left" style="margin-left:15px; margin-right:15px; border-top: 3px solid rgb(0,0,0); padding-top:10px;"></div>
  <!--   <div align="left" style="margin-left:15px; margin-right:15px;">
       <div style="border-top: 3px solid rgb(0,0,0); padding-top : 10px">
         <adfit-banner
         v-on:ad-loaded
         v-on:ad-failed
         data-ad-test="N"
         data-ad-unit="DAN-u88h76y8h7w2">
         </adfit-banner>
       </div>
     </div>-->
    <div style="height:50px; text-align:left;">
      <span style="float: left; margin-left: 15px; margin-right: 15px; font-size:13px; color:rgb(136, 136, 136);"> * 가격과 사이트 주소는 판매 사이트의 사정으로 변동이 생길 수 있습니다.</span>
      <br />
      <span style="float: left; margin-left: 15px; margin-right: 15px; font-size:13px; color:rgb(136, 136, 136);"> * 음영 처리된 상품은 일시 품절 상품입니다.</span>
    </div>
    <!-- 관련 카테고리 상품 select -->
    <div align="left" style="margin-top: 50px;margin-left:15px; margin-right:15px;">
      <h5>
        같은 카테고리 추천 아이템
      </h5>
    </div>
    <div style="white-space:nowrap; overflow:auto;  width:100%; display: flex;">
      <div style="display: block; margin: 0px auto; width:90%;" v-for="item in sameCategory">
        <div style="width:150px; margin-right:15px;" v-ripple v-on:click="productClick(item.id)">
          <div>
            <img class="lazy-img-fadein" v-lazy="item.url"/>
          </div>
          <div style="text-align:center;">
            <h6 class="detail_product_name" style="margin-top:10px;">
              {{item.name}}
            </h6>
            <h6 style="font-weight:700;">
              {{item.price}}
            </h6>
          </div>
        </div>
      </div>
    </div>
    <!-- 관련브랜드 상품 select -->
    <div align="left" style="margin-top: 50px;margin-left:15px; margin-right:15px;">
      <h5>
        같은 브랜드 추천 아이템
      </h5>
    </div>
    <div style="white-space:nowrap; overflow:auto;  width:100%; display: flex;">
      <div style="display: block; margin: 0px auto; width:90%;" v-for="item in sameBrand">
        <div style="width:150px; margin-right:15px;" v-ripple v-on:click="productClick(item.id)">
          <div>
            <img class="lazy-img-fadein" v-lazy="item.url"/>
          </div>
          <div style="text-align:center;">
            <h6 class="detail_product_name" style="margin-top:10px;">
              {{item.name}}
            </h6>
            <h6 style="font-weight:700;">
              {{item.price}}
            </h6>
          </div>
        </div>
      </div>
    </div>
    <div style="height:50px;">

    </div>
   </div>
 </div>
 <notifications group="alert" position="top center" style="margin-top: 40vh;"/>
 <modal :show.sync="modalShow" headerClasses="justify-content-center">
   <h4 slot="header" class="title title-up">{{title}}</h4>
   <p>{{descript}}</p>
   <template slot="footer" class="justify-content-center">
     <button class="btn btn-secondary" v-on:click="onClose()">Close</button>
     <button class="btn btn-primary" v-on:click="handleOk()">Ok</button>
   </template>
 </modal>
</div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import Collapse from '../Component/Collapse'
import CollapseItem from '../Component/CollapseItem'
import Images from './Images'
import Modal from '../Component/Modal';
import { product } from '../../api'
import Cauly from '../Card/Cauly'

export default {
    props: {
      id: Number,
      name:String,
      size:String,
      color:String,
      price: String,
      star : Number,
      count : Number,
      sub_name : String,
      reg_dttm : String,
      category_large : Number,
      category_middle : Number,
      brand : Number
    },
    data(){
      return{
        productimg:[],
        sameBrand:[],
        sameCategory:[],
        loading:false,
        productflag : true,
        avg : 0,
        detailbrand : [],
        userId : '',
        shopping_mall : 0,
        url : "",
        productId : 0,
        title : "",
        descript:"",
        modalShow: false,
        returnPath : ''
      }
    },
    components:{
      Carousel,
      Slide,
      Images,
      Cauly,
      Collapse,
      CollapseItem,
      Modal
    },
    created(){
      this.avg = this.star / this.count;
      this.avg = this.avg.toFixed(2);
      this.userId = localStorage.getItem('id');
      //로그인한  경우 count 체크
      if(this.userId){
        product.productcnt(this.userId, this.id).then(data =>{
          if(data == 500){
            this.errorAlert();
          }
        }).catch(error =>{
          this.errorAlert();
        });
      }

      this.$store.commit('ISLOADING', true);
      product.detailbrand(this.id)
        .then(data => {
          this.detailbrand = data;
          this.$store.commit('ISLOADING', false);
        })
        .catch(error =>{
          console.log(error)
          this.errorAlert();
        });
      this.listImage();

      product.samebrand(this.brand).then(data=>{
        this.sameBrand = data
      }).catch(error =>{
        this.errorAlert()
      })
      //large
      if(this.category_middle == -1){
        product.samecategory(this.category_large, 1).then(data=>{
          this.sameCategory = data
        }).catch(error =>{
          this.errorAlert()
        })
      } else {
        product.samecategory(this.category_middle, 2).then(data=>{
          this.sameCategory = data
        }).catch(error =>{
          this.errorAlert()
        })
      }

   },
   methods:{
     listImage(){
       this.$store.commit('ISLOADING', true);
       product.select(this.id)
         .then(data => {
           this.productimg = data;
           this.$store.commit('ISLOADING', false);
         })
         .catch(error =>{
           console.log(error)
           this.errorAlert();
         });
     },
     fetchData(){
       this.loading = true
       setTimeout(() => {
         this.loading=false
       }, 500)
     },
     detailClick(url){
       setTimeout(() => {
         if(navigator.userAgent.match(/Android|Tablet/i)){
           if(navigator.userAgent.match(/herelux_app_and/i)){
             window.android.bridge(url);
           }
           else{
             window.open(url, '_blank');
           }
         }
         else if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
           if(navigator.userAgent.match(/herelux_app_ios/i)){
             window.webkit.messageHandlers.YOURMETHOD.postMessage('url_herelux|'+url.trim());
           }
           else{
             window.open(url, '_blank');
           }
         }
         else {
           window.open(url, '_blank');
         }
       }, 200);
     },
     errorAlert(){
       this.$router.push(this.$route.query.returnPath || '/error');
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
      stockalert(id, url, shopping_mall){
        this.productId = id
        this.url = url
        this.shopping_mall = shopping_mall

        this.title = "신고확인"
        this.descript = "신고하시겠습니까?"
        this.modalFlag = 0
        this.modalShow = true;

      },
      handleOk(){
        if(this.modalFlag == 0){
          if(this.userId){
            this.modalShow = false;
            product.productout(this.productId, this.userId, this.url, this.shopping_mall, "품절").then(data =>{
              if(data == 300){
                this.$notify({
                   group: 'alert',
                   title: '이미 신고하셨습니다.',
                   duration: 500
                 });
              } else if(data == 200){
                this.$notify({
                   group: 'alert',
                   title: '품절 신고되었습니다.',
                   duration: 500
                 });
              } else {

              }
            }).catch(error =>{

            });
          } else {
            //로그인 유도
            this.title = "로그인 확인"
            this.descript = "로그인 후 신고가능합니다. 로그인 하시겠습니까?"
            this.modalShow = true;
          }
        } else {
          this.modalShow = false;
          this.$router.push(this.$route.query.returnPath || '/login')
        }

      },
      onClose(){
        this.modalShow = false;
      },
      productClick(id){
        this.returnPath = this.$route.query.returnPath || '/detail'
        this.$store.state.productDetail_name = 'home'
        this.returnPath = this.returnPath +'/' + id + '/home'
        setTimeout(() => {
          this.$router.push(this.returnPath)
        }, 300);
      }
   }

  }
</script>
<style>
.avatar {
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 5px;
}
.info_avatar {
    width: 20px;
    height: 20px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 5px;
}
.brand {
  width: 100%;
  text-align: left;
  margin-left: 15px;
  margin-bottom: 15px;
}
.ul_style {
    list-style: none;
    padding: 0;
    max-width: 100%;
    margin: 0;
    height: 60px;
}
.li_style{
  color: #888;
    text-align: left;
    padding: 12px 0;
    border-bottom: 1px solid hsla(0,0%,53%,.3);
}
.div_style_1{
  float: left;
  width: 10%;
}
.div_style_2{
  float: left;
  width: 55%;
}
.span_style{
    float: left;
    width: 30%;
    text-align: center;
    font-size: 0.9em;
    color: black;
}
.span_style_1{
  text-align: right;
  font-size: 0.81em;
}
.vue-notification {
  padding: 10px;
  margin: 0 5px 5px;

  font-size: 11px;

  color: #ffffff;
  background: black;
  border-left: 5px solid black;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #E54D42;
    border-left-color: #B82E24;
  }

  &.success {
    background: #68CD86;
    border-left-color: #42A85F;
  }
}
.lazy-img-fadein[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
}
.detail_product_name {
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
