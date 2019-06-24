<!--  -->
<template lang="html">
  <section class="aui-myOrder-content">
		<div class="m-tab demo-small-pitch" data-ydui-tab>
			<div class="aui-myOrder-fix">
				<ul class="tab-nav">
					<li :class="['tab-nav-item', num===index?'tab-active':'']" v-for="(tab,index) in tabs" @click="tabMe(index)"><a href="javascript:;">{{tab}}</a></li>
				</ul>
			</div>
			<div class="aui-prompt"><i class="aui-icon aui-prompt-sm"></i>双十一期间发货及物流时效公告</div>
			<div class="tab-panel">
                <div :class="['tab-panel-item', num==index1?'tab-active':'']" v-for="(tabContent,index1) in tabContents">
                    <CarItem v-for="(o,index2) in filterOrder(orderList, index1)" :key="index2" :order="o" :tabindex="index1"/>
                </div>
            </div>
		</div>
	</section>
</template>

<script>
import CarItem from './CarItem'
export default {
    props: ['num'],
    data () {
        return {
            tabs: ['全部', '待付款', '待发货', '待收货', '评价'],
            tabContents: ['全部', '待付款', '待发货', '待收货', '评价']
        }
    },
    components: {
        CarItem
    },
    mounted () {
        this.$store.dispatch('getAllOrder')
    },
    methods: {
        tabMe (index) {
            this.num = index
        },
        filterOrder (orderList,indexs) {
            // 筛选订单种类，如果是全部（0）返回true，否则过滤
            return orderList.filter((el, index, arr)=> {
                let type = arr[index].type
                if (indexs==0)
                    return true 
                else
                    return arr[index].type===indexs.toString()
            })
        }
    },
    computed: {
        orderList () {
            return this.$store.state.orderList
        }
    }
}

</script>
<style lang="css" scoped>
</style>
