<!--  -->
<template lang="html">
    <header class="aui-header-default aui-header-fixed aui-header-bg">
        <a href="javascript:history.back(-1)" class="aui-header-item">
            <i class="aui-icon aui-icon-back-white"></i>
        </a>
        <div class="aui-header-center aui-header-center-clear">
            <div class="aui-header-center-logo">
                <div id="scrollSearchPro">
                    <span class="current">商品</span>
                    <span>评价</span>
                    <span>详情</span>
                </div>
            </div>
        </div>
        <a href="javascript:;" class="aui-header-item-icon select"    style="min-width:0;">
            <i class="aui-icon aui-icon-share-pd selectVal" onselectstart="return false"></i>
            <div class="aui-header-drop-down selectList">
                <div class="aui-header-drop-down-san"></div>
                <div class="">
                    <p class="" onclick="location='http://www.a-ui.cn/'" >消息</p>
                    <p class="" onclick="location='index.html'">首页</p>
                    <p class="" onclick="location='index.html'">帮助</p>
                    <p class="" onclick="location='index.html'">分享</p>
                </div>
            </div>
        </a>
    </header>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}

</script>
<style lang="css" scoped>
</style>
