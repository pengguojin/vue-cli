<!-- 全部工单 -->
<template lang="html">
  <div class="table-pad">
        <div class="btn-gro">
          <el-button @click="newWork" type="success" icon="el-icon-circle-plus-outline" :size="size">新建</el-button>
          <el-button @click="searchWork" type="primary" icon="el-icon-zoom-in" :size="size">查询</el-button>
        </div>
        <div class="table-div">
            <el-table ref="multipleTable" :data="list" stripe :size="size" style="width: 100%"
                    :row-style="{'font-size': '0.8rem', 'text-align': 'center'}" 
                    :cell-style="{'padding': '2px 0'}"
                    :header-cell-style="{'font-size': '0.8rem', 'color': 'black', 'text-align': 'center'}"
                    @sort-change="sortingChanged"
                    @row-click="rowClick"
                    v-loading="loading"
                    element-loading-text="正在查询中，请等待"
                    element-loading-spinner="el-icon-loading">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="name"  label="安全通报名称" width="150"></el-table-column>
                <el-table-column prop="status"  label="状态" ></el-table-column>
                <el-table-column prop="beginTime"  label="开始时间" :formatter="getTime"></el-table-column>
                <el-table-column prop="complateTime"  label="完成时间" :formatter="getTime"></el-table-column>
                <el-table-column prop="classify"  label="通报分类"></el-table-column>
                <el-table-column prop="createTime"  label="创建者" :formatter="getTime"></el-table-column>
                <el-table-column prop="priority"  label="优先级"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small">反馈</el-button>
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
</template>

<script>
import { getWorkList } from '@/config/getData'

export default {
  data () {
    return {
      size: 'mini', // 按钮大小
      currentPage: 1, //当前页号
      perPage: 10, //每页显示的最大行数
      totalRows: 0,
      loading: false,
      list: [],
    }
  },
  mounted () {
    getWorkList(this.perPage, this.currentPage).then(json=>{
      this.list = json.data
      this.totalRows = json.total
    })
  },
  methods: {
    newWork () {
      this.$router.push({name: 'NewWork', params: { id: '' }})
    },
    searchWork () {

    },
    refresh (row) {
      
    },
    edit (id) {
      console.log(id)
      this.$router.push({name: 'NewWork', params: { id }})
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
    },
    rowClick (row) {
      // 点击行选中
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    getTime (row, column) { // 时间转换
      if (row[column.property]) {
        let time = new Date(row[column.property])
        let month = time.getMonth() + 1
        let date = time.getDate()
        let hour = time.getHours()
        let minute = time.getMinutes()
        let second = time.getSeconds()
        return `${time.getFullYear()}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
      } else {
        return ''
      }
    }
  }
}

</script>
<style lang="css" scoped>
</style>
