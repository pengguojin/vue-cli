<!-- 自动封堵-新增模态框 -->
<template lang="html">
    <!-- 新增-弹出层 -->
    <b-modal ref="modelRef" title="新增和修改" :no-close-on-backdrop="true">
        <b-form>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="封堵IP：" label-for="ip">
                <b-form-input v-model="rowData.ip" :disabled="!addOrEdit" type="text" placeholder="填写封堵IP" :state="!$v.rowData.ip.$invalid"/>
            </b-form-group>

            <b-form-group horizontal :label-cols="3" label-size="sm" label="封堵原因：" label-for="reason">
                <b-form-input v-model="rowData.reason" id="reason" :disabled="!addOrEdit&&!editable" type="text" placeholder="填写封堵原因" :state="!$v.rowData.reason.$invalid"/>
            </b-form-group>

            <b-form-group v-if="addOrEdit" horizontal :label-cols="3" label-size="sm" label="封堵周期：">
                <b-form-radio-group buttons button-variant="outline-primary" size="sm" @input="change" v-model="selected" :options="options" /><br/>
            </b-form-group>

            <b-form-group v-if="addOrEdit" horizontal :label-cols="3" label-size="sm" >
                <b-form-input v-model="cycle" type="number" @input="change" placeholder="封堵周期"/>
            </b-form-group>

            <b-form-group horizontal :label-cols="3" label-size="sm" label="封堵开始时间：" label-for="endtime">
                <vue-datepicker-local v-model="rowData.starttime" autoComplete="off" :disabled="!addOrEdit" format="YYYY-MM-DD HH:mm:ss" :invalid="true" :state="!$v.rowData.starttime.$invalid" placeholder="填写封堵开始时间"/>
            </b-form-group>

            <b-form-group horizontal :label-cols="3" label-size="sm" label="封堵结束时间：" label-for="endtime">
                <vue-datepicker-local v-model="rowData.endtime" autoComplete="off" :disabled="!addOrEdit&&!editable" format="YYYY-MM-DD HH:mm:ss" :disabled-date="disabledDate" :invalid="true" :state="!$v.rowData.endtime.$invalid" placeholder="填写封堵结束时间"/>
            </b-form-group>

            <b-form-group v-if="addOrEdit" horizontal :label-cols="3" label-size="sm" label="外网/内网：" label-for="status">
                <b-form-select v-model="rowData.ipType" required placeholder="填写外网/内网">
                    <template slot="first">
                        <option :value="''">-- 请选择 --</option>
                        <option :value="0">外网</option>
                        <option :value="1">内网</option>
                    </template>
                </b-form-select>
            </b-form-group>
        </b-form>
        <div slot="modal-footer">
            <div class="btn-gro">
                <el-button @click="save" type="success" icon="el-icon-circle-plus-outline" :size="size" :disabled="saveDisabled">保存</el-button>
                <el-button @click="hideModel" type="danger" icon="el-icon-circle-close-outline" :size="size">关闭</el-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import { required, ipAddress } from "vuelidate/lib/validators";
import VueDatepickerLocal from "@/components/ui/datepicker/VueDatepickerLocal";
import { saveSeal } from "@/config/getData";

export default {
  data() {
    return {
      selected: "none",
      options: [
        { text: "自定义", value: "none" },
        { text: "一天", value: "day" },
        { text: "一周", value: "week" },
        { text: "一月", value: "mouth" },
        { text: "一年", value: "year" }
      ],
      cycle: 1,
      saveDisabled: false
    };
  },
  props: ["size", "rowData", "editable", "addOrEdit"],
  validations: {
    rowData: {
      ip: { required, ipAddress },
      reason: { required },
      starttime: { required },
      endtime: { required },
      ipType: { required }
    }
  },
  methods: {
    disabledDate(time) {
      // 如果是时间格式，不用转换，否则转换成时间格式
      let nowTime = 0;
      if (typeof this.rowData.starttime === "object") {
        nowTime = this.rowData.starttime.getTime();
      } else {
        let date = new Date(this.rowData.starttime);
        nowTime = date.getTime();
      }
      return nowTime > time.getTime();
    },
    hideModel() {
      this.$refs.modelRef.hide();
    },
    showModel() {
      this.$refs.modelRef.show();
    },
    save() {
      console.log(this.rowData);

      if (this.$v.$invalid) {
        this.$message({ type: "warning", message: "请填写必填项" });
      } else {
        this.saveDisabled = true;
        saveSeal(this.rowData)
          .then(json => {
            if (json.return) {
              this.$refs.modelRef.hide();
              this.$emit("search");
              this.$message({ type: "success", message: "保存成功" });
              this.saveDisabled = false;
            } else {
              this.$message.error("保存失败");
              this.saveDisabled = false;
            }
          })
          .catch(res => {
            this.$message.error(`调用服务失败：${res}`);
            this.saveDisabled = false;
          });
      }
    },
    change() {
      this.$emit("btnChange", this.selected, this.cycle);
    }
  },
  components: {
    VueDatepickerLocal
  }
};
</script>
<style lang="css" scoped>
</style>
