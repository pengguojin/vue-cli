<!-- 资产列表 -->
<template lang="html">
    <div class="content-main">
        <div class="btn-gro">
            <el-button @click="btnAdd" type="success" icon="el-icon-circle-plus-outline" :size="size">新增</el-button>
        </div>
        <div class="table-div">
            <el-table ref="multipleTable" :data="list" stripe :size="size" 
                    v-loading="loading" style="width: 100%"
                    element-loading-text="正在查询中，请等待"
                    element-loading-spinner="el-icon-loading"
                    :row-style="{'font-size': '0.8rem', 'text-align': 'center'}" 
                    :cell-style="{'padding': '2px 0'}"
                    :header-cell-style="{'font-size': '0.8rem', 'color': 'black', 'text-align': 'center'}"
                    @row-click="rowClick">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="name" label="资产名称"></el-table-column>
                <el-table-column prop="type.type" label="资产类型"  width="90"></el-table-column>
                <el-table-column prop="username" label="用户名" width="150"></el-table-column>
                <el-table-column prop="url" label="URL地址" width="350"></el-table-column>
                <el-table-column prop="port" label="端口"  width="90"></el-table-column>
                <el-table-column label="操作"  width="200">
                    <template slot-scope="scope">
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
        <AddAssets ref="addModel" :size="size" @refresh="refresh" :data="rowData"/>
    </div>
</template>

<script>
import { getAssets } from '@/config/getData'
import AddAssets from './AddAssets'

export default {
  data () {
    return {
        rowData: { name: '', type: '', username: '', password: '', port: '', url: '', typeId: '' },
        loading: false,
        size: 'small', // 按钮大小
        list: [],
        currentPage: 1, //当前页号
        perPage: 10, //每页显示的最大行数
        totalRows: 0
    }
  },
  mounted() {
      this.refresh()
  },
  methods: {
    refresh () {
        getAssets(this.perPage, this.currentPage).then(json=>{
            this.list = json.data.rows
        })
    },
    btnAdd () {
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
    edit (row) {
        const arg = Object.assign(new Object(), row) //ES6深拷贝
        this.rowData = arg
        this.$refs.addModel.showModel()
    }
  },
  components: {
      AddAssets
  }
}

</script>
<style lang="css" scoped>
</style>
