<!--  -->
<template lang="html">
  <div class="aui-car-box-list">
    <ul v-if="lists.length>0">
        <li v-for="(list, index) in lists" :key="list.id">
            <div class="aui-car-box-list-item">
                <input type="checkbox" class="check goods-check goodsCheck" v-model="list.checked" @click="ch(index)">
                <div class="aui-car-box-list-img">
                    <router-link :to="{name: 'Detail'}" href="ui-product.html">
                        <img :src="list.img" alt="">
                    </router-link>
                </div>
                <div class="aui-car-box-list-text">
                    <h4>
                    <router-link :to="{name: 'Detail'}">{{list.desc}}</router-link>
                    </h4>
                    <div class="aui-car-box-list-text-brief">
                        <span v-for="d in list.descItem">{{d}}</span>
                    </div>
                    <div class="aui-car-box-list-text-price">
                        <div class="aui-car-box-list-text-pri">
                            ￥<b class="price">{{list.price}}</b>
                        </div>
                        <div class="aui-car-box-list-text-arithmetic">
                            <a href="javascript:;" class="minus" @click="minus(index, list.total)">-</a>
                            <span class="num">{{list.total}}</span>
                            <a href="javascript:;" class="plus" @click="plus(index, list.total)">+</a>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'CarList',
    data () {
        return {
            itemCheck: false
        }
    },
	computed: {
		checked () {
            return this.$attrs.checked
        },
        lists () {
            return this.$store.state.carList
        }
    },
    methods: {
        minus (index, total) {
            if (total > 0) {
                this.$store.dispatch('choseTotal', {"index": index, "total": total - 1})
                this.$store.dispatch('setSumPrice')
            }
        },
        plus (index, total) {
            this.$store.dispatch('choseTotal', {"index": index, "total": total + 1})
            this.$store.dispatch('setSumPrice')
        },
        ch (index) {
            this.$store.dispatch('choseGoods', index)
            this.$store.dispatch('setSumPrice')
        }
    }
}

</script>
<style lang="css" scoped>
</style>
