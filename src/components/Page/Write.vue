<template>
  <div class="section" style="padding:52px 0;">
    <div class="container">
        <tabs slot="raw-content">
              <tab-pane >
                  <template slot="label">
                       브랜드포럼
                  </template>
              </tab-pane>
              <tab-pane >
                  <template slot="label">
                       이거 샀어
                  </template>
              </tab-pane>
              <tab-pane >
                  <template slot="label">
                       뭐살까?
                  </template>
              </tab-pane>
              <tab-pane >
                  <template slot="label">
                       자유롭게
                  </template>
              </tab-pane>
        </tabs>
      </div>
  </div>
</template>
<script>
import Tabs from '../Component/WriteTabs';
import TabPane from '../Component/Tab';
export default{
  components:{
    Tabs,
    TabPane
  },
  created(){
    this.$store.state.writeBoard_forum = 0;
  }

}
</script>
<style>
</style>
