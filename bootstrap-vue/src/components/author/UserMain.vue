<!-- 用户管理 -->
<template lang="html">
    <div class="content-main">
        <div class="btn-gro">
            <el-button @click="btnAdd" type="success" icon="el-icon-circle-plus-outline" :size="size">新增</el-button>
            <el-button @click="changePwa" type="danger" icon="el-icon-circle-plus-outline" :size="size">修改密码</el-button>
            <el-button @click="deleteMult" type="danger" icon="el-icon-circle-plus-outline" :size="size">删除</el-button>
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
                <el-table-column prop="name" label="用户名" width="100"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="email" label="E-Mail" width="150"></el-table-column>
                <el-table-column prop="sex" label="性别" width="150" :formatter="getAge"></el-table-column>
                <el-table-column prop="status" label="账号状态" width="150" :formatter="getUserStatus"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="150" :formatter="getTime"></el-table-column>
                <el-table-column prop="" label="操作"  width="250" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="btnDelete(scope.row)" type="text" size="small">删除</el-button>
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
        <AddUser ref="addModel" :size="size" @refresh="refresh" :data="rowData"/>
        <ChangePwa ref="changePwa" :data="multipleSelection"/>
    </div>
</template>

<script>
import AddUser from '@/components/author/AddUser'
import ChangePwa from './ChangePwa'
import { getUserList, deleteUser } from '@/config/getData'
import { mkTime } from '@/config/typeConver'

export default {
    data () {
        return {
            loading: false,
            size: 'small', // 按钮大小
            list: [],
            currentPage: 1, //当前页号
            perPage: 10, //每页显示的最大行数
            totalRows: 0,
            multipleSelection: [],
            rowData: { id:'', name: '', password: '', age: '', email: '', sex: '', create_time: '', modify_time: '', status: '' }
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
            getUserList(this.perPage, this.currentPage).then(json=>{
                this.list = json.data.rows
                this.totalRows = json.data.total
            })
        },
        getTime: mkTime,
        getAge (row) {
            switch (row.sex) {
                case 1: return '男'; break;
                case 2: return '女'; break;
                default: return '不男不女'; break;
            }
        },
        getUserStatus (row) {
            switch (row.status) {
                case 1: return '正常'; break;
                case 2: return '被冻结'; break;
                case 3: return '被删除'; break;
                default: '不正常'; break;
            }
        },
        deleteMult (row) {
            let ids = '';
            this.multipleSelection.forEach(el => {
                ids += `${el.id},`
            });
            this.btnDelete(ids)
        },
        btnDelete (ids) {
            if(this.multipleSelection.length > 0){
                this.$confirm(`删除用户, 是否继续?`, '提示', {
                    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
                }).then(() => {
                    deleteUser(ids).then(json=>{
                        if (json.code === 200) {
                            this.$message({ type: 'success', message: '删除成功！' })
                            this.refresh()
                        }
                        else {
                            this.$message.error(json.message)
                        }
                    }).catch(err=>{
                        this.$message.error('服务调用失败')
                    })
                })
            } else {
                this.$message({ type: 'warning', message: '请选中最少一行' })
            }
        },
        changePwa () {
            if (this.multipleSelection.length != 1) {
                this.$message({ type: 'warning', message: '只能选择一行' })
            } else {
                this.$refs.changePwa.showModel()
            }
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
        AddUser, ChangePwa
    }
}

</script>
<style lang="css" scoped>
</style>
