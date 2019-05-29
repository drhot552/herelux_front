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
             :class="{active: tab.active}"
             style="width: 120px; text-align: center;">
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
      <div v-if="boardtype==0">
        <BoardCard v-bind:boardtype="boardtype">
        </BoardCard>
      </div>
      <div v-if="boardtype==1">
        <BoardCard v-bind:boardtype="boardtype">
        </BoardCard>
      </div>
      <div v-if="boardtype==2">
        <BoardCard v-bind:boardtype="boardtype">
        </BoardCard>
      </div>
      <div v-if="boardtype==3">
        <BoardCard  v-bind:boardtype="boardtype">
        </BoardCard>
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
import BoardCard from '../Card/BoardCard';
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
      BoardCard
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
        forum:[],
        title:'',
        modalShow:false,
        boardtype : 0
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
        this.boardtype = i;
        //초기화
        this.$store.commit('SET_INIT_BOARD', i);
        this.$store.dispatch('FETCH_BOARD_READMORE',{boardtype:this.boardtype});
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
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (this.value) {
          this.findAndActivateTab(this.value);
        }
      });

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
