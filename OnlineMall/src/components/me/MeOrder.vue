<!--  -->
<template lang="html">
  <div class="aui-grid-row">
        <router-link :to="{name: 'Order', params: {num: 1}}" class="aui-grid-row-item">
        <i class="aui-icon-large aui-icon-large-sm aui-icon-wallet"></i>
        <p class="aui-grid-row-label">待付款</p>
        </router-link>
        <router-link :to="{name: 'Order', params: {num: 2}}" class="aui-grid-row-item">
        <i class="aui-icon-large aui-icon-large-sm aui-icon-goods"></i>
        <p class="aui-grid-row-label">待发货</p>
        </router-link>
        <router-link :to="{name: 'Order', params: {num: 3}}" class="aui-grid-row-item">
        <i class="aui-icon-large aui-icon-large-sm aui-icon-receipt"></i>
        <p class="aui-grid-row-label">待收货</p>
        </router-link>
        <router-link :to="{name: 'Order', params: {num: 4}}" class="aui-grid-row-item">
        <i class="aui-icon-large aui-icon-large-sm aui-icon-evaluate"></i>
        <p class="aui-grid-row-label">待评价</p>
        </router-link>
        <router-link :to="{name: 'Order', params: {num: 5}}" class="aui-grid-row-item">
        <i class="aui-icon-large aui-icon-large-sm aui-icon-refund"></i>
        <p class="aui-grid-row-label">退货退款</p>
        </router-link>
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
