<!--  -->
<template lang="html">
  <div class="aui-me-content-box">
    <div class="aui-me-content-info"></div>
    <div class="aui-me-content-list">
      <div class="aui-me-content-item">
        <div class="aui-me-content-item-head">
          <div class="aui-me-content-item-img">
            <img src="static/themes/img/user/head-3.jpg" alt="">
          </div>
          <div class="aui-me-content-item-title">{{userinfo.info}}</div>
        </div>
        <div class="aui-me-content-item-text">
          <a href="my-orders.html">
            <span>98</span>
            <span>收藏</span>
          </a>
          <a href="my-orders.html">
            <span>78</span>
            <span>关注</span>
          </a>
          <a href="my-orders.html">
            <span>99</span>
            <span>足迹</span>
          </a>
          <a href="my-orders.html">
            <span>65</span>
            <span>分享</span>
          </a>
        </div>
      </div>
      <div class="aui-me-content-card">
        <h3><i class="aui-icon aui-card-me"></i>铂金会员</h3>
        <a href="my-membership.html">点击查看特权</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userinfo: {
        username: '张三'
      }
    }
  }
}

</script>
<style lang="css" scoped>
</style>
