<template>
  <div>
    <div style="display: block; height:300px; margin: 0px auto; width:90%;"  v-if="tags.dynamicTags.length ==0">
    </div>
    <div v-else>
      <div style="margin-top:20px;">
        <el-tag
                  :key="tag"
                  v-for="tag in tags.dynamicTags"
                  size="small"
                  type="default"
                  :close-transition="false"
                  @close="handleClose(tag)"
                  style="background-color:black;">
              {{tag}}
        </el-tag>
      </div>
      <div>
        <div v-if="talkisLoading" style="width:100%; height:1024px; text-align: center;">
          <div style="display: inline-block; margin-top:150px;">
            <clip-loader :loading="talkisLoading" :color="'black'" :size="'50px'"></clip-loader>
          </div>
        </div>
        <div v-else>
          <div v-if="talk.length == 0">
            <div v-if="!talk_flag" class="login_button" style="text-align: center; width: 100%;height: 100%;">
              <div style="text-align:center;">
                <h4 style="font-weight: 900;margin: 30px;">
                  초스피드 회원가입으로 제일먼저 Talk를 남겨보세요!
                </h4>
              </div>
              <div style="text-align:center;">
                <button class="btn btn-github btn-lg" style="width:50%;" v-on:click="onLogin('/login')">
                  회원가입하기
                </button>
              </div>
            </div>
            <div v-else style="height: 40vh;">
              <h4 style="font-weight: 900; margin: 30px;">
                현재 Talk가 없습니다. 제일먼저 Talk를 남겨보세요!
              </h4>
            </div>

          </div>
          <div v-else>
            <div v-if="!talk_flag" class="login_button" style="text-align: center; width: 100%;height: 100%;">
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
            <div v-for="item in talk">
              <TalkCard v-bind:product_id = "item.product_id"
                        v-bind:talk_id = "item.talk_id"
                        v-bind:userid = "item.userid"
                        v-bind:product_name = "item.product_name"
                        v-bind:name = "item.name"
                        v-bind:descript = "item.descript"
                        v-bind:brand_naam = "item.brand_name"
                        v-bind:category_large = "item.category_large"
                        v-bind:category_middle = "item.category_middle"
                        v-bind:reg_dttm = "item.reg_dttm"
                        v-bind:img_url = "item.img_url"
                        v-bind:talk_like = "item.talk_like">
              </TalkCard>
            </div>
          </div>
        </div>
      </div>
    </div>
    <notifications group="alert" position="top center" style="margin-top: 40vh;"/>
  </div>
</template>
<script>
import {Select, Option, Tag} from 'element-ui';
import { talk } from '../../api'
import TalkCard from '../Card/TalkCard.vue'
import { mapState } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
export default{
  props:{
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
  data(){
    return{
      modalShow : false,
      tags: {
          dynamicTags: [ "#" + this.name,"#" + this.brand_name, "#" + this.category_middle_name,"#" + this.category_large_name],
          inputVisible: false,
          inputValue: ''
      },
      loading : true
    }
  },
  computed:{
    ...mapState('talkList',{
      talk : 'talk',
      talk_flag : 'talk_flag',
      talkisLoading : 'talkisLoading'
    })
  },
  created(){
    this.$store.commit('product/SET_PRODUCT_ID', this.id);
    this.$store.commit('product/SET_PRODUCT_NAME', this.name);
    this.$store.commit('product/SET_PRODUCT_BRANDNAME', this.brand_name);
    this.$store.commit('product/SET_PRODUCT_CATEGORY_LARGE', this.category_large_name);
    this.$store.commit('product/SET_PRODUCT_CATEGORY_MIDDLE', this.category_middle_name);

    this.$store.commit('talkList/SET_TALK_INIT');
    this.$store.commit('talkList/SET_TALK_ISLOADING', true);
    setTimeout(() => {
      this.$store.commit('talkList/SET_TALK_ISLOADING', false);
    }, 500);
    this.talklist(this.id, this.name, this.brand_name, this.category_large_name, this.category_middle_name);
  },
  components:{
    [Tag.name]: Tag,
    TalkCard,
    ClipLoader
  },
  methods:{
    onLogin(page){
      this.$store.commit('hereluxAll/SET_LOGINPATH', window.location.pathname);
      this.$router.push(page);
    },
    doWrite(){
      this.modalShow = true;
    },
    handleClose(tag) {
        this.tags.dynamicTags.splice(this.tags.dynamicTags.indexOf(tag), 1)
    },
    talklist(id, name, brand_name, category_large_name, category_middle_name){
      this.$store.dispatch('talkList/FETCH_TALK_READMORE',{product_id:id, product_name:name,brand_name:brand_name,
        category_large_name:category_large_name, category_middle_name:category_middle_name});
    }
  }
}
</script>
<style>
.edit_div{
  line-height: 1;
  color: #181818;
  width: 100%;
  height: inherit;
  background-color: white;
}
.comment_textarea{
  box-sizing: border-box;
  margin: 0;
  height: inherit;
  padding: 10px 10px 0px;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 7px;
  outline: 0;
  overflow: auto;
}

</style>
