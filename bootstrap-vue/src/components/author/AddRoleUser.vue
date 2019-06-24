<!--  -->
<template lang="html">
    <b-modal ref="modelRef" title="添加用户" :no-close-on-backdrop="true">
        <el-table ref="multipleTable" :data="list" stripe :size="size" 
                v-loading="loading" style="width: 100%"
                element-loading-text="正在查询中，请等待"
                element-loading-spinner="el-icon-loading"
                :row-style="{'font-size': '0.8rem', 'text-align': 'center'}" 
                :cell-style="{'padding': '2px 0'}"
                :header-cell-style="{'font-size': '0.8rem', 'color': 'black', 'text-align': 'center'}"
                @selection-change="changeRow"
                @row-click="rowClick">
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
        <div slot="modal-footer">
            <div class="btn-gro">
                <el-button type="success" icon="el-icon-circle-plus-outline" :size="size" @click="addUser">添加用户</el-button>
                <el-button type="danger" icon="el-icon-circle-close-outline" :size="size" @click="hideModel">关闭</el-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import { mkTime } from '@/config/typeConver'
import { getUserRoleList, saveUserRole } from '@/config/getData'

export default {
    props: ['roleId'],
    data () {
        return {
            size: 'mini', // 按钮大小
            loading: false,
            list: [],
            currentPage: 1, //当前页号
            perPage: 10, //每页显示的最大行数
            totalRows: 0,
            multipleSelection: [],
            list: [], // 角色关联的用户列表
        }
    },
    methods: {
        getUser () {
            getUserRoleList(this.roleId, this.perPage, this.currentPage, false).then(json=>{
                this.list = json.data.rows
                this.totalRows = json.total
            })
        },
        addUser() {
            if (this.multipleSelection.length === 0) {
                this.$message({ type: 'warning', message: '请选中最少一行' })
            } else {
                let users = []
                this.multipleSelection.forEach(el => {
                    users.push(el.id)
                })
                saveUserRole(users, this.roleId).then(msg => {
                    if (msg.code === 200 && msg.message === 'success') {
                        this.$message({ type: 'success', message: `添加用户成功` })
                        this.$emit('refresh')
                        this.hideModel()
                    } else {
                        this.$message.error(`添加用户失败`)
                    }
                }).catch(err => {
                    this.$message.error('服务调用失败：' + err)
                })
            }
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
        hideModel () {
            this.$refs.modelRef.hide()
        },
        showModel () {
            this.$refs.modelRef.show()
        },
        rowClick (row) {
            // 点击行选中
            this.$refs.multipleTable.toggleRowSelection(row);
        }
    }
}

</script>
<style lang="css" scoped>
</style>
