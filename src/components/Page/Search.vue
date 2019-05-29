<template>
  <div class="section" style="padding: 53px 0 53px;">
    <div class="navbar navbar-expand-lg bg-white" style="position: fixed;width: 100%;">
      <div class="edit_div">
        <div class="container" style="padding-right:0px; padding-left:0px;">
          <div class="search_textarea"  contenteditable="true" id="search" placeholder="검색어를 입력하세요." style="width: 100%; max-height: 35px; height: 30px; float:left;">

          </div>
        </div>
      </div>
    </div>
    <div class="container" style="padding-left:0px; padding-right:0px; padding-top:50px;">
        <tabs slot="raw-content">
              <tab-pane >
                  <template slot="label">
                       상품
                  </template>
              </tab-pane>
              <tab-pane >
                  <template slot="label">
                       브랜드
                  </template>
              </tab-pane>
              <tab-pane >
                  <template slot="label">
                       게시판
                  </template>
              </tab-pane>
        </tabs>
      </div>
  </div>
</template>
<script>
import Tabs from '../Component/SearchTab';
import TabPane from '../Component/Tab';
export default{
  components:{
    Tabs,
    TabPane
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
</style>
