<template>
    <nav class="navbar bg-white fixed-top button-fixed-top" v-bind:class="{main_web_navbar : webFlag}">
      <div class="container" style="padding-right:0px; padding-left:0px;">
        <div v-if="pageType=='mylist'" class="board_style navbar-brand" v-on:click="boarderClick('/mylist/1')" style="text-align:left;">
          이전
        </div>
        <div v-else class="board_style navbar-brand" v-on:click="boarderClick('/board')" style="text-align:left;">
          이전
        </div>
        <div class="board_style_middle">
        </div>
        <div v-if="boardCommentFlag" class="board_style" style="text-align:right;">
          <!-- <a style="color:#888; font-size:1.2em;" v-on:click="update()"> 수정 </a> -->
           <a style="color:#888; font-size:1.2em;" v-on:click="deleteboard()"> 삭제 </a>
        </div>
      </div>
      <modal :show.sync="modalShowBoard" headerClasses="justify-content-center">
        <h4 slot="header" class="title title-up">{{title}}</h4>
        <p>{{descript}}</p>
        <template slot="footer" class="justify-content-center">
          <button class="btn btn-secondary" v-on:click="onClose()">Close</button>
          <button class="btn btn-primary" v-on:click="handleOk()">Ok</button>
        </template>
      </modal>
    </nav>
</template>

<script>
import { board } from '../../api'
import { mapState } from 'vuex'
import Modal from '../Component/Modal';
  export default {
    props: {
      transparent: Boolean,
      colorOnScroll: Number
    },
    computed:{
      ...mapState('boardList', {
        boardCommentFlag : 'boardCommentFlag',
      }),
      ...mapState('hereluxAll',{
        webFlag : 'webFlag'
      })
    },
    components:{
      Modal
    },
    data(){
      return{
        returnPath:'',
        modalShowBoard:false,
        title : '',
        descript : '',
        userid : '',
        pageType : String
      }
    },
    created(){
      this.userid = localStorage.getItem('id');
      this.returnPath = this.$route.query.returnPath || '/board'
      this.pageType = this.$route.params.pagetype;
    },
    methods:{
      deleteboard(){
        //이미지 삭제
        this.modalShowBoard = true;
        this.title = "게시글 삭제";
        this.descript = "게시글을 삭제하시겠습니까?";
      },
      handleOk(){
        board.delete(this.$route.params.board_idx).then(data => {
          this.modalShowBoard = false;
          setTimeout(() => {
            this.$router.push(this.returnPath);
          }, 300);
        }).catch(error =>{
          console.log("error",error);
          //alert 후 페이지 이동
          this.$router.push(this.$route.query.returnPath || '/error');
        });;
      },
      onClose(){
        this.modalShowBoard = false;

      },
      boarderClick(path){
        this.$store.commit('boardList/SET_BOARDINFO_INIT');
        if(this.userid != ''){
          this.$store.dispatch('boardList/SELECT_BOARD_INFO_ALERT',{userid:this.userid});
        }
        //
        window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push(this.$route.query.returnPath || path)
      }
    }
  }
</script>
<style scoped>
nav {
  text-align: center;
}
.board_style{
  color: rgb(136, 136, 136);
}

.board_style_middle{
  width:70%;
  text-align: center;
}
.modal-view{
  width: 100%;
  height: 200px;
  overflow-y: scroll;
}
.button-fixed-top  {
  padding-top: calc(constant(safe-area-inset-top) - 10px);
  padding-top: calc(env(safe-area-inset-top) - 10px);
}
.main_web_navbar{
  top:51px;
  box-shadow:0 20px 20px -20px rgba(0,0,0,.15);
}
</style>
