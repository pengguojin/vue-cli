<!-- 自定义cron表达式 -->
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
                  :cell-style="{'padding': '2px 0'}" @row-click="rowClick"
                  :header-cell-style="{'font-size': '0.8rem', 'color': 'black', 'text-align': 'center'}">
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="cronName" label="触发器名称"></el-table-column>
              <el-table-column prop="cronExpression" label="cron表达式" width="200"></el-table-column>
              <el-table-column prop="remark" label="描述"></el-table-column>
              <el-table-column prop="datetime" label="操作">
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
      <AddCron ref="addModel" :size="size" @refresh="refresh" :data="rowData"/>
  </div>
</template>

<script>
import AddCron from './AddCron'
import { getAllCron } from '@/config/getData'

export default {
  data () {
    return {
      loading: false,
      size: 'small', // 按钮大小
      list: [],
      currentPage: 1, //当前页号
      perPage: 10, //每页显示的最大行数
      totalRows: 0,
      rowData: {
        id: '',
        cronName: '',
        cronExpression: '',
        remark: ''
      }
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    refresh () {
      getAllCron(this.perPage, this.currentPage).then(json => {
        this.list = json.data.rows
        this.totalRows = json.data.total
      })
    },
    btnAdd (){
      for(let index in this.rowData) {
        this.rowData[index] = ''
      }
      this.$refs.addModel.showModel()
    },
    edit (row) {
      const arg = Object.assign(new Object(), row) //ES6深拷贝
      this.rowData = arg
      this.$refs.addModel.showModel()
    },
    handleSizeChange(val) { // 分页
      this.perPage = val
      this.refresh()
    },
    handleCurrentChange(val) { // 分页
      this.currentPage = val
      this.refresh()
    },
    rowClick (row) {
        // 点击行选中
        this.$refs.multipleTable.toggleRowSelection(row);
    }
  },
  components: {
    AddCron
  }
}

</script>
<style lang="css" scoped>
</style>
