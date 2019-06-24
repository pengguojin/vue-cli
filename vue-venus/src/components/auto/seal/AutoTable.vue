<!-- 自动封堵-右侧 -->
<template lang="html">
    <div class="table-pad">
        <div class="btn-gro">
            <el-button @click="btnAdd" type="success" icon="el-icon-circle-plus-outline" :size="size">新增</el-button>
            <el-button @click="btnSearch" type="primary" icon="el-icon-zoom-in" :size="size">查询</el-button>
            <el-button @click="btnDelete" type="danger" icon="el-icon-circle-close-outline" :size="size">删除</el-button>
            <el-button @click="btnRefresh" type="primary" icon="el-icon-refresh" :size="size">刷新</el-button>
            <el-button @click="btnConfig" type="primary" icon="el-icon-setting" :size="size">配置</el-button>
            <el-button @click="btnExport" type="success" icon="el-icon-upload2" :size="size">{{export_msg}}</el-button>
            <el-button @click="btnImport" type="success" icon="el-icon-download" :size="size">批量导入</el-button>
            <el-button @click="btnBeblock" type="success" icon="el-icon-download" :size="size">解封</el-button>
            <i @click="btnHelp" title="操作手册" style="position: absolute;color:#007bff;right: 50px;font-size: 20px;margin-top: 10px;cursor:pointer" class="el-icon-question"></i>
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
                <el-table-column prop="ipType"  label="内网/外网" :formatter="getNetWork"></el-table-column>
                <el-table-column prop="ip"  label="封堵IP"></el-table-column>
                <el-table-column prop="synctime"  label="发现时间" width="150" :formatter="getTime" sortable="sortable"></el-table-column>
                <el-table-column prop="starttime"  label="封堵开始时间" width="150" :formatter="getTime" sortable="sortable"></el-table-column>
                <el-table-column prop="endtime"  label="封堵结束时间" width="150" :formatter="getTime" sortable="sortable"></el-table-column>
                <el-table-column prop="reason"  label="封堵原因" ></el-table-column>
                <el-table-column prop="cdevtype"  label="信息来源" ></el-table-column>
                <el-table-column prop="creator"  label="创建者"></el-table-column>
                <el-table-column prop="status"  label="推送状态"></el-table-column>
                <el-table-column  label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row, scope)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteList(scope.row)" type="text" size="small">删除</el-button>
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
        
        <AddLayer ref="addModel" :size="size" @search="search" :rowData="rowData" :editable="editable" :addOrEdit="addOrEdit" @btnChange="btnChange" />
        <SearchLayer ref="searchModel" :size="size" :item="searchItem" @search="search" @reset="reset"/>
        <ConfigLayer ref="configModel" :size="size"/>
        <ImportLayer ref="importModel" :size="size"  @search="search"/>
        <HelpModel ref="helpModel" :text="help_text"/>
    </div>
</template>

<script>
import { formatTime } from "@/libs/time";
import AddLayer from "@/components/auto/seal/AddLayer";
import SearchLayer from "@/components/auto/seal/SearchLayer";
import ConfigLayer from "@/components/auto/seal/ConfigLayer";
import ImportLayer from "@/components/auto/seal/ImportLayer";
import HelpModel from "@/components/auto/help/HelpModel";
import {
  getSealList,
  importSeal,
  getHelp,
  deleteSeal,
  deblock
} from "@/config/getData";

