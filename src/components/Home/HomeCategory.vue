<template>
    <div>
      <div style="padding-left: 50px; padding-right: 50px; text-align: center;">
        <h4 style="margin-top: 0px; margin-bottom: 10px; font-weight: 700; font-size: 1.8em;">
          Popular Categories
        </h4>
        <h5 style="font-weight: 400; font-size: 1em;">
          Herelux 사용자들이 자주 찾는 카테고리
        </h5>
      </div>

      <div v-if="this.category.length > 0" class="row" style="margin-top: 20px; margin-bottom:60px; margin-left: 10px; margin-right: 10px;">
        <article class="div_style_home" v-for="item in category">
          <div class="in">
            <a style="color:#000000;" v-on:click="detail(item.descript)">
              <img v-lazy="item.url" class="lazy-img-fadein"  style="width: 100px; height: 100px;" alt="..." />
              <h6 style="font-weight:700; margin-top:10px;">{{item.descript}}</h6>
            </a>
          </div>
        </article>
      </div>
    </div>
</template>
<script>
import { search } from '../../api'
export default{
  data(){
    return{
        category:[],
        returnPath:''
    }
  },
  created(){
    search.category().then(data=>{
      this.category = data;
    }).catch(error=>{

    })
  },
  methods:{
    detail(searchWord){
      this.$router.push(this.$route.query.returnPath || '/search/page-' + searchWord);
    }
  }
}
</script>
<style>
</style>
