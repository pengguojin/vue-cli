<!-- 主页 -->
<template lang="html">
  <div>
        <!-- 切换tab页 -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <Footer />
  </div>
</template>

<script>
import Footer from '@/components/common/Footer'

export default {
    name: 'Index',
    mounted () {
        this.$router.push('main')
    },
    components: {
        Footer
    }
}

</script>
<style lang="css" scoped>
</style>
