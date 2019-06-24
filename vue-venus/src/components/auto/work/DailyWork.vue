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
                <el-table-column prop="alarmId"  label="告警ID" width="150"></el-table-column>
                <el-table-column prop="executor"  label="执行者" width="150"></el-table-column>
                <el-table-column prop="planTime"  label="计划用时(小时)" ></el-table-column>
                <el-table-column prop="status"  label="状态" ></el-table-column>
                <el-table-column prop="beginTime"  label="开始时间"></el-table-column>
                <el-table-column prop="compleTime"  label="完成时间"></el-table-column>
                <el-table-column prop="classify"  label="安全通报分类"></el-table-column>
                <el-table-column prop="createBy"  label="创建者"></el-table-column>
                <el-table-column prop="priority"  label="优先级"></el-table-column>
                <el-table-column label="编辑">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column  label="反馈">
                    <template slot-scope="scope">
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
  methods: {
    newWork () {
      this.$router.push('/work/new')
    },
    searchWork () {

    },
    refresh (row) {
      
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
    }
  }
}

</script>
<style lang="css" scoped>
</style>
