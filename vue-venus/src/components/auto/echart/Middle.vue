<!-- 左侧中间 -->
<template lang="html">
    <div class="left-middle">
        <div class="left-middle-item">
            <PaneItem :id="'waf'" :title="'WAF来源统计'" :options="options" :className="'waf'"/>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import PaneItem from '@/components/auto/echart/PaneItem' 

export default {
    mounted () {
        this.$store.dispatch('WAF_ECHART')
    },
    computed: {
        data () { // 监听图表数据，然后刷新，options也跟着改变
            return this.$store.state.wafList
        },
        options () {
            let legend = []
            if (this.data.length > 0) {
                this.data.forEach(e => legend.push(e.name))
            }
            return {
                grid: {
                    left: '20%',
                    top: '10%'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                color: ['rgb(190,33,26)', 'rgb(246,143,99)', 'rgb(255,229,8)', 
                        'rgb(214,148,25)', 'rgb(41,180,206)', 'rgb(114,123,180)', 'rgb(114,123,180)'],
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data: legend
                },
                series: [
                    {
                        name: 'WAF来源统计',
                        radius : '60%',
                        type: 'pie',
                        center: ['40%', '50%'],
                        data: this.data
                    }
                ]
            }
        }
    },
    components: {
        PaneItem
    }
}

</script>
<style lang="css" scoped>
</style>
