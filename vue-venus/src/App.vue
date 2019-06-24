<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .el-button--mini, .el-button--mini.is-round {
      padding: 7px 10px!important;
  }
  .el-button+.el-button {
      margin-left: 2px!important;
  }
</style>
