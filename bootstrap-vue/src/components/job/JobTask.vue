<!--  -->
<template lang="html">
    <div class="content-main">
        <div class="btn-gro">
            <el-button @click="btnAdd" type="success" icon="el-icon-circle-plus-outline" :size="size">新增</el-button>
            <el-button @click="changeJobs('run')" type="success" icon="el-icon-circle-check-outline" :size="size">批量启动</el-button>
            <el-button @click="changeJobs('resume')" type="primary" icon="el-icon-refresh" :size="size">批量重置</el-button>
            <el-button @click="changeJobs('pause')" type="warning" icon="el-icon-remove-outline" :size="size">批量暂停</el-button>
            <el-button @click="changeJobs('delete')" type="danger" icon="el-icon-circle-close-outline" :size="size">批量删除</el-button>
            <el-button @click="refresh" type="primary" icon="el-icon-refresh" :size="size">刷新</el-button>
        </div>
        <div class="table-div">
            <el-table ref="multipleTable" :data="list" stripe :size="size" 
                    v-loading="loading" style="width: 100%"
                    element-loading-text="正在查询中，请等待"
                    element-loading-spinner="el-icon-loading"
                    :row-style="{'font-size': '0.8rem', 'text-align': 'center'}" 
                    :cell-style="{'padding': '2px 0'}"
                    :header-cell-style="{'font-size': '0.8rem', 'color': 'black', 'text-align': 'center'}"
                    @row-click="rowClick"
                    @selection-change="changeRow">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="jobNameCn" label="任务名称" width="100"></el-table-column>
                <el-table-column prop="description" label="任务内容（描述）"></el-table-column>
                <el-table-column prop="cron.cronName" label="定时运行时间" width="150"></el-table-column>
                <el-table-column prop="" label="状态"  width="90" :formatter="getStatus"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="150" :formatter="getTime"></el-table-column>
                <el-table-column prop="lastUpdateTime" label="下次执行时间" width="150" :formatter="getTime"></el-table-column>
                <el-table-column prop="" label="操作"  width="250" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="changeJob(scope.row, 'run')" type="text" size="small">启动</el-button>
                        <el-button @click.native.prevent="changeJob(scope.row, 'resume')" type="text" size="small">重置</el-button>
                        <el-button @click.native.prevent="changeJob(scope.row, 'pause')" type="text" size="small">暂停</el-button>
                        <el-button @click.native.prevent="changeJob(scope.row, 'delete')" type="text" size="small">删除</el-button>
                        <el-button @click.native.prevent="edit(scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
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
        <AddLayer ref="addModel" :size="size" @refresh="refresh" :data="rowData"/>
    </div>
</template>

<script>
import AddLayer from '@/components/job/AddTask'
import { getAllJob, changeTask } from '@/config/getData'
import { mkTime, getTaskStatus } from '@/config/typeConver'

export default {
    data () {
        return {
            rowData: { createTime: '', cronId: '', description: '', enable: '', id: '', jobGroup: '', jobName: '', lastUpdateTime: '', pause: '', triggerGroup: '', triggerName: '', assetsId: '', jobNameCn: '' },
            loading: false,
            size: 'small', // 按钮大小
            list: [],
            currentPage: 1, //当前页号
            perPage: 10, //每页显示的最大行数
            totalRows: 0,
            multipleSelection: []
        }
    },
    created() {
        this.refresh()
    },
    methods: {
        btnAdd() {
            for(let index in this.rowData) {
                this.rowData[index] = ''
            }
            this.$refs.addModel.showModel()
        },
        refresh () {
            getAllJob(this.perPage, this.currentPage).then(json=>{
                this.list = json.data.rows
                this.totalRows = json.data.total
            })
        },
        getStatus: getTaskStatus,
        getTime: mkTime,
        changeJob (row, status) { // 操作单个任务
            this.changeTask(row.id, status)
        },
        changeJobs (status) { // 批量操作任务
            if(this.multipleSelection.length > 0){
                let ids = '';
                this.multipleSelection.forEach(el => {
                    ids += `${el.id},`
                });
                this.changeTask(ids, status);
            } else {
                this.$message({ type: 'warning', message: '请选中最少一行' })
            }
        },
        changeTask (id, status) { // 修改任务
            let oTxt = ''
            switch (status) {
                case 'run': oTxt = '启动'; break;
                case 'delete': oTxt = '删除'; break;
                case 'resume': oTxt = '重置'; break;
                case 'pause': oTxt = '暂停'; break;
                default: break;
            }
            this.$confirm(`${oTxt}该任务, 是否继续?`, '提示', {
                confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
            }).then(() => {
                changeTask(id, status).then(msg => {
                    if (msg.code === 200 && msg.message === 'success') {
                        this.$message({ type: 'success', message: `${oTxt}任务成功` })
                        this.refresh()
                    } else {
                        this.$message.error(`${oTxt}任务失败`)
                    }
                }).catch(err => {
                    this.$message.error('服务调用失败：' + err)
                })
            })
        },
        edit (row) {
            const arg = Object.assign(new Object(), row) //ES6深拷贝
            this.rowData = arg
            this.$refs.addModel.showModel()
        },
        rowClick (row) {
            // 点击行选中
            this.$refs.multipleTable.toggleRowSelection(row);
        },
        handleSizeChange(val) { // 分页
            this.perPage = val
            this.refresh()
        },
        handleCurrentChange(val) { // 分页
            this.currentPage = val
            this.refresh()
        },
        changeRow (val) { // 获取选中行
            this.multipleSelection = val;
        }
    },
    components: {
        AddLayer
    }
}

</script>
<style lang="css" scoped>
</style>
