<template>
  <div>
    <div style="min-height: 40px; box-sizing: border-box; height: 40px;">
      <div class="edit_div">
        <div class="edit_container">
          <div class="edit_textarea" contenteditable="true" id="subject" placeholder="제목(최대30자)" style="max-height: 40px;">
            {{this.subject}}
          </div>
        </div>
      </div>
    </div>
    <div style="min-height: 63vh; box-sizing: border-box; height: 63vh;">
      <div class="edit_div">
        <div class="edit_container">
          <div class="edit_textarea"  id="descript" contenteditable="true" placeholder="내용을 입력하세요." style="max-height: 67vh;">
            <!--이미지 수정 삭제-->
            {{this.descript}}
            <div class="image" id="imgzone">
              <div v-if="this.boardUpdate.length > 0">
                <div v-for="item in boardUpdate" style="position:relative">
                  <img v-lazy="item.imgurl"></img>
                  <div style="position: absolute; right: 0;padding: 15px;">
                    X
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="image-upload row" style="padding: 10px; margin-right: 0px; margin-left: 0px;">
        <div style="width:10%;">
          <label for="file-input">
            <img src="/public/img/bottom_value_default.png" style="height:20px;"/>
          </label>
        </div>
        <div style="width:90%;">
          <span> 이미지는 최대 2개까지만 가능합니다.</span>
        </div>
        <input multiple="multiple" type="file" accept="image/*" id="file-input" v-on:change="showFiles()">
      </div>
    </div>
  </div>
</template>
<script>
import { board } from '../../api'
export default{
  data(){
    return{
      imageCount : 0,
      board_idx : 0,
      writer: "",
      descript : "",
      subject : "",
      boardUpdate : []
    }
  },
  created(){
    //게시판 조회
    console.log("writer" , this.writer);
    this.board_idx =  this.$route.params.board_idx;
    board.select(this.board_idx,this.$store.state.boardtype).then(data => {
      if(data.length > 0 ){
        this.boardUpdate = data;
        this.writer = this.boardUpdate[0].userid;
        this.descript = this.boardUpdate[0].descript;
        this.subject = this.boardUpdate[0].subject;
      }
    }).catch(error =>{
      console.log(error);
    });
  },
  mounted(){
    this.$store.state.formData = new FormData();
  },
  methods:{
    showFiles() {
        console.log("이미지첨부",this.$store.state.writeBoard_Category);
        var div = document.getElementById('imgzone');     // The DIV.
        var fi = document.getElementById('file-input');           // Get the File input.

        if (fi.files.length > 0) {
            if(this.imageCount > 1 || fi.files.length > 2 ) {
              alert("이미지는 최대 2개까지만 가능합니다.");
            }
            else {
              for (var i = 0; i <= fi.files.length - 1; i++) {
                  this.imageCount++;
                  this.$store.state.formData.append('image', fi.files[i]);
                  var reader = new FileReader();
                  reader.onload = function (e) {
                      var img = new Image();
                      img.src = e.target.result;
                      img.setAttribute('style', 'clear:both; margin:10px 0;');

                      div.appendChild(img);       // Add the images to the DIV.
                  };
                  reader.readAsDataURL(fi.files.item(i));
              }
            }
        }
    }
  }
}
</script>
<style>
.image-upload>input {
  display: none;
}
.edit_div{
  line-height: 1;
  color: #181818;
  width: 100%;
  height: inherit;
  background-color: white;
}
.edit_container{
  overflow: hidden;
  height: inherit;
  background-color: #fff;
}
[contenteditable=true]:empty:before{
  content: attr(placeholder);
  color:#888;
  font-size: small;
  display: block; /* For Firefox */
}
.edit_textarea{
  box-sizing: border-box;
  margin: 0;
  padding: 10px 10px 0px;
  height: inherit;
  border-bottom: 1px solid rgba(0,0,0,.1);
  outline: 0;
  overflow: auto;
}
</style>
