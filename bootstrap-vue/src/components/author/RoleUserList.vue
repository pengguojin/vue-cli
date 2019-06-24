<!-- 用户角色关联列表 -->
<template lang="html">
    <div>
        <el-button @click="addUser" type="success" icon="el-icon-circle-plus-outline" size="mini">添加用户</el-button>
        <el-button @click="deleteUser" type="danger" icon="el-icon-circle-close-outline" size="mini">移除用户</el-button>
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
            <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" :formatter="getTime"></el-table-column>
        </el-table>
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
        <AddRoleUser ref="addModel" :roleId="roleId" @refresh="getUser"/>
    </div>
</template>

<script>
import AddRoleUser from './AddRoleUser'
import { mkTime } from '@/config/typeConver'
import { getUserRoleList, deleteUserRole } from '@/config/getData'

export default {
    props: ['roleId'],
    data () {
        return {
            size: 'small', // 按钮大小
            loading: false,
            list: [],
            currentPage: 1, //当前页号
            perPage: 10, //每页显示的最大行数
            totalRows: 0,
            multipleSelection: [],
            list: [], // 角色关联的用户列表
        }
    },
    created () {
        this.getUser()
    },
    methods: {
        addUser () {
            this.$refs.addModel.showModel()
            this.$refs.addModel.getUser()
        },
        deleteUser () {
            if (this.multipleSelection.length === 0) {
                this.$message({ type: 'warning', message: '请选中最少一行' })
            } else {
                this.$confirm(`删除角色, 是否继续?`, '提示', {
                    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
                }).then(() => {
                    let users = []
                    this.multipleSelection.forEach(el => {
                        users.push(el.id)
                    })
                    deleteUserRole(users, this.roleId).then(msg => {
                        if (msg.code === 200 && msg.message === 'success') {
                            this.$message({ type: 'success', message: `移除用户成功` })
                            this.getUser()
                        } else {
                            this.$message.error(`移除用户失败`)
                        }
                    }).catch(err => {
                        this.$message.error('服务调用失败：' + err)
                    })
                })
            }
        },  
        getUser () {
            getUserRoleList(this.roleId, this.perPage, this.currentPage, true).then(json=>{
                this.list = json.data.rows
                this.totalRows = json.total
            })
        },
        getTime: mkTime,
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
        },
        rowClick (row) {
            // 点击行选中
            this.$refs.multipleTable.toggleRowSelection(row);
        }
    },
    watch: {
        roleId () {
            this.getUser()
        }
    },
    components: {
        AddRoleUser
    }
}

</script>
<style lang="css" scoped>
</style>
