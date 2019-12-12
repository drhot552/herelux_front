<template>
    <nav class="navbar bg-white fixed-top">
      <div class="container" style="padding-right:0px; padding-left:0px;">
        <div v-if="pageType=='mylist'" class="board_style navbar-brand" v-on:click="boarderClick('/mylist/1')" style="text-align:left;">
          이전
        </div>
        <div v-else class="board_style navbar-brand" v-on:click="boarderClick('/board')" style="text-align:left;">
          이전
        </div>
        <div class="board_style_middle">
        </div>
        <div v-if="this.$store.state.boardCommentFlag" class="board_style" style="text-align:right;">
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
      <loading :active.sync="this.$store.state.isLoading"
                :can-cancel="true"
                :is-full-page="true"
                :z-index="1060">
      </loading>
    </nav>
</template>

<script>
import { board } from '../../api'
import Modal from '../Component/Modal';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    props: {
      transparent: Boolean,
      colorOnScroll: Number
    },
    components:{
      Modal,
      Loading
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
        this.$store.commit('ISLOADING', true);

        board.delete(this.$route.params.board_idx).then(data => {
          this.$router.push(this.returnPath);
          this.$store.commit('ISLOADING', false);
        }).catch(error =>{
          console.log("error",error);
          //alert 후 페이지 이동
          alert("서버와의 통신 에러가 발생하였습니다.");
          this.$router.push(this.$route.query.returnPath || '/error');
        });;
      },
      onClose(){
        this.modalShowBoard = false;

      },
      boarderClick(path){
        this.$store.commit('SET_BOARDINFO_INIT');
        if(this.userid != ''){
          this.$store.dispatch('SELECT_BOARD_INFO_ALERT',{userid:this.userid});
        }
        this.$router.push(this.$route.query.returnPath || path);
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
</style>
