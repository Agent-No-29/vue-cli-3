<!-- 页面入口文件（根组件）-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
<style>
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
