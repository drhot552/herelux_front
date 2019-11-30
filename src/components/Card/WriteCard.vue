<template>
  <div>
    <div style="min-height: 40px; box-sizing: border-box; height: 40px;margin : 10px;">
      <div class="edit_div">
        <div class="edit_container">
          <div class="edit_textarea" contenteditable="true" id="subject" placeholder="제목(최대30자)" style="max-height: 40px;">

          </div>
        </div>
      </div>
    </div>
    <div style="box-sizing: border-box; height: 40vh; margin:10px;">
      <div class="edit_div">
        <div class="edit_container">
          <textarea class="edit_textarea"  id="descript" placeholder="내용을 입력하세요." style="max-height: 40vh;">

          </textarea>
        </div>
      </div>
    </div>
    <div style="margin-left:10px; margin-right:10px;">
      <textarea class="edit_textarea" id="url_1" placeholder="관련 링크를 넣으세요. 꼭 http:// 혹은 https://가 들어가야 합니다.">
      </textarea>
    </div>
    <div style="margin-left:10px; margin-right:10px;">
      <textarea class="edit_textarea" id="url_2" placeholder="관련 링크를 넣으세요. 꼭 http:// 혹은 https://가 들어가야 합니다.">
      </textarea>
    </div>
    <div class="image_box">
      <div class="edit_div">
        <label class="edit_textarea" for="file_input_1" style="width: 46%; position: absolute;">
          <div class="image" id="imgzone_1" style="text-align:center; position:absolute;
                                                    margin-right: 10px;">
          </div>
          <img v-if="background_Flag_One" src="/public/img/btn_image.png" style="height:20px;">
          </img>
        </label>
        <div v-if="!background_Flag_One && this.imageCount > 0"  style="float:right;margin-top: 14px;margin-right: 14px;">
          <div style="position: relative;">
            <img src="/public/img/btn_close.png" style="width:30px; z-index:0;" v-on:click="FirstImgDelete()" />
          </div>
        </div>
      </div>
    </div>
    <div class="image_box">
      <div class="edit_div">
        <label class="edit_textarea" for="file_input_2" style="width: 46%; position: absolute;">
          <div class="image" id="imgzone_2" style="text-align:center; position:absolute;
                                                    margin-right: 10px;">
          </div>
          <img v-if="background_Flag_Two" src="/public/img/btn_image.png" style="height:20px;">
          </img>
        </label>
        <div v-if="!background_Flag_Two && this.imageCountScd > 0"  style="float:right;margin-top: 14px;margin-right: 14px;">
          <div style="position: relative;">
            <img src="/public/img/btn_close.png" style="width:30px; " v-on:click="SecondImgDelete()" />
          </div>
        </div>
      </div>
    </div>
    <div style="width:100%;">
      <div class="image-upload row" style="padding: 10px; margin-right: 0px; margin-left: 0px;">
        <div style="width:10%;">
          <label for="file-input">
            <img src="/public/img/bottom_value_default.png" style="height:20px;"/>

          </label>
        </div>
        <div style="width:90%;">
          <span> 이미지는 최대 2개까지만 가능합니다.</span>
        </div>
        <input multiple="multiple" type="file" accept="image/*" id="file_input_1" v-on:change="FirstshowFiles()">
        <input multiple="multiple" type="file" accept="image/*" id="file_input_2" v-on:change="SecondshowFiles()">
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      imageCount : 0,
      imageCountScd : 0,
      background_Flag_Two : true,
      background_Flag_One : true
    }
  },
  mounted(){
    this.$store.state.formData = new FormData();
  },
  methods:{
    FirstshowFiles() {

        var div = document.getElementById('imgzone_1');     // The DIV.
        var fi = document.getElementById('file_input_1');           // Get the File input.

        this.background_Flag_One = false;

        if(this.imageCount != 0){
          this.$store.state.formData.delete('image_1');
          $('#imgzone_1').empty();
          for (var i = 0; i <= fi.files.length - 1; i++) {
                this.imageCount++;
                this.$store.state.formData.append('image_1', fi.files[i]);
                var reader = new FileReader();
                reader.onload = function (e) {
                    var img = new Image();
                    img.src = e.target.result;
                    img.setAttribute('style', 'clear:both; width:100%; height:100%;');

                    div.appendChild(img);       // Add the images to the DIV.
                };
                reader.readAsDataURL(fi.files.item(i));
            }
        }
        //이미지가 첨부가 안되어있을때
        else {
          if(fi.files.length > 1 ) {
            alert("한 프레임당 이미지는 최대 1개까지만 가능합니다.");
          }
          else {
            for (var i = 0; i <= fi.files.length - 1; i++) {
                  this.imageCount++;
                  this.$store.state.formData.append('image_1', fi.files[i]);
                  var reader = new FileReader();
                  reader.onload = function (e) {
                      var img = new Image();
                      img.src = e.target.result;
                      img.setAttribute('style', 'clear:both; width:100%; height:100%;');

                      div.appendChild(img);       // Add the images to the DIV.
                  };
                  reader.readAsDataURL(fi.files.item(i));
              }
          }

        }

    },
    SecondshowFiles() {
        var div = document.getElementById('imgzone_2');     // The DIV.
        var fi = document.getElementById('file_input_2');           // Get the File input.

        this.background_Flag_Two = false;

        if(this.imageCountScd != 0){
          this.$store.state.formData.delete('image_2');
          $('#imgzone_2').empty();
          for (var i = 0; i <= fi.files.length - 1; i++) {
                this.imageCountScd++;
                this.$store.state.formData.append('image_2', fi.files[i]);
                var reader = new FileReader();
                reader.onload = function (e) {
                    var img = new Image();
                    img.src = e.target.result;
                    img.setAttribute('style', 'clear:both; width:100%; height:100%;');

                    div.appendChild(img);       // Add the images to the DIV.
                };
                reader.readAsDataURL(fi.files.item(i));
            }
        }
        //이미지가 첨부가 안되어있을때
        else {
          if(fi.files.length > 1 ) {
            alert("한 프레임당 이미지는 최대 1개까지만 가능합니다.");
          }
          else{
            for (var i = 0; i <= fi.files.length - 1; i++) {
                  this.imageCountScd++;
                  this.$store.state.formData.append('image_2', fi.files[i]);
                  var reader = new FileReader();
                  reader.onload = function (e) {
                      var img = new Image();
                      img.src = e.target.result;
                      img.setAttribute('style', 'clear:both; width:100%; height:100%;');

                      div.appendChild(img);       // Add the images to the DIV.
                  };
                  reader.readAsDataURL(fi.files.item(i));
              }
          }

        }
    },
    FirstImgDelete(){
      var div = document.getElementById('imgzone_1');
      var fi = document.getElementById('file_input_1');           // Get the File input.

      this.background_Flag_One = true;
      this.$store.state.formData.delete('image_1');
      $('#imgzone_1').empty();
    },
    SecondImgDelete(){
      var div = document.getElementById('imgzone_2');     // The DIV.
      var fi = document.getElementById('file_input_2');           // Get the File input.

      this.background_Flag_Two = true;
      this.$store.state.formData.delete('image_2');
      $('#imgzone_2').empty();
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
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 5px;
  outline: 0;
  overflow: auto;
  width: 100%;
}
.image_box{
  min-height: 24vh;
  box-sizing: border-box;
  height: 24vh;
  width: 46%;
  float: left;
  margin-left:10px;
}
</style>
