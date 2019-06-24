<!-- 自动封堵-图表样式页 -->
<template lang="html">
  <div class="pane mypane">
    <span class="h2-title"></span>
    <span class="h3-title">{{title}}</span>
    <div class="warp auto-spread">
        <Echarts :id="id" :options="options" :className="className"/>
    </div>
  </div>
</template>

<script>
// 懒加载，以免白屏太久
const Echarts = r => require.ensure([], () => r(require('@/components/echarts/Echarts')), 'Echarts')

export default {
  props: ['title', 'id', 'options', 'className'],
  data () {
    return {
    }
  },
  components: {
      Echarts
  }
}

</script>
<style lang="css" scoped>
</style>
