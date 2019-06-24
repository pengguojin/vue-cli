<!-- 北信源接口列表 -->
<!-- https://github.com/herozhou/vue-order-calendar/tree/master/vue-order-calendar -->
<template lang="html">
    <div class="main">
        <div class="table-pad">
            <div class="btn-gro">
                <el-button @click="btnSearch" type="primary" icon="el-icon-zoom-in" :size="size">查询</el-button>
            </div>
            <div class="table-div">
                <el-table ref="multipleTable" :data="list" stripe :size="size" style="width: 100%"
                        :row-style="{'font-size': '0.8rem', 'text-align': 'center'}" 
                        :cell-style="{'padding': '2px 0'}"
                        :header-cell-style="{'font-size': '0.8rem', 'color': 'black', 'text-align': 'center'}"
                        v-loading="loading"
                        element-loading-text="正在查询中，请等待"
                        element-loading-spinner="el-icon-loading">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="f6"  label="IP地址"></el-table-column>
                    <el-table-column prop="f11"  label="注册状态" width="150"></el-table-column>
                    <el-table-column prop="f16"  label="杀毒软件" width="150"></el-table-column>
                    <el-table-column prop="f17"  label="未装补丁" width="150"></el-table-column>
                    <el-table-column prop="f18"  label="系统类型" ></el-table-column>
                    <el-table-column prop="f42"  label="亚健康状态" ></el-table-column>
                    <el-table-column prop="f46"  label="登录域名称"></el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 50, 100, 200]"
                    :page-size="perPage"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalRows">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getBxyList } from '@/config/getData'

export default {
    data () {
        return {
            loading: false,
            list: [],
            size: 'mini', // 按钮大小
            currentPage: 1, //当前页号
            perPage: 5, //每页显示的最大行数
            totalRows: 0
        }
    },
    mounted() {
        this.refresh()
    },
    methods: {
        refresh () {
            getBxyList(this.currentPage, this.perPage).then(json=>{
                this.list = json.data
                this.totalRows = json.total
            })
        },
        handleSizeChange(val) { // 分页
            this.perPage = val
            this.refresh()
        },
        handleCurrentChange(val) { // 分页
            this.currentPage = val
            this.refresh()
        },
        btnSearch () {

        }
    }
}

</script>
<style lang="css" scoped>
    .main { padding: 5px; }
</style>
