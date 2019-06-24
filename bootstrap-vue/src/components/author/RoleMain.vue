<!-- 角色管理 -->
<template lang="html">
    <div class="role-main">
        <div :class="showTree||showUser?'role-left2':'role-left'">
            <div class="btn-gro">
                <el-button @click="btnAdd" type="success" icon="el-icon-circle-plus-outline" :size="size">新增</el-button>
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
                    <el-table-column prop="name" label="角色名称" width="100"></el-table-column>
                    <el-table-column prop="type" label="角色类型"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="150" :formatter="getTime"></el-table-column>
                    <el-table-column prop="" label="操作"  width="250" fixed="right">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="btnDelete(scope.row)" type="text" size="small">删除</el-button>
                            <el-button @click.native.prevent="edit(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click.native.prevent="addUser(scope.row)" type="text" size="small">添加用户</el-button>
                            <el-button @click.native.prevent="addPermission(scope.row)" type="text" size="small">添加菜单</el-button>
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
        </div>
        <!-- 右侧菜单树 -->
        <div v-if="showTree" class="role-right">
            <div class="right-menu" @click="hideTree">
                <i class="el-icon-d-arrow-right"/>
            </div>
            <el-button @click="saveTree" type="success" icon="el-icon-circle-check-outline" size="mini">保存</el-button>
            <el-tree ref="tree" :data="treeData" show-checkbox node-key="id" :props="defaultProps" :check-strictly="true" default-expand-all></el-tree>
        </div>
        <!-- 右侧添加用户 -->
        <div v-if="showUser" class="role-right">
            <div class="right-menu" @click="hideTree">
                <i class="el-icon-d-arrow-right"/>
            </div>
            <RoleUserList :roleId="roleId"/>
        </div>
        <AddRole ref="addModel" :size="size" @refresh="refresh" :data="rowData"/>
    </div>
</template>

<script>
import AddRole from '@/components/author/AddRole'
import RoleUserList from './RoleUserList'
import { getRoleList, deleteRole, getMenuPath, getMenuForRole, saveMenuForRole } from '@/config/getData'
import { mkTime } from '@/config/typeConver'

export default {
    data () {
        return {
            rowData: { id: '', type: '', name: '', createTime: '' },
            loading: false,
            size: 'small', // 按钮大小
            list: [],
            currentPage: 1, //当前页号
            perPage: 10, //每页显示的最大行数
            totalRows: 0,
            multipleSelection: [],
            treeData: [],
            roleId: '',
            showTree: false, // 是否显示右侧菜单树
            showUser: false, // 是否显示右侧添加用户
            defaultProps: {
                children: 'chilenNode',
                label: 'title'
            }
        }
    },
    mounted () {
        this.refresh()
        getMenuPath('').then(json=>{
            this.treeData = json.data
        })
    },
    methods: {
        btnAdd() { // 添加模态框
            for(let index in this.rowData) {
                this.rowData[index] = ''
            }
            this.$refs.addModel.showModel()
        },
        refresh () { // 加载列表
            getRoleList(this.perPage, this.currentPage).then(json=>{
                this.list = json.data.rows
                this.totalRows = json.data.total
            })
        },
        getTime: mkTime,
        deleteMult () { // 删除
            let ids = '';
            this.multipleSelection.forEach(el => {
                ids += `${el.id},`
            });
            this.btnDelete(ids)
        },
        btnDelete (ids) {
            if(this.multipleSelection.length > 0){
                this.$confirm(`删除角色, 是否继续?`, '提示', {
                    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
                }).then(() => {
                    deleteRole(ids).then(json=>{
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
        edit (row) { // 编辑
            const arg = Object.assign(new Object(), row) //ES6深拷贝

            this.rowData = arg
            this.$refs.addModel.showModel()
        },
        addUser (row) { // 添加用户
            this.roleId = row.id
            this.showUser = true
            this.showTree = false
            this.$refs.multipleTable.clearSelection()
        },
        addPermission (row) { // 弹出添加菜单-并给checkbox赋值
            let pId = []
            getMenuForRole(row.id).then(json=>{
                console.log(json.data)
                json.data.forEach(el => {
                    pId.push(el.pid)
                })
                this.$refs.tree.setCheckedKeys(pId)
            })
            this.showTree = true
            this.showUser = false
            this.roleId = row.id
        },
        hideTree () { // 隐藏右侧菜单树
            this.showTree = false
            this.showUser = false
        },
        rowClick (row) { // 点击行选中
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
        },
        saveTree () { // 保存角色和菜单关联
            let treeList = this.$refs.tree.getCheckedNodes(false, true)
            saveMenuForRole(this.roleId, treeList).then(json => {
                if (json.code === 200) {
                    this.$message({ type: 'success', message: '保存成功！' })
                }
                else {
                    this.$message.error(json.message)
                }
            }).catch(err=>{
                this.$message.error('服务调用失败')
            })
        }
    },
    components: {
        AddRole, RoleUserList
    }
}

</script>
<style lang="css" scoped>
    .role-main {
        width: 100%;
        height: 100%;
    }
    .role-left {
        padding-top: 5px;
        padding-left: 5px;
        width: 100%;
        height: 100%;
        float: left;
    }
    .role-left2 {
        padding-top: 5px;
        padding-left: 5px;
        width: 70%;
        height: 100%;
        float: left;
    }
    .role-right {
        padding: 5px;
        position: relative;
        width: 30%;
        height: 100%;
        float: left;
        border-left: 1px solid #DCDFE6;
    }
    .right-menu {
        width: 38px;
        height: 40px;
        border-top: 1px solid #C0C4CC;
        border-left: 1px solid #C0C4CC;
        border-bottom: 1px solid #C0C4CC;
        border-right: 2px solid white;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        line-height: 40px;
        padding-left: 5px;
        top: 10px;
        left: -38px;
        position: absolute;
        cursor: pointer;
        z-index: 1000;
    }
</style>
