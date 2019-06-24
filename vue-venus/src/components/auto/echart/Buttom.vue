<!-- 左侧底部 -->
<template lang="html">
    <div class="left-buttom">
        <div class="left-buttom-item">
            <PaneItem :id="'soc'" :title="'SOC录入统计'" :options="options" :className="'soc'"/>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import PaneItem from '@/components/auto/echart/PaneItem' 
export default {
    mounted () {
        this.$store.dispatch('SOC_ECHART')
    },
    computed: {
        data () { // 监听图表数据，然后刷新，options也跟着改变
            return this.$store.state.socList
        },
        options () {
            let soc = []
            if (this.data.length > 0) {
                this.data.forEach(e => soc.push(e.name))
            }
            return {
                grid: {
                    left: '20%',
                    top: '10%'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}",
                },
                xAxis: [
                    {
                        type: 'value'
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        data: soc
                    }
                ],
                series: [
                    {
                        name: 'SOC来源统计',
                        type: 'bar',
                        data: this.data,
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 1, y: 0, x2: 0, y2: 0,
                                    colorStops: [
                                        { offset: 0, color: '#83bff6' }, 
                                        { offset: 1, color: '#188df0' }
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
