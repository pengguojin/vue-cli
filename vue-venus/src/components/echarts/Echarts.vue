<!-- echart组件 -->
<template>
  <div :id="id" :class="className">
  </div>
</template>

<script>
    export default {
        props: ['id', 'className', 'options'],
        data: function () {
            return {
                myChart: ''
            }
        },
        mounted: function(){
            this.init()
        },
        methods: {
            init () {
                this.myChart = this.$echarts.init(document.getElementById(this.id));
                this.myChart.setOption(this.options);
            }  
        },
        watch: {
            //观察option的变化
            options: {
                handler(newVal, oldVal) {
                    if (this.myChart) {
                        if (newVal) {
                            this.myChart.setOption(newVal);
                        } else {
                            this.myChart.setOption(oldVal);
                        }
                    } else {
                        this.init(); // 如果没有初始化调用初始化方法
                    }
                },
                deep: true //对象内部属性的监听，关键。
            }
        }
    }
</script>

<style>
/** 图表相关样式 **/
.ips{
	width: 100%;
	height: 95%;
}

.waf{
	width: 100%;
	height: 90%;
}

.soc {
	width: 100%;
	height: 100%;
}
</style>