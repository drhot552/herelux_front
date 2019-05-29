<template>
    <nav :class="classes" class="navbar">
        <div class="container" style="padding-right:0px; padding-left:0px;">
            <div class="navbar-translate">
                <slot v-bind="slotData"></slot>
                <div style="text-align:right; width:100%;">
                  <router-link to="/search">
                    <img src="/public/img/btn_search.png" style="height:20px;"/>
                  </router-link>
                </div>
                <navbar-toggle-button :toggled="showMenu" @click.native.stop="toggle"></navbar-toggle-button>
            </div>
            <div class="collapse navbar-collapse show"
                 v-if="$slots['navbar-menu'] || $scopedSlots['navbar-menu']"
                 id="navigation">
                 <div align="left" class="row login">
                   <router-link style="color:#000000; margin-top:4px;" to="/login">
                     <div style="float:left;">
                       <img src="/public/img/btn_login.png" style="height:29px;"/>
                     </div>
                     <div style="float:left; margin-left:20px; margin-top:1px;">
                       <span v-if="userId">
                           {{this.userId}}
                       </span>
                       <span v-else>
                            로그인
                       </span>
                     </div>
                  </router-link>
                 </div>
                <ul class="navbar-nav" :class="menuClasses" v-click-outside="close">
                    <slot name="navbar-menu" v-bind="slotData"></slot>
                </ul>
                <div v-if="userId" align="right" class="row logout">
                  <a style="color:#000000;" v-on:click="logout()">
                    <div style="float:left;">
                      <img src="/public/img/btn_logout.png" style="height:29px;"/>
                    </div>
                    <div style="float:left; margin-left:10px; margin-top:1px;">
                      <span>
                          로그아웃
                      </span>
                    </div>
                 </a>
                </div>
            </div>
        </div>
        <modal :show.sync="modalShow" headerClasses="justify-content-center">
          <h4 slot="header" class="title title-up">{{title}}</h4>
          <p>{{descript}}</p>
          <template slot="footer" class="justify-content-center">
            <button class="btn btn-secondary" v-on:click="onClose()">Close</button>
            <button class="btn btn-primary" v-on:click="handleOk()">Ok</button>
          </template>
        </modal>
        <!--
        <b-modal id="modal-logout" centered v-bind:title="title" @ok="handleOk">
          {{descript}}
        </b-modal>
        -->
    </nav>
</template>
<script>
  import NavbarToggleButton from './NavbarToggleButton';
  import Modal from '../Component/Modal';
  let resizeTimeout;
  function resizeThrottler(actualResizeHandler) {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        actualResizeHandler();

        // The actualResizeHandler will execute at a rate of 15fps
      }, 66);
    }
  }

  export default {
    name: 'navbar',
    props: {
      transparent: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: 'relative'
      },
      menuClasses: {
        type: [String, Object, Array]
      },
      colorOnScroll: {
        type: Number,
        default: 0
      },
      type: {
        type: String,
        default: 'white',
        validator(value) {
          return ['white', 'default', 'primary', 'danger', 'success', 'warning', 'info'].includes(value);
        }
      },
    },
    provide() {
      return {
        close: this.close
      }
    },
    components: {
      NavbarToggleButton,
      Modal
    },
    data() {
      return {
        showMenu: false,
        extraNavClasses: '',
        currentScrollValue: 0,
        userId:'',
        title:'',
        descript:'',
        flag:false,
        modalShow:false
      }
    },
    computed: {
      slotData(){
        return {
          toggle: this.toggle,
          open: this.open,
          close: this.close,
          isToggled: this.showMenu
        }
      },
      classes() {
        let color = `bg-${this.type}`;
        let navPosition = `navbar-${this.position}`;
        let colorOnScrollTransparent = this.colorOnScroll && this.currentScrollValue < this.colorOnScroll;

        if (this.position === 'fixed') {
          navPosition = 'fixed-top';
        }
        if (this.position === 'bottom') {
          navPosition = 'fixed-bottom';
        }

        return [
          { 'navbar-transparent': (this.transparent || colorOnScrollTransparent) },
          { [color]: (!this.transparent && this.colorOnScroll === 0) },
          navPosition, this.extraNavClasses]
      }
    },
    methods: {
      setNav(value){
        let docClasess = document.body.classList;
        if(value){
          docClasess.add('nav-open')
        } else {
          docClasess.remove('nav-open')
        }
        let isOpen = docClasess.contains('nav-open');
        let eventToTrigger = isOpen ? 'open' : 'close';
        this.showMenu = isOpen;
        this.$emit(eventToTrigger)
      },
      toggle() {
        console.log("toggle");
        this.userId = localStorage.getItem('id')
        this.setNav(!this.showMenu)
      },
      open(){
        console.log("open");
        this.setNav(true);
      },
      close(){
        console.log("close");
        //로그아웃 플래그
        if(this.flag){
          //this.$root.$emit('bv::hide::modal','modal-logout', '#btnShow')
          localStorage.clear();
          this.$router.push(this.$route.query.returnPath || '/login')
          this.flag = false
          this.modalShow = false
        }
        this.setNav(false);
      },
      handleScroll(){
        let scrollValue = document.body.scrollTop || document.documentElement.scrollTop;
        this.currentScrollValue = scrollValue;
        if(this.colorOnScroll > 0 && scrollValue > this.colorOnScroll){
          this.extraNavClasses = `bg-${this.type}`;
        } else {
          if(this.extraNavClasses){
            this.extraNavClasses = ''
          }
        }
      },
      scrollListener() {
        resizeThrottler(this.handleScroll)
      },
      logout(){
        this.descript="로그아웃 하시겠습니까?";
        this.title = "로그아웃";
        //this.$root.$emit('bv::show::modal','modal-logout', '#btnShow')
        this.modalShow = true;
      },
      //로그아웃확인을 누를경우
      handleOk() {
       // Prevent modal from closing
       //evt.preventDefault()
       this.flag = true;
     },
     onClose(){
       this.modalShow=false;
     }
    },
    mounted () {
      document.addEventListener('scroll', this.scrollListener)
    },
    beforeDestroy () {
      document.removeEventListener('scroll', this.scrollListener)
    }
  }
</script>
<style>
.logout{
  margin-top: 20px;
  margin-right: 15px;
  height: 45px;
  float:right;
}
.login{
  margin-top:10px;
  margin-left:15px;
  border-bottom:1px solid hsla(0,0%,53%,.3);
  height:45px;
}
</style>
