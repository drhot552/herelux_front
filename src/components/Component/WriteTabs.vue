<template>
  <div>
    <div :class="
        [{'col-md-4': vertical && !tabNavWrapperClasses},
        {'col-12': centered && !tabNavWrapperClasses},
        tabNavWrapperClasses]"
        style="height:43px;">

      <ul class="nav"
          role="tablist"
          :class="
          [ tabTypeClass,
           {'nav-pills-icons': icons},
           {'nav-pills': pills},
           {'nav-tabs': !pills},
           {'flex-column': vertical},
           {'justify-content-center': centered},
           tabNavClasses
          ]"
          style="z-index:1;">

        <li v-for="(tab,i) in tabs"
            class="nav-item active"
            data-toggle="tab"
            role="tablist"
            aria-expanded="true"
            :key="tab.id">

          <a data-toggle="tab"
             role="tablist"
             :href="`#${tab.id}`"
             @click.prevent="activateTab(tab, i)"
             :aria-expanded="tab.active"
             class="nav-link"
             :class="{active: tab.active}">
            <tab-item-content :tab="tab">
            </tab-item-content>
          </a>

        </li>

      </ul>
    </div>
    <div class="tab-content"
         :class="['text-left', {'col-md-8': vertical && !tabContentClasses}, tabContentClasses]">
      <slot></slot>
    </div>
    <div>
      <div v-if="data==0">
        <WriteCard v-bind:id="0">
        </WriteCard>
      </div>
      <div v-if="data==1">
        <WriteCard v-bind:id="1">
        </WriteCard>
      </div>
      <div v-if="data==2">
        <WriteCard v-bind:id="2">
        </WriteCard>
      </div>
      <div v-if="data==3">
        <WriteCard  v-bind:id="3">
        </WriteCard>
      </div>
    </div>
    <modal :show.sync="modalShow" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up"></h4>
      <div class="modal-view">
        <div style="text-align:center; border-bottom:1px solid hsla(0,0%,53%,.3); padding:5px;" v-for="item in forum">
          <a v-on:click="forumSelect(item.minor_key, item.descript)">{{item.descript}}</a>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { code } from '../../api'
import Modal from '../Component/Modal';
import WriteCard from '../Card/WriteCard';
  export default {
    name: 'tabs',
    inheritAttrs: false,
    components: {
      TabItemContent: {
        props: ['tab'],
        render(h) {
          return h('div', [this.tab.$slots.label || this.tab.label])
        }
      },
      Modal,
      WriteCard
    },
    provide() {
      return {
        addTab: this.addTab,
        removeTab: this.removeTab
      }
    },
    props: {
      type: {
        type: String,
        default: 'default',
        validator: (value) => {
          let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger', 'default', 'neutral'];
          return acceptedValues.indexOf(value) !== -1
        }
      },
      activeTab: {
        type: String,
        default: ''
      },
      tabNavWrapperClasses: {
        type: [String, Object],
        default: ''
      },
      tabNavClasses: {
        type: [String, Object],
        default: ''
      },
      tabContentClasses: {
        type: [String, Object],
        default: ''
      },
      vertical: Boolean,
      noContentSpace: Boolean,
      icons: Boolean,
      centered: Boolean,
      value: String,
      pills: Boolean
    },
    data() {
      return {
        tabs: [],
        forum: [],
        modalShow:false,
        data: 0
      }
    },
    computed: {
      tabTypeClass(){
          let baseClass = this.pills ? 'pills': 'tabs';
          if(this.type){
            return `nav-${baseClass}-${this.type}`;
          }
          return ''
      }
    },
    methods: {
      findAndActivateTab(label){
        let tabToActivate = this.tabs.find(t=> t.label === label);
        if(tabToActivate){
          this.activateTab(tabToActivate);
        }

      },
      //탭 클릭했을 때
      activateTab(tab, i) {
        if (this.handleClick) {
          this.handleClick(tab)
        }
        this.deactivateTabs();
        tab.active = true;
        this.data = i;

        //탭 id 기억, 상단 포럼 및 카테고리 초기화
        this.$store.state.writeBoard_Category = i;
        this.$store.state.writeBoard_name = '';
        this.$store.state.writeBoard_image  = [];

        //탭누를때마다 해당 값은
        // i=0 브랜드 포럼 i=1 이거샀어
        if( i == 0 || i == 1 ) {
          //major_key가 0이면 브랜드포럼 1이면 상품포럼 코드값 세팅
          code.forum(i).then(result=>{
            if(result.length == 0){
                //server Error
            }
            else{
              this.forum = result;
              if(i == 0){
                this.$store.state.writeBoard_name = "포럼선택";
              }
              else{
                this.$store.state.writeBoard_name = "카테고리선택";
              }
              this.modalShow = true;
            }
          })
        }
        this.$emit('input', tab.label || tab.id);
      },
      deactivateTabs() {
        this.tabs.forEach(tab => {
          tab.active = false
        });
      },
      addTab(tab) {
        const index = this.$slots.default.indexOf(tab.$vnode)
        if (!this.activeTab && index === 0) {
          tab.active = true;
        }
        if (this.activeTab === tab.name) {
          tab.active = true
        }
        this.tabs.splice(index, 0, tab)
      },
      removeTab(tab) {
        const tabs = this.tabs
        const index = tabs.indexOf(tab)
        if (index > -1) {
          tabs.splice(index, 1)
        }
      },
      forumSelect(minor_key, name){
        this.$store.state.writeBoard_name = name;
        this.$store.state.writeBoard_forum = minor_key;
        this.modalShow = false;
      },
      onClose(){
        this.modalShow = false;
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (this.value) {
          this.findAndActivateTab(this.value);
        }
      });
      //처음 화면 접속시 Init -> 브랜드포럼 가장먼저 set
      code.forum(0).then(result=>{
        if(result.length == 0){

        }
        else{
          this.forum = result;
          this.$store.state.writeBoard_name = "포럼선택";
          this.modalShow = true;
          //this.$refs['modal-write'].show()
        }
      })
    },
    watch: {
      value(newVal) {
        this.findAndActivateTab(newVal);
      }
    }
  }
</script>
<style lang="scss" scoped>
@media screen and (max-width: 0){
  .nav-tabs{
    width:100%;
    padding-left:0px;
    padding-right:100px;
    text-align:center;
  }
}
.nav{
  display: -webkit-box;
}
.tab-list{
  padding-left:20px;
}
.modal-view{
  width: 100%;
  height: 200px;
  overflow-y: scroll;
}
ul {
  width:100%;
  overflow-x:scroll;
  white-space:nowrap;
}
li {
  display:inline-block;
}
</style>
