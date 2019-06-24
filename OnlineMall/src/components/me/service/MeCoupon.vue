<!-- 我的优惠卷 -->
<template lang="html">
  <div>
    <header class="aui-header-default aui-header-fixed aui-header-bg">
      <a href="javascript:history.back(-1)" class="aui-header-item">
        <i class="aui-icon aui-icon-back-white"></i>
      </a>
      <div class="aui-header-center aui-header-center-clear">
        <div class="aui-header-center-logo">
          <div class="aui-car-white-Typeface">我的优惠券</div>
        </div>
      </div>
      <a href="#" class="aui-header-item-icon"   style="min-width:0">
        <i class="aui-icon aui-icon-search"></i>
      </a>
    </header>

    <section class="aui-myOrder-content">
      <div class="m-tab demo-small-pitch" data-ydui-tab>
        <div class="aui-myOrder-fix">
          <ul class="tab-nav">
            <li class="tab-nav-item tab-active"><a href="javascript:;">未使用</a></li>
            <li class="tab-nav-item"><a href="javascript:;">已使用</a></li>
            <li class="tab-nav-item"><a href="javascript:;">已过期</a></li>
          </ul>
        </div>
        <div class="aui-prompt"><i class="aui-icon aui-prompt-sm"></i>兑换码现已关闭,请使用优惠券</div>
        <div class="tab-panel">
          <div class="tab-panel-item tab-active">
            <div class="aui-coupon-item">
              <img src="static/themes/img/icon/icon-c1.jpg" alt="">
            </div>
            <div class="aui-coupon-item">
              <img src="static/themes/img/icon/icon-c2.jpg" alt="">
            </div>
          </div>
          <div class="tab-panel-item">
            <div class="aui-coupon-item">
              <img src="static/themes/img/icon/icon-c3.jpg" alt="">
            </div>
          </div>
          <div class="tab-panel-item">
            <div class="aui-coupon-item">
              <img src="static/themes/img/icon/icon-c4.jpg" alt="">
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
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
