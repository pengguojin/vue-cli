<!--  -->
<template lang="html">
<ul>
    <li>
        <div class="aui-list-title-info">
            <a href="#" class="aui-well ">
                <div class="aui-well-bd">2017-11-14</div>
                <div class="aui-well-ft">{{order.type|getType}}</div>
            </a>
            <a href="javascript:;" class="aui-list-product-fl-item">
                <div class="aui-list-product-fl-img">
                    <img :src="order.goods.img" alt="">
                </div>
                <div class="aui-list-product-fl-text">
                    <h3 class="aui-list-product-fl-title">{{order.goods.desc}}</h3>
                    <div class="aui-list-product-fl-mes">
                        <div>
                <span class="aui-list-product-item-price">
                    <em>¥</em>
                    {{order.goods.prePrice}}
                </span>
                            <span class="aui-list-product-item-del-price">
                    ¥{{order.goods.price}}
                </span>
                        </div>
                        <div class="aui-btn-purchase">
                            x{{order.goods.total}}
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="aui-list-title-btn" v-if="order.type==='1'">
            <a href="#">取消订货</a>
            <a href="#" class="red-color">立即付款</a>
        </div>
        <div class="aui-list-title-btn" v-if="order.type==='2'">
            <a href="#">取消订货</a>
            <a href="#" class="red-color">立即付款</a>
        </div>
        <div class="aui-list-title-btn" v-if="order.type==='3'">
            <a href="#">查看物流</a>
            <a href="#" class="red-color">确认收货</a>
        </div>
        <div class="aui-list-title-btn" v-if="order.type==='4'">
            <a href="#">删除订单</a>
            <a href="#">查看物流</a>
            <a href="#">追加评价</a>
        </div>
        <div class="aui-dri"></div>
    </li>
</ul>
</template>

<script>
export default {
    props: ['order', 'tabindex'],
    data () {
        return {
        }
    },
    filters: {
        getType (type) {
            switch (type) {
                case '1':
                    return '待付款'
                    break
                case '2':
                    return '待发货'
                    break
                case '3':
                    return '待收货'
                    break
                case '4':
                    return '评价'
                    break
                default:
                    return '全部'
                    break 
            }
        }
    }
}

</script>
<style lang="css" scoped>
</style>
