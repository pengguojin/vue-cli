<!-- 左侧上部 -->
<template lang="html">
    <div class="left-top">
        <div class="left-top-item">
            <PaneItem :id="'ips'" :title="'IPS来源统计'" :options="options" :className="'ips'"/>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import PaneItem from '@/components/auto/echart/PaneItem' 
export default {
    name: 'TopItem',
    mounted () {
        this.$store.dispatch('IPS_ECHART')
    },
    computed: {
        data () { // 监听图表数据，然后刷新，options也跟着改变
            return this.$store.state.ipsList
        },
        options(){
            let ips = []
            if (this.data.length > 0) {
                this.data.forEach(e => ips.push(e.name))
            }
            return {
                grid: {
                    left: '15%',
                    top: '10%'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}",
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ips
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'IPS来源统计',
                        type: 'bar',
                        data: this.data,
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0, y: 0, x2: 0, y2: 1,
                                    colorStops: [
                                        { offset: 0, color: '#83bff6' }, 
                                        { offset: 1, color: '#236df7' }
                                    ],
                                    globalCoord: false
                                }
                            }
                        }
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
