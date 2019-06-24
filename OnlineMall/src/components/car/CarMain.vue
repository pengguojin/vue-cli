<!--  -->
<template lang="html">
  <div>
    <CarHeader />
    <section class="aui-car-content">
      <div class="aui-car-box">
        <div class="aui-car-box-name">
          <input type="checkbox" class="check goods-check shopCheck" v-model="checked" @click="all">
          <h3>
            <a href="#">购物网</a>
          </h3>
          <div class="aui-car-coupons">
            <a href="#">领券</a>
            <a href="#">编辑</a>
          </div>
        </div>
        <CarList :checked="checked"/>
        <div class="aui-shopPrice">
          本店总计：￥
          <span class="aui-total-amount ShopTotal">{{sumPrice}}</span>
        </div>
      </div>
    </section>
    <CarPayBar :checked="checked"/>
  </div>
</template>

<script>
import CarHeader from './CarHeader'
import CarList from './CarList'
import CarPayBar from './CarPayBar'
export default {
  name: 'CarMain',
  data () {
    return {
      checked: false
    }
  },
  components: {
    CarHeader, CarList, CarPayBar
  },
  mounted () {
    this.$store.dispatch('setCatList')
  },
  computed: {
    sumPrice () {
      return this.$store.state.sumPrice
    }
  },
  methods: {
    all () {
      this.$store.dispatch('checkAll', this.checked)
      this.$store.dispatch('setSumPrice')
    }
  }
}

</script>
<style lang="css" scoped>
</style>
