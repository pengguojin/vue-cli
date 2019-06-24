<!-- 添加资产 -->
<template lang="html">
    <b-modal ref="modelRef" title="新增任务" :no-close-on-backdrop="true">
        <b-form>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="资产名称：" label-for="jobNameCn">
                <b-form-input v-model="data.name" type="text" placeholder="请填写资产名称"/>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="资产类型：" label-for="cornId">
                <b-form-select v-model="data.typeId" :options="optionsAssets" placeholder="请填写资产类型">
                    <template slot="first">
                        <option :value="''">-- 请选择 --</option>
                    </template>
                </b-form-select>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="用户名：" label-for="className">
                <b-form-input v-model="data.username" type="text" placeholder="请填写用户名"/>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="密码：" label-for="className">
                <b-form-input v-model="data.password" type="password" placeholder="请填写密码"/>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="端口：" label-for="className">
                <b-form-input v-model="data.port" type="text" placeholder="请填写端口"/>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="URL地址：" label-for="className">
                <b-form-input v-model="data.url" type="text" placeholder="请填写URL地址"/>
            </b-form-group>
        </b-form>
        <div slot="modal-footer">
            <div class="btn-gro">
                <el-button type="success" icon="el-icon-circle-plus-outline" :size="size" @click="save">保存</el-button>
                <el-button type="danger" icon="el-icon-circle-close-outline" :size="size" @click="hideModel">关闭</el-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import { saveAssets, getSelect } from '@/config/getData'

export default {
    props: ['size', 'data'],
    data () {
        return {
            optionsAssets: []
        }
    },
    mounted() {
        getSelect('type').then(json => {
            this.optionsAssets = json.data
        })
    },
    methods: {
        hideModel () {
            this.$refs.modelRef.hide()
        },
        showModel () {
            this.$refs.modelRef.show()
        },
        save () {
            this.optionsAssets.forEach(el => {
                if(el.text === this.data.typeId) {
                    this.data.type = el.value
                }
            })
            saveAssets(this.data).then(json=>{
                this.$message({ type: 'success', message: '保存成功' })
                this.$refs.modelRef.hide()
                this.$emit('refresh')
            }).catch(err=>{
                this.$message.error('服务调用失败')
            })
        }
    }
}

</script>
<style lang="css" scoped>
</style>
