<!-- 我的 -->
<template lang="html">
  <section class="aui-me-content">
      <!-- 用户信息 -->
      <MeInfo />
      <div class="aui-me-content-order">
        <a href="my-order.html" class="aui-well aui-fl-arrow">
          <div class="aui-well-bd">我的订单</div>
          <div class="aui-well-ft">查看全部</div>
        </a>
      </div>
      <section class="aui-grid-content">
        <!-- 订单 -->
        <MeOrder />
        <div class="aui-dri"></div>
        <div class="aui-me-content-order">
          <a href="#" class="aui-well ">
            <div class="aui-well-bd">我的服务</div>
          </a>
        </div>
        <!-- 我的服务 -->
        <MeService />
        <div class="aui-recommend">
          <img src="static/themes/img/bg/icon-tj3.jpg" alt="">
        </div>
        <!-- 为你推荐 -->
        <ListProduct />
      </section>
    </section>
</template>

<script>
import ListProduct from '@/components/home/ListProduct'
import MeInfo from './MeInfo'
import MeService from './MeService'
import MeOrder from './MeOrder'
export default {
  data () {
    return {
    }
  },
  components: {
    ListProduct, MeInfo, MeService, MeOrder
  }
}

</script>
<style lang="css" scoped>
</style>
