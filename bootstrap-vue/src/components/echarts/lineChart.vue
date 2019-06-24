<!--  -->
<template lang="html">
    <div class="container-fluid">
      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">表格</a>
        </li>
        <li class="breadcrumb-item active">表格</li>
      </ol>
      <div class="box"></div>
    </div>
</template>

<script>
import echarts from 'echarts'

export default {
    name: 'LineChart',
  data() {
    return {
      legendArr: [],
      //color: this.$store.state.color,
      myChart: {},
      name: '折线图'
    }
  },
  methods: {
  },
  components: {
  },
  mounted() {
    let option={
        title: {
            text: '北京人口分布',
            subtext: '2017年度(单位: 万)',
            x: 'center'
        },
        legend: {
            data: ['男', '女'],
            right: 0,
            top: '50%',
            orient: 'vertical'
        },
        xAxis: [
            {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月']
            }
        ],
        yAxis: [
            {
            type: 'value'
            }
        ],
        series: [
            {
            name: '男',
            type: 'bar',
            data: [785, 23, 815, 945, 1120]
            },
            {
            name: '女',
            type: 'bar',
            data: [635, 13, 715, 1045, 1320]
            }
        ]
    };

    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.querySelector('.box'))
    this.myChart.setOption(option)
  }
}
</script>
<style lang="css" scoped>
    .box {width:800px; height:600px; border:1px solid black; margin:10px auto 0}
</style>
