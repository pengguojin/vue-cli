<!-- 自动封堵-主页 -->
<template lang="html">
    <div class="main">
        <div class="venu-left">
            <!-- 左侧上 -->
            <Top />
            <!-- 左侧中 -->
            <Middle />
            <!-- 左侧下 -->
            <Buttom />
        </div>

        <div class="venu-right">
            <div class="right-item">
                <div class="pane mypane">
                    <span class="h2-title"></span>
                    <el-tabs type="border-card" v-model="activeName">
                        <el-tab-pane label="封堵管理" name="AutoTable">
                            <AutoTable />
                        </el-tab-pane>
                        <el-tab-pane label="安全日报" name="SafeTable">
                            <SafeTable />
                        </el-tab-pane>
                        <el-tab-pane label="电力交易市场统计" name="SafeTable2">
                            <SafeTable2 />
                        </el-tab-pane>
                        <el-tab-pane label="编辑帮助" name="HelpEditor">
                            <HelpEditor />
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const Top = r => require.ensure([], () => r(require('@/components/auto/echart/Top')), 'Top')
const Middle = r => require.ensure([], () => r(require('@/components/auto/echart/Middle')), 'Middle')
const Buttom = r => require.ensure([], () => r(require('@/components/auto/echart/Buttom')), 'Buttom')
const HelpEditor = r => require.ensure([], () => r(require('@/components/auto/help/HelpEditor')), 'HelpEditor')
const AutoTable = r => require.ensure([], () => r(require('@/components/auto/seal/AutoTable')), 'AutoTable')
const SafeTable = r => require.ensure([], () => r(require('@/components/auto/safe/SafeTable')), 'SafeTable')
const SafeTable2 = r => require.ensure([], () => r(require('@/components/auto/safe/SafeTable2')), 'SafeTable2')

export default {
    data () {
        return {
            activeName: 'AutoTable',
            menus: [
                {name: '封堵管理', link: 'AutoTable'},
                {name: '安全日报', link: 'SafeTable'},
                {name: '电力交易市场统计', link: 'SafeTable2'},
                {name: '编辑帮助', link: 'HelpEditor'}
               
            ],
            active: 0
        }
    },
    created() {
        // 获取所有下拉列表
        this.$store.dispatch('SELECTOR')
    },
    methods: {
        fn (index) {
            this.active = index
        }
    },
    components: {
        Top, Middle, Buttom,HelpEditor,AutoTable,SafeTable, SafeTable2
    }
}

</script>
<style lang="css">
    .el-tabs__content {height: 100%;}
    .el-tab-pane {height: 100%;}
    .el-tabs__header { margin: 0!important; }
    .el-tabs--border-card>.el-tabs__content {padding: 0!important;}
</style>
