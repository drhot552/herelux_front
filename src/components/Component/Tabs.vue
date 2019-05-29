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
          style="z-index:1; border-bottom: 0px;">

        <li v-for="(tab,i) in tabs"
            class="nav-item active"
            data-toggle="tab"
            role="tablist"
            aria-expanded="true"
            :key="tab.id">

          <a data-toggle="tab"
             role="tablist"
             :href="`#${tab.id}`"
             @click.prevent="activateTab(tab,i)"
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
    <div style="text-align:right; margin-right:30px;">
      <a v-if="this.$store.state.category <= 5" v-on:click="popup()">
        <img src="/public/img/btn_filter.png" style="height:18px;"/>
        <b>필터링</b>
      </a>
    </div>
    <div>
      <RankingCard v-bind:category_type="category_type">
      </RankingCard>
    </div>
    <modal :show.sync="modalShow" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up"></h4>
      <div class="modal-view">
        <div style="text-align:center; border-bottom:1px solid hsla(0,0%,53%,.3); padding:5px;" v-for="item in category_middle">
          <a v-on:click="categorySelect(item.minor_key)">{{item.descript}}</a>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import RankingCard from '../Card/RankingCard';
import { code, product } from '../../api'
import Modal from '../Component/Modal';
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
      RankingCard,
      Modal
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
        data: 0,
        category_middle:[],
        category_type : 1,
        idx : 0,
        modalShow: false
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
          this.activateTab(tabToActivate,0);
        }
      },
      activateTab(tab,i ) {
        //탭 클릭했을 때
        if (this.handleClick) {
          this.handleClick(tab)
        }
        this.deactivateTabs();
        tab.active = true;
        this.data = i;
        if(i <= 1){
          this.$store.state.rankTabStatus = i * 2;
        } else{
          this.$store.state.rankTabStatus = i + 1;
        }
        //store 값 i로 set
        this.$store.commit('SET_INIT', i);
        // 카테고리 타입이 1이면 대 카테고리로 set한다
        this.category_type  = 1;
        this.$store.dispatch('FETCH_RANK_READMORE',{category_type:this.category_type, category:this.$store.state.rankTabStatus});

        this.$emit('input', tab.label || tab.id);
      },
      deactivateTabs() {
        this.tabs.forEach(tab => {
          tab.active = false
        });
      },
      addTab(tab) {
        const index = this.$slots.default.indexOf(tab.$vnode)

        if (!this.activeTab && index === this.$store.state.rankTabStatus) {
          console.log("tabs index", index);
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
      popup(){
        //category key = 1
        var idx = 0;
        if(this.data != 0){
          idx = (this.data * 10) + 1;
        }
        else
        {
          idx = 99;
        }
        code.category(idx).then(result=>{
          if(result.length == 0){

          }
          else{
            this.category_middle = result;
            console.log(this.data);
            this.modalShow = true;
          //  this.$refs['modal-category'].show()
          }
        })
      },
      categorySelect(key){
        // 카테고리 타입이 2이면 부카테고리로 set한다
        this.category_type = 2;
        this.$store.commit('SET_INIT', key);
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
  height:47px;
  overflow-x:scroll;
  white-space:nowrap;
  position:fixed;
}
li {
  display:inline-block;
}
</style>
