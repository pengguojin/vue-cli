<!-- 自动封堵-批量导入模态框 -->
<template lang="html">
    <b-modal ref="modelRef" title="批量导入" :no-close-on-backdrop="true">
        <b-form>
            <b-form-file v-model="file" :state="Boolean(file)" placeholder="选择导入的文件..." accept=".xls,.xlsx"></b-form-file>
            <div class="mt-3">选中的文件: {{file && file.name}}</div>
            <div class="lp">
                <p>导入格式说明(请根据下面格式，导入Excel)：</p>
                <el-table ref="multipleTable" :data="items" stripe :size="size" 
                    :row-style="{'font-size': '0.8rem'}" 
                    :cell-style="{'padding': '2px 0'}"
                    :header-cell-style="{'font-size': '0.8rem', 'color': 'black'}">
                    <el-table-column prop="ip"  label="封堵IP" width="80"></el-table-column>
                    <el-table-column prop="synctime"  label="发现时间" width="90"></el-table-column>
                    <el-table-column prop="starttime"  label="封堵开始时间" width="100"></el-table-column>
                    <el-table-column prop="endtime"  label="封堵结束时间" width="100"></el-table-column>
                    <el-table-column prop="reason"  label="封堵原因" width="90"></el-table-column>
                </el-table>
            </div>
        </b-form>
        <div slot="modal-footer">
            <div class="btn-gro">
                <el-button @click="btnImport" type="success" :icon="disabled?'el-icon-loading':'el-icon-circle-plus-outline'" :disabled="disabled" :size="size">{{msg}}</el-button>
                <el-button @click="hideModel" type="danger" icon="el-icon-circle-close-outline" :size="size">关闭</el-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import {exportSeal} from '@/config/getData'

export default {
    props: ['size'],
    data () {
        return {
            items: [
                {ip: '文本格式', synctime:'时间格式', starttime:'时间格式', endtime:'时间格式', reason:'文本格式'},
                {ip: '127.0.0.1', synctime:'2018/7/1', starttime:'2018/7/2', endtime:'2018/7/2', reason:'封堵原因'}
            ],
            file: null,
            msg: '批量导入',
            disabled: false
        }
    },
    methods: {
        async btnImport () {
            this.msg = '正在导入，请不用关闭窗口...'
            this.disabled = true
            exportSeal(this.file).then(json=>{
                if(json.result === "success"){
                    this.msg = '批量导入'
                    this.disabled = false
                    this.$emit('search')
                    // 刷新图表
                    this.$store.dispatch('IPS_ECHART')
                    this.$store.dispatch('WAF_ECHART')
                    this.$store.dispatch('SOC_ECHART')
                    this.$message({ type: 'success', message: '导入成功' })
                } else {
                    this.$message.error('导入失败')
                    this.msg = '批量导入'
                    this.disabled = false
                }
            }).catch(err=>{
                this.$message.error('服务调用失败：' + err)
                this.msg = '批量导入'
                this.disabled = false
            })
        },
        hideModel () {
            this.$refs.modelRef.hide()
        },
        showModel () {
            this.$refs.modelRef.show()
        }
    }
}

</script>
<style lang="css" scoped>
    .lp {
        color: red;
        padding-top: 20px;
    }

    .lp p {padding: 0;margin: 0;font-size: 1.2rem;font-family:'Microsoft YaHei'}
</style>
