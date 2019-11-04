<template>
    <div class="wrapper" style="overflow:auto; -webkit-overflow-scrolling: touch; height:90vh;">
        <div class="page-header page-header-small">
            <parallax class="page-header-image"
                 style="background-image: url('/public/img/luxury.jpeg')">
            </parallax>
            <div class="content-center">
                <div class="row">
                    <div class="col-md-8 ml-auto mr-auto">
                        <h1 class="title">HERELUX</h1>
                        <h4>전 세계 모든 쇼핑몰들의 명품을 <p/>
                          한 곳에서 볼 수 있습니다.</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
          <div class="col-md-8 mr-auto ml-auto">
              <a v-on:click="appStore('https://apps.apple.com/kr/app/herelux/id1484441325')">
                <img src="/public/img/apple_app_store_herelux_btn.png" style="width:50%; float:left;"/>
              </a>
              <a v-on:click="appStore('https://play.google.com/store/apps/details?id=com.nabak.herelux')">
                <img src="/public/img/google_play_store_herelux_btn.png" style="width:50%;"/>
              </a>

          </div>
            <div class="about-description text-center">
                <div class="features-3" style="padding-top:0px;">
                    <div class="container">
                      <div class="row">

                      </div>
                        <div class="row">
                            <div class="col-md-8 mr-auto ml-auto">
                                <h2 class="title">E-commerce</h2>
                                <h4 class="description"></h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3" v-for="item in commerce">
                                <div class="info info-hover">
                                    <div class="icon icon-circle">
                                      <img v-lazy="item.logoimgurl" alt="..." class="img-raised" style="border-radius: 50%; margin-right: 5px;">
                                    </div>
                                    <h4 class="info-title">{{item.brands_name}}</h4>
                                    <p class="description"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="separator-line separator-primary"></div>
            <div class="projects-5">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 ml-auto mr-auto text-center">
                            <h4 class="title">지속적으로 전세계 쇼핑몰 명품 이벤트와 상품정보를 제공합니다.</h4>
                            <h4 class="description"></h4>
                            <div class="section-space"></div>
                        </div>
                    </div>
                    <div class="row">
                    <!--    <div class="col-md-5 ml-auto">
                          <info-section type="danger"
                                        icon="now-ui-icons users_single-02"
                                        title="E-commerce"
                                        description="국내/해외 대표 이커머스의 정보를 만나보세요"
                          />
                          <info-section type="danger"
                                        icon="now-ui-icons business_chart-pie-36"
                                        title="Luxury"
                                        description="매일 다양한 명품 정보를 만나보세요."
                          />
                        </div>
                        <div class="col-md-5 mr-auto">
                            <info-section type="danger"
                                          icon="now-ui-icons ui-2_chat-round"
                                          title="Product"
                                          description="각 온라인 매장마다 상품이벤트와 정보를 보여줍니다."
                            />

                            <info-section type="danger"
                                          icon="now-ui-icons arrows-1_refresh-69"
                                          title="Todays Pick"
                                          description="오늘의 명품 픽을 알 수 있습니다."
                            />
                        </div> -->
                    </div>
                    <hr/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import Button from '../Component/Button.vue';
  import InfoSection from '../Component/InfoSection.vue';
  import { Select, Option } from 'element-ui';
  import Card from '../Card/Cards.vue'

  export default {
    name: 'about-us',
    bodyClass: 'about-us',
    components: {
      Card,
      InfoSection,
      [Button.name]: Button,
      [Option.name]: Option,
    },
    created(){
      this.$http.get('http://54.180.120.131:4000/event').then((response)=>{
        this.commerce = response.data
      });
    },
    data() {
      return {
        commerce:[],
        form: {
          firstName: '',
          email: '',
          speciality: ''
        }
      }
    },
    methods:{
      appStore(url){
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
            window.webkit.messageHandlers.YOURMETHOD.postMessage(url.trim());
          }
          else{
            window.open(url, '_blank');
          }
        }
        else {
          window.open(url, '_blank');
        }
      }
    }
  }
</script>
<style>
</style>
