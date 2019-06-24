<!--  -->
<template lang="html">
    <div class="aui-payment-bar">
        <div class="all-checkbox">
            <input type="checkbox" class="check goods-check" v-model="checked" @click="all">全选
        </div>
        <div class="shop-total">
            <strong>合计：<i class="total" id="AllTotal">{{sumPrice}}</i></strong>
        </div>
        <a href="order.html" class="settlement">结算</a>
    </div>
</template>

<script>
export default {
    data () {
        return {
            checked: false
        }
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
