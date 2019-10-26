<template>
    <nav class="search_navbar navbar-expand-lg bg-white fixed-top">
      <div class="container">
        <div class="search_style_middle">
          <h6 style="margin:20px;"> <b>HereLux</b></h6>
        </div>
      </div>
    </nav>
</template>

<script>
  export default {
    props: {
      transparent: Boolean,
      colorOnScroll: Number,
    }
  }
</script>
<style scoped>
nav {
  text-align: center;
}
.search_style{
  width:15%;
  color: rgb(136, 136, 136);
}
.search_navbar {
  padding-top: 0;
  padding-bottom: 0;
  min-height: 53px;
}
.search_style_middle{
  width:100%;
  text-align: center;
}
.modal-view{
  width: 100%;
  height: 200px;
  overflow-y: scroll;
}
</style>
