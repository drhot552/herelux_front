<template>
  <div>
    <div style="display: block; height:300px; margin: 0px auto; width:90%;"  v-if="productimg.length ==0">
    </div>
    <div style="margin-top:20px;" v-else>
      <el-tag
                :key="tag"
                v-for="(tag) in tags.dynamicTags"
                size="small"
                type="default"
                :close-transition="false"
                @close="handleClose(tag)"
                style="background-color:black;">

            {{tag}}
      </el-tag>
      <div class="container">
        <div v-for="item in productimg">
          <div style="margin-right:16px; margin-top: 15px;">
            <img v-lazy="item.url" class="lazy-img-fadein" style="width:50%;">
            </img>
            <div style="width:45%; float:right;">
              <h6>모델/상품번호 : {{sub_name}}</h6>
              <h6>상품 등록일 : {{reg_dttm}}</h6>
              <h5 style="font-size:1em">함께보면 좋은 상품</h5>
              <div v-if="recommendproduct.length > 0">
                <img v-lazy="recommendproduct[0].url" class="lazy-img-fadein"
                     style="width:45%; border-radius: 100px;"
                     v-on:click="productClick(recommendproduct[0].id)">
                </img>
                <img v-lazy="recommendproduct[1].url" class="lazy-img-fadein"
                     style="width:45%; float:right; border-radius: 100px;"
                      v-on:click="productClick(recommendproduct[1].id)">
                </img>
              </div>

            </div>

          </div>
        </div>


        <div style="border-bottom: 1px solid rgba(136, 136, 136, 0.3);margin-top:5px;" v-on:click="imgurlclick(detailbrand[0].url)">
          <div  align="left" style="margin-bottom:7px; margin-top:10px;">
            <b>이미지 더 보러가기 ></b>
          </div>
        </div>
      </div>
      <div align="left" style="margin-left:15px; margin-right:15px;">
        <ul v-for="(item,i) in detailbrand" class="brand ul_style" style="height:60px;">
         <li  v-bind:class="{ blur: !login_blur && i != 0 }" v-ripple class="li_style" v-on:click="detailClick(item.url, i)" style="height: 60px; position:relative; z-index:1001;" >
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
           <span v-if="i ==0" class="span_style_1">
             * 이미지출처
           </span>
         </li>
         <img src="/public/img/information.png" alt="..." class="info_avatar img-raised lazy-img-fadein" style="float:right; z-index:1002; position:relative; top:-45px;" v-on:click="stockalert(item.product_id, item.url, item.shopping_mall)">

         <div v-if="item.stock=='N'" style="height: 60px; width:100%; top:-60px; position: relative; background-color:rgba(0,0,0,0.1); z-index:5003;">

         </div>
       </ul>
       <div v-if="!login_blur" class="login_button" style="text-align: center; width: 100%;height: 100%;">
         <div style="text-align:center;">
           <h4 style="font-weight: 900;margin: 30px;">
             초스피드 회원가입으로 모든 정보를 보세요!
           </h4>
         </div>
         <div style="text-align:center;">
           <button class="btn btn-github btn-lg" style="width:50%;" v-on:click="onLogin('/login')">
             회원가입하기
           </button>
         </div>

       </div>
       <div  v-bind:class="{ blur: !login_blur }" align="left">
         <NaverShopCard v-bind:navershopserach="this.sub_name"
                        v-bind:navershopcategory_large="this.category_large_name"
                        v-bind:navershopbrand_name="this.brand_name"
                        v-bind:navershopcategory_middle="this.category_middle_name"
                        v-bind:login_blur="this.login_blur"></NaverShopCard>
       </div>
       <div  v-bind:class="{ blur: !login_blur }" align="left">
         <ElevenShopCard v-bind:elevenshopserach="this.sub_name"
                        v-bind:elevenshopcategory_large="this.category_large_name"
                        v-bind:elevenshopbrand_name="this.brand_name"
                        v-bind:elevenshopcategory_middle="this.category_middle_name"
                        v-bind:login_blur="this.login_blur"></ElevenShopCard>
       </div>

       <div v-bind:class="{ blur: !login_blur }" align="left" style="border-bottom: 3px solid rgb(0,0,0);">
         <div style="padding-top : 10px">
           <Adsense v-bind:slot="7644074545"></Adsense>
         </div>
       </div>
       <div  v-bind:class="{ blur: !login_blur }" id="collapse">
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
     <div v-bind:class="{ blur: !login_blur }" align="left" style="margin-left:15px; margin-right:15px; border-top: 3px solid rgb(0,0,0); padding-top:10px;"></div>
     <div v-bind:class="{ blur: !login_blur }" style="height:50px; text-align:left;">
       <span style="float: left; margin-left: 15px; margin-right: 15px; font-size:13px; color:rgb(136, 136, 136);"> * 가격과 사이트 주소는 판매 사이트의 사정으로 변동이 생길 수 있습니다.</span>
       <br />
       <span style="float: left; margin-left: 15px; margin-right: 15px; font-size:13px; color:rgb(136, 136, 136);"> * 음영 처리된 상품은 일시 품절 상품입니다.</span>
     </div>
    </div>

    <!-- 관련 카테고리 상품 select -->
    <div v-bind:class="{ blur: !login_blur }" lign="left" style="margin-top: 50px;margin-left:15px; margin-right:15px;">
      <h5>
        같은 카테고리 추천 아이템
      </h5>
    </div>
    <div v-bind:class="{ blur: !login_blur }" style="padding-right:15px; padding-left:15px;">
      <div class="row" style="margin-bottom: 50px;">
        <div class="div_style" v-for="item in sameCategory">
          <div v-ripple class="in" v-on:click="productClick(item.id)">
            <img class="lazy-img-fadein"  v-lazy="item.url" alt="..." >
              <div class="lazy-img-fadein" v-lazy:background-image="item.url"></div>
              <h6 class="product_name"> <br /> {{item.name}} </h6>
              <h6> <b>{{item.price}}</b> </h6>
          </div>
        </div>
      </div>
    </div>
    <!-- 관련브랜드 상품 select -->
    <div v-bind:class="{ blur: !login_blur }" align="left" style="margin-top: 50px;margin-left:15px; margin-right:15px;">
      <h5>
        같은 브랜드 추천 아이템
      </h5>
    </div>
    <div v-bind:class="{ blur: !login_blur }" style="padding-right:15px; padding-left:15px;">
      <div class="row" style="margin-bottom: 50px;">
        <div class="div_style" v-for="item in sameBrand">
          <div v-ripple class="in" v-on:click="productClick(item.id)">
            <img class="lazy-img-fadein"  v-lazy="item.url" alt="..." >
              <div class="lazy-img-fadein" v-lazy:background-image="item.url"></div>
              <h6 class="product_name"> <br /> {{item.name}} </h6>
              <h6> <b>{{item.price}}</b> </h6>
          </div>
        </div>
      </div>
    </div>

    <div style="height:20vh;">

    </div>
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
import { product,callback } from '../../api'
import {Select, Option, Tag} from 'element-ui';
import Collapse from '../Component/Collapse'
import Adsense from '../Component/Adsense'
import Modal from '../Component/Modal'
import NaverShopCard from '../Card/NaverShopCard'
import ElevenShopCard from '../Card/ElevenShopCard'
import CollapseItem from '../Component/CollapseItem'

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
    brand : Number,
    brand_name : String,
    category_middle_name : String,
    category_large_name : String
  },
  components:{
    Collapse,
    CollapseItem,
    Adsense,
    Modal,
    NaverShopCard,
    ElevenShopCard,
    [Tag.name]: Tag,
  },
  data(){
    return{
        productimg:[],
        sameBrand:[],
        sameCategory:[],
        recommendproduct:[],
        loading:false,
        avg : 0,
        detailbrand : [],
        userId : '',
        shopping_mall : 0,
        url : "",
        productId : 0,
        title : "",
        descript:"",
        modalShow: false,
        returnPath : '',
        login_blur : false,
        likeFlag : false,
        tags: {
            dynamicTags: [ "#" + this.name,"#" + this.brand_name, "#" + this.category_middle_name,"#" + this.category_large_name],
            inputVisible: false,
            inputValue: ''
        }
      }
  },
  created(){
    this.userId = localStorage.getItem('id');

    //상품의 view를 증가시킨다
    product.productview(this.id).then(data=>{
      if(data == 500){
        this.errorAlert();
      }
    }).catch(error=>{
      this.errorAlert();
    })

    //로그인인지 아닌지 판별
    if(this.userId){
      this.login_blur = true;
      product.productcnt(this.userId, this.id).then(data =>{
        if(data == 500){
          this.errorAlert();
        }
      }).catch(error =>{
        this.errorAlert();
      });
      product.productlovechk(this.userId, this.id).then(data =>{
        if(data == 500){
          this.errorAlert();
        } else if(data.length > 0){
          this.likeFlag = true;
        }
      }).catch(error =>{
        this.errorAlert();
      });
    } else {
      this.login_blur = false;
    }
    this.$store.commit('ISLOADING', true);
    //상품상세 조회
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

    //같은 브랜드 검색
    product.samebrand(this.brand).then(data=>{
      this.sameBrand = data
    }).catch(error =>{
      this.errorAlert()
    })

    //추천상품 두개
    product.productrecommend(this.category_middle).then(data=>{
      this.recommendproduct = data
    }).catch(error =>{
      this.errorAlert()
    })

    //카테고리별 분류
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
   onLogin(page){
     this.$store.commit('hereluxAll/SET_LOGINPATH', window.location.pathname);
     this.$router.push(page);
   },
   imgurlclick(url){
     if(this.userId){
       if(url != null){
         gtag('event','이미지더보기클릭',{'event_category':'이미지더보기','event_label':this.name});
         this.$store.commit('hereluxAll/SET_PAGEMOVEURL', url);
         setTimeout(() => {
           this.$router.push('/pagemove');
         }, 200);
       }
     }

   },
   detailClick(url, i){
     if(this.login_blur){
       gtag('event','상품상세클릭',{'event_label':url});
       this.$store.commit('hereluxAll/SET_PAGEMOVEURL', url);
       setTimeout(() => {
         this.$router.push('/pagemove');
       }, 200);
     } else {
       if(i == 0){
         gtag('event','상품상세클릭',{'event_label':url});
         this.$store.commit('hereluxAll/SET_PAGEMOVEURL', url);
         setTimeout(() => {
           this.$router.push('/pagemove');
         }, 200);
       }
     }

   },
   listImage(){
     product.select(this.id)
       .then(data => {
         this.productimg = data;
       })
       .catch(error =>{
         console.log(error)
         this.errorAlert();
       });
   },
   errorAlert(){
     this.$router.push(this.$route.query.returnPath || '/error');
   },
   productClick(id){
     if(this.login_blur){
       this.returnPath = this.$route.query.returnPath || '/detail'

       this.$store.commit('hereluxAll/SET_PRODUCTDETAIL_NAME', 'home');
       this.returnPath = this.returnPath +'/' + id + '/home'
       setTimeout(() => {
         this.$router.push(this.returnPath)
       }, 300);
     }

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
.div_style{
  width: 50%;
  margin-bottom: 20px;
}
.product_name {
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.in {
  width: 100%;
  text-align: center;
}
.blur {
  filter: blur(6px);
}

.login_button {
  border-radius: 50px;
  background-color: rgba(255,255,255,0.8);
  display: block;
  border: none;
  z-index :5000;
}
</style>
