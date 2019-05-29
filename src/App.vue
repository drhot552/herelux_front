<template>
  <div id="app">
    <router-view name="header"></router-view>
    <div>
        <router-view/>
    </div>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
