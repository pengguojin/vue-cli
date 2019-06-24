<!--  -->
<template lang="html" >
  <!-- 一级菜单 -->
  <router-link class="nav-link" :to="{name: menu.url}">
    <i :class="['fa fa-fw', 'fa-'+menu.image]"></i>
    <span :class="select==menu.href?'nav-link-text gactive':'nav-link-text'">{{menu.title}}</span>
  </router-link>
</template>

<script>
export default {
  props: ['menu', 'select'],
  name: 'oneMenu',
}

</script>
<style lang="css" scoped>
</style>
