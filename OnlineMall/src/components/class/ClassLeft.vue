<!-- 分类-左侧栏 -->
<template lang="html">
  <div class="aui-scroll-nav">
    <router-link href="#" to="" v-for="(item,index) in items" :key="index" :class="['aui-scroll-item', {'aui-crt':flag==index}]">
        <div class="aui-scroll-item-icon"></div>
        <div class="aui-scroll-item-text">{{item.name}}</div>
    </router-link>
</div>
</template>

<script>
export default {
  data () {
    return {
        flag: 0,
        items: [
            { name: '热门推荐' },
            { name: '美容彩妆' },
            { name: '母婴专区' },
            { name: '箱包配饰' },
            { name: '家居个护' },
            { name: '营养保健' },
            { name: '服饰鞋靴' },
            { name: '数码家电' }
        ]
    }
  }
}

</script>
<style lang="css" scoped>
</style>
