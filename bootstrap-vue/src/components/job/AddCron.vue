<!--  -->
<template lang="html">
    <b-modal ref="modelRef" title="新增触发器" :no-close-on-backdrop="true">
        <b-form>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="触发器名称：" label-for="cronName">
                <b-form-input v-model="data.cronName" type="text" placeholder="请填写触发器名称"/>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="cron表达式：" label-for="cronExpression">
                <b-form-input v-model="data.cronExpression" type="text" placeholder="请填写cron表达式"/>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="描述：" label-for="remark">
                <b-form-input v-model="data.remark" type="text" placeholder="请填写描述"/>
            </b-form-group>
        </b-form>
        <div slot="modal-footer">
            <div class="btn-gro">
                <el-button type="success" icon="el-icon-circle-plus-outline" :size="size" :disabled="saveDisabled" @click="saveCron">保存</el-button>
                <el-button type="danger" icon="el-icon-circle-close-outline" :size="size" @click="hideModel">关闭</el-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import { saveCron } from '@/config/getData'

export default {
    props: ['size', 'data'],
    data () {
        return {
            saveDisabled: false,
        }
    },
    methods: {
        saveCron () {
            saveCron(this.data).then(json=>{
                this.$message({ type: 'success', message: '保存成功' })
                this.$emit('refresh')
                this.$refs.modelRef.hide()
            }).catch(err=>{
                this.$message.error('服务调用失败：' + err)
            })
        },
        hideModel () {
            this.$refs.modelRef.hide()
        },
        showModel () {
            this.$refs.modelRef.show()
        },
    }
}

</script>
<style lang="css" scoped>
</style>
