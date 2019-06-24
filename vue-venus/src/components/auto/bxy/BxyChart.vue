<!--  -->
<template lang="html">
    <div class="pane mypane">
        <span class="h2-title"></span>
        <PaneItem :id="'ips'" :title="'统计'" :options="options" :className="'soc'"/>
    </div>
</template>

<script>
import PaneItem from '@/components/auto/echart/PaneItem'
export default {
    mounted () {
        this.$store.dispatch('BXY_REPORT')
    },
    computed: {
        data () { // 监听图表数据，然后刷新，options也跟着改变
            return this.$store.state.bxyList
        },
        options () {
            let soc = []
            if (this.data.length > 0) {
                this.data.forEach(e => soc.push(e.name))
            }
            return {
                grid: {
                    left: '5%',
                    top: '10%',
                    right: '5%',
                    borderWidth: 0
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}",
                },
                calculable: true,
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#dc143c'
                            }
                        }
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        data: soc,
                        show: false
                    }                    
                ],
                series: [
                    {
                        name: '北信源信息统计',
                        type: 'bar',
                        data: this.data,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = [
                                    '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                    '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                    '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
                                    '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{b}\n{c}'
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
