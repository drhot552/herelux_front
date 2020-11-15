<template>
  <div class="contactus-1 section-image" v-bind:class="{ main_web_page: webFlag, main_app_page: !webFlag }" style="background-image: url('/public/img/luxury.jpeg')">
      <div class="container">
          <div class="row">
              <div class="col-md-5">
                  <h2 class="title">Contact</h2>
                  <h4 class="description">HERELUX에 다양한 의견을 보내주세요.</h4>

                  <info-section type="primary"
                                icon="now-ui-icons ui-1_email-85">
                      <h4 class="info-title">Email</h4>
                      <p class="description"> Nabak & Smartna
                          <br> hereluxury@gmail.com
                          <br> Am09:00 ~ pm06:00
                      </p>
                  </info-section>
                  <info-section type="primary"
                                icon="now-ui-icons tech_mobile">
                      <h4 class="info-title">Instagram</h4>
                      <p class="description">
                        <a style="color:hsla(0,0%,100%,.8);" href="https://www.instagram.com/herelux/">HereLux</a>

                      </p>
                  </info-section>
                  <info-section type="primary"
                                icon="now-ui-icons ui-1_check">
                      <h4 class="info-title">
                        <a style="color:#ffffff;" href="/License">License </a>
                      </h4>
                  </info-section>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Button from '../Component/Button.vue';
import InfoSection from '../Component/InfoSection.vue';
import FormGroupInput from '../Component/formGroupInput.vue';
import { Select, Option } from 'element-ui';
import { mapState } from 'vuex'

export default{
  components: {
    InfoSection,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  computed:{
    ...mapState('hereluxAll', {
      webFlag: 'webFlag'
    })
  }
}
</script>

<style>
.main_web_page{
  padding: 100px 0 53px;
  background: #fff;
}
.main_app_page{
  padding: 70px 0 53px;
  background: #fff;
}
</style>
