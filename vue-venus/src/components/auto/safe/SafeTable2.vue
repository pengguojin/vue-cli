<!-- 安全日报-列表 -->
<template lang="html">
    <div class="table-pad">
        <div class="btn-gro">
            <el-button @click="btnSearch" type="primary" icon="el-icon-zoom-in" :size="size">查询</el-button>
            <el-button @click="btnExport" type="success" icon="el-icon-download" :size="size">导出结果</el-button>
            <i @click="btnHelp" title="操作手册" style="position: absolute;color:#007bff;right: 50px;font-size: 20px;margin-top: 10px;cursor:pointer" class="el-icon-question"></i>
        </div>
        <div class="table-div">
            <el-table ref="multipleTable" :data="list" stripe :size="size" 
                    v-loading="loading"
                    element-loading-text="正在查询中，请等待"
                    element-loading-spinner="el-icon-loading"
                    :row-style="{'font-size': '0.8rem'}" 
                    :cell-style="{'padding': '0px 0'}"
                    :header-cell-style="{'font-size': '0.8rem', 'color': 'black', 'text-align': 'center'}"
                    @sort-change="sortingChanged">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="date" label="日期" width="90"></el-table-column>
                <el-table-column prop="wafcount" label="WAF总攻击情况" width="150"></el-table-column>
                <el-table-column prop="topnsrcip" label="WAF攻击源情况（TOP3）" width="350">
                    <template slot-scope="scope">
                        <div v-if="scope.row.topnsrcip.length>0">
                            <div v-for="(t,index) in scope.row.topnsrcip.split('\n')" :key="index">
                                {{ t }} <br>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="topndstip" label="WAF分系统攻击情况(事件数）" width="200">
                    <template slot-scope="scope">
                        <div v-if="scope.row.topndstip.length>0">
                            <div v-for="(t,index) in scope.row.topndstip.split('\n')" :key="index">
                                {{ t }} <br>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="自动拦截IP情况" width="150" :formatter="ipCount"></el-table-column>
                <el-table-column prop="ipsblockcount" label="自动拦截IP（IPS）" width="150" ></el-table-column>
                <el-table-column prop="wafblockcount" label="自动拦截IP（WAF）" width="150"></el-table-column>
                <el-table-column prop="level5" label="攻击事件等级(严重）" width="200">
                    <template slot-scope="scope">
                        <div v-if="scope.row.level5.length>0">
                            {{scope.row.level5count}}</br>
                            <div v-for="(t,index) in scope.row.level5.split(',')" :key="index">
                                {{ t }} <br>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="level3" label="攻击事件等级(一般)" width="200">
                    <template slot-scope="scope">
                        <div v-if="scope.row.level3.length>0">
                            {{scope.row.level3count}}</br>
                            <div v-for="(t,index) in scope.row.level3.split(',')" :key="index">
                                {{ t }} <br>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="level2" label="攻击事件等级(轻微)" width="200">
                    <template slot-scope="scope">
                        <div v-if="scope.row.level2.length>0">
                            {{scope.row.level2count}}</br>
                            <div v-for="(t,index) in scope.row.level2.split(',')" :key="index">
                                {{ t }} <br>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" width="300">
                    <template slot-scope="scope">
                        <div v-if="scope.row.remark.length>0">
                            <div v-for="(t,index) in scope.row.remark.split('\n')" :key="index">
                                {{ t }}<br>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="datetime" label="起止时间点" width="280"></el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="perPage"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalRows">
            </el-pagination>
        </div>

        <SearchSafe ref="safeModel" :size="size" :data="data" @search="search"/>
        <HelpModel ref="helpModel" :text="help_text"/>
    </div>
</template>

<script>

import SearchSafe from '@/components/auto/safe/SearchSafe2'
import HelpModel from '@/components/auto/help/HelpModel'
import {getReportList, exportReport, getHelp} from '@/config/getData'

export default {
    data () {
        return {
            loading: false,
            list: [],
            size: 'mini', // 按钮大小
            currentPage: 1, //当前页号
            perPage: 5, //每页显示的最大行数
            pageSizes: [5, 10, 50],
            totalRows: 0,
            help_text: '',
            data: { startTime: '', endTime: '' }//查询条件字段
        }
    },
    methods: {
        async refresh () { // 刷新列表
            this.loading = true
            getReportList(this.data.startTime, this.data.endTime, this.currentPage, this.perPage,'DailyReportConfig2.xml').then(json=>{
                this.list = json.data
                this.totalRows = json.records
                this.loading = false
            }).catch(err=>{
                this.loading = false
            })
            
        },
        search (data) {
            this.data = data
            this.refresh()
        },
        btnSearch () {
            this.$refs.safeModel.showModel()
        },
        btnExport () {
            let url = exportReport(this.data.startTime, this.data.endTime, 'xls')
            window.open(url)
        },
        handleSizeChange(val) { // 分页
            this.perPage = val
            this.refresh()
        },
        handleCurrentChange(val) { // 分页
            this.currentPage = val
            this.refresh()
        },
        sortingChanged (column) { // 排序
            this.sortBy = column.prop
            if (column.order.indexOf('desc'))
                this.sortDesc = 'desc'
            if (column.order.indexOf('asc'))
                this.sortDesc = 'asc'
            this.refresh()
        },
        btnHelp () {
            getHelp().then(res=>{
                this.help_text = res.text
                this.$refs.helpModel.showModel()
            })          
        },
        ipCount (row) {
            return Number(row.ipsblockcount) + Number(row.wafblockcount)
        }
    },
    components: {
        SearchSafe, HelpModel
    }
}

</script>
<style lang="css" scoped>
    .table-pad {overflow-y: auto;height: 92%;}
    .btn-gro {padding: 5px 5px;}
    a {color: #007bff!important;cursor: pointer;}
    .custom-select {
        padding: 0.2rem 0rem 0.375rem 0.75rem;
    }
    .block {padding: 5px 0;text-align: right !important;}
</style>