export default {
  data() {
    return {
      loading: false,
      list: [],
      editable: false, // 判断推送状态
      addOrEdit: true, //判断是添加还是编辑
      size: "mini", // 按钮大小
      currentPage: 1, //当前页号
      perPage: 10, //每页显示的最大行数
      sortDesc: "desc", // 排序
      sortBy: "synctime", // 默认按照那个字段排序
      totalRows: 0,
      searchItem: {
        fields: ["synctime", "synctime", "ip", "cdevtype", "creator", "status"],
        values: {
          startTime: "",
          endTime: "",
          ip: "",
          cdevtype: "",
          creator: "",
          status: ""
        },
        operators: [">=", "<=", "contains", "contains", "contains", "contains"]
      }, //查询条件字段
      rowData: {
        id: "",
        ip: "",
        synctime: "",
        starttime: "",
        endtime: "", // 新增修改字段
        reason: "",
        source: "",
        creator: "",
        status: "",
        cycle: "",
        ipType: ""
      },
      help_text: "",
      export_abled: false,
      export_msg: "导出结果"
    };
  },
  created() {
    this.refresh();
  },
  methods: {
    btnAdd() {
      //显示新增模态框
      this.editable = true;
      this.addOrEdit = true;
      for (let row in this.rowData) {
        this.rowData[row] = "";
      }
      this.$refs.addModel.showModel();
    },
    btnSearch() {
      //显示查询模态框
      this.$refs.searchModel.showModel();
    },
    btnRefresh() {
      //刷新
      window.location.reload();
    },
    btnConfig() {
      //显示配置模态框
      this.$refs.configModel.showModel();
    },
    btnImport() {
      // 显示批量导入
      this.$refs.importModel.showModel();
    },
    async refresh() {
      // 刷新列表
      this.loading = true;
      getSealList(
        this.currentPage,
        this.perPage,
        this.searchItem,
        this.sortBy,
        this.sortDesc
      )
        .then(json => {
          this.list = json.data;
          this.totalRows = json.records;
          this.loading = false;
        })
        .catch(err => {
          this.$message.error("出错");
          this.loading = false;
        });
    },
    handleSizeChange(val) {
      // 分页
      this.perPage = val;
      this.refresh();
    },
    handleCurrentChange(val) {
      // 分页
      this.currentPage = val;
      this.refresh();
    },
    reset() {
      // 重置表单
      const items = {
        startTime: "",
        endTime: "",
        ip: "",
        cdevtype: "",
        creator: "",
        status: ""
      };
      this.searchItem.values = Object.assign({}, items);
    },
    btnHelp() {
      getHelp().then(res => {
        this.help_text = res.text;
        this.$refs.helpModel.showModel();
      });
    },
    search(json) {
      // 查询按钮，刷新表格
      if (json) this.searchItem = json;
      this.currentPage = 1;
      this.refresh();
    },
    edit(row) {
      //行编辑
      // 编辑 和 新纪录 可以编辑封堵原因和封堵结束时间
      this.addOrEdit = false;
      this.editable = false;
      let s = row.status;
      if (s === "新记录" || s === "已封堵") this.editable = true;
      const arg = Object.assign(new Object(), row); //ES6深拷贝
      arg.starttime = formatTime(arg.starttime);
      arg.endtime = formatTime(arg.endtime);
      this.rowData = arg;
      this.$refs.addModel.showModel();
      this.$refs.multipleTable.clearSelection();
    },
    btnExport() {
      // 导出
      this.export_abled = true;
      this.export_msg = "正在导出，请等待...";
      let url = importSeal(this.searchItem, this.currentPage, this.perPage);
      window.open(url);
      this.export_abled = false;
      this.export_msg = "导出结果";
    },
    sortingChanged(column) {
      // 排序
      this.sortBy = column.prop;
      if (column.order.indexOf("desc")) this.sortDesc = "desc";
      if (column.order.indexOf("asc")) this.sortDesc = "asc";
      this.refresh();
    },
    btnDelete() {
      // 删除
      let arr = this.$refs.multipleTable.selection;
      if (arr.length > 0) {
        this.deleteList(arr);
      } else {
        this.$message({ type: "warning", message: "请选择最少一条记录" });
      }
    },
    deleteList(rows) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let ids = "";
        if (rows.length > 1) {
          rows.forEach(item => (ids += item.id + ","));
        } else {
          ids = rows.id;
        }
        deleteSeal(ids)
          .then(res => {
            this.$message({ type: "success", message: "删除成功" });
            this.refresh();
          })
          .catch(res => {
            this.$message.error("服务调用失败：" + res);
          });
      });
    },
    btnBeblock() {
      let arr = this.$refs.multipleTable.selection;
      if (arr.length > 0) {
        //解封
        this.$confirm("解封IP, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.loading = true;
          let ids = "";
          arr.forEach(item => (ids += item.id + ","));
          deblock(ids)
            .then(res => {
              this.loading = false;
              this.$message({ type: "success", message: "解封成功" });
              this.refresh();
            })
            .catch(res => {
              this.loading = false;
              this.$message.error("服务调用失败：" + res);
            });
        });
      } else {
        this.$message({ type: "warning", message: "请选择最少一条记录" });
      }
    },
    btnChange(val, cycle) {
      // 周期按钮组
      let nowDate = new Date();
      this.rowData.starttime = nowDate;
      let endDate = new Date();
      cycle = Number(cycle);
      switch (val) {
        case "day":
          endDate.setDate(endDate.getDate() + cycle);
          break;
        case "week":
          endDate.setDate(endDate.getDate() + cycle * 7);
          break;
        case "mouth":
          endDate.setMonth(endDate.getMonth() + cycle);
          break;
        case "year":
          endDate.setFullYear(endDate.getFullYear() + cycle);
          break;
      }
      this.rowData.endtime = endDate;
    },
    rowClick(row) {
      // 点击行选中
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    getTime(row, column) {
      // 时间转换
      if (row[column.property]) {
        let time = new Date(row[column.property]);
        let month = time.getMonth() + 1;
        let date = time.getDate();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds();
        return `${time.getFullYear()}-${month < 10 ? "0" + month : month}-${
          date < 10 ? "0" + date : date
        } ${hour < 10 ? "0" + hour : hour}:${
          minute < 10 ? "0" + minute : minute
        }:${second < 10 ? "0" + second : second}`;
      } else {
        return "";
      }
    },
    getNetWork(row, col) {
      if (row.ipType === 1) {
        return "内网";
      } else {
        return "外网";
      }
    }
  },
  components: {
    AddLayer,
    ConfigLayer,
    SearchLayer,
    ImportLayer,
    HelpModel
  }
};
</script>
<style lang="css" scoped>
.table-pad {
  overflow-y: auto;
  height: 92%;
}
.btn-gro {
  padding: 5px 5px;
}
a {
  color: #007bff !important;
  cursor: pointer;
}
.custom-select {
  padding: 0.2rem 0rem 0.375rem 0.75rem;
}
.block {
  padding: 5px 0;
  text-align: right !important;
}
</style>
