<!-- 订单明细 -->
<template lang="html">
  <div>
    <OrderHeader />
    <OrderTab :num="num"/>
  </div>
</template>

<script>
import OrderHeader from './OrderHeader'
import OrderTab from './OrderTab'

export default {
  data () {
    return {
      num: this.$route.params.num
    }
  },
  mounted () {
    console.log(this.$route.params.num);
    
  },
  components: {
    OrderHeader, OrderTab
  },
}

</script>
<style lang="css" scoped>
</style>
