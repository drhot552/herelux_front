<template>
    <div class="section" style="padding:51px 0;">
      <div class="container" style="padding-left:0px; padding-right:0px;">
        <tabs slot="raw-content" tab-content-classes="tab-content-padding">
              <tab-pane >
                  <template slot="label">
                       전체
                  </template>
                  <h5 style="margin-top:0px;">
                      전체랭킹
                  </h5>
              </tab-pane>
              <tab-pane v-for="item in category">
                  <template slot="label">
                       {{item.descript}}
                  </template>
                  <h5 style="margin-top:0px;">
                      {{item.descript}}
                  </h5>
              </tab-pane>
          </tabs>
      </div>
    </div>
</template>
<script>
import Tabs from '../Component/Tabs';
import TabPane from '../Component/Tab';
import { mapState } from 'vuex'
import { code } from '../../api'

export default {
    components: {
        Tabs,
        TabPane

    },
    data(){
      return{
        category:[]
      }
    },
    //mapstate를 통한 상태관리
    computed:{
      ...mapState([
        'product',
        'idx',
        'category'
      ])
    },
    created(){
      //category_type
      this.$store.commit('SET_INIT', 0);
      code.category(1).then(data=>{
        if(data.length == 0){

        }
        else{
          this.category = data;
        }
      })
    }
}
</script>
<style>
.tab-content.tab-content-padding {
    padding-top: 20px;
    padding-left: 20px;

}

</style>
