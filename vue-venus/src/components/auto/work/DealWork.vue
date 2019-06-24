<!-- 指派给我的工单 -->
<template lang="html">
  <div class="table-pad">
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
                <el-table-column prop="synctime"  label="安全通报名称" width="150"></el-table-column>
                <el-table-column prop="starttime"  label="告警ID" width="150"></el-table-column>
                <el-table-column prop="endtime"  label="执行者" width="150"></el-table-column>
                <el-table-column prop="reason"  label="计划用时(小时)" ></el-table-column>
                <el-table-column prop="cdevtype"  label="状态" ></el-table-column>
                <el-table-column prop="creator"  label="开始时间"></el-table-column>
                <el-table-column prop="status"  label="完成时间"></el-table-column>
                <el-table-column prop="status"  label="安全通报分类"></el-table-column>
                <el-table-column prop="status"  label="创建者"></el-table-column>
                <el-table-column prop="status"  label="优先级"></el-table-column>
                <el-table-column prop="status"  label="编辑"></el-table-column>
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
      list: []
    }
  },
  methods: {
    newWork () {

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
