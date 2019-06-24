<!--  -->
<template lang="html">
    <li v-for="(child,index) in menu.chilenNode" :menu="child" :key="index">
        <router-link :to="{name: child.url}">{{menu.title}}</router-link>
    </li>
</template>

<script>
export default {
  name: 'multiMenu',
  props: ['menu', 'childs']
}

</script>
<style lang="css" scoped>
</style>
