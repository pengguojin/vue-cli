<!--  -->
<template lang="html">
    <b-modal ref="modelRef" title="新增任务" :no-close-on-backdrop="true">
        <b-form>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="任务名称：" label-for="jobNameCn">
                <b-form-input v-model="data.jobNameCn" type="text" placeholder="请填写任务名称"/>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="任务描述：" label-for="description">
                <b-form-input v-model="data.description" type="text" placeholder="请填写任务描述"/>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="开启/暂停：" label-for="pause">
                <b-form-select v-model="data.pause" :options="optionsPause" placeholder="请填写开启/暂停">
                    <template slot="first">
                        <option :value="''">-- 请选择 --</option>
                    </template>
                </b-form-select>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="定时运行时间：" label-for="cornId">
                <b-form-select v-model="data.cronId" :options="options" placeholder="请填写定时运行时间">
                    <template slot="first">
                        <option :value="''">-- 请选择 --</option>
                    </template>
                </b-form-select>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="资产：" label-for="cornId">
                <b-form-select v-model="data.assetsId" :options="optionsAssets" placeholder="请填写资产信息">
                    <template slot="first">
                        <option :value="''">-- 请选择 --</option>
                    </template>
                </b-form-select>
            </b-form-group>
        </b-form>
        <div slot="modal-footer">
            <div class="btn-gro">
                <el-button type="success" icon="el-icon-circle-plus-outline" :size="size" @click="saveTask">保存</el-button>
                <el-button type="danger" icon="el-icon-circle-close-outline" :size="size" @click="hideModel">关闭</el-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import { addTask, getSelect, updateTask } from '@/config/getData'

export default {
    props: ['size', 'data'],
    data () {
        return {
            select: '',
            options: [],
            optionsAssets: [],
            optionsPause: [
                { text: '暂停', value: true },
                { text: '开启', value: false }
            ]
        }
    },
    mounted() {
        getSelect('cron').then(json => {
            this.options = json.data
        })
        getSelect('assets').then(json => {
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
        saveTask () {
            const postData = Object.assign(new Object(), this.data) //ES6深拷贝

            if(this.data.id != null && this.data.id != '' && this.data.id != undefined){
                updateTask(this.data.id, postData).then(json=>{
                    if (json.code === 200) {
                        this.$message({ type: 'success', message: '更新成功' })
                        this.$emit('refresh')
                        this.$refs.modelRef.hide()
                    } else {
                        this.$message.error('服务调用失败：' + json.message)
                    }
                    
                }).catch(err=>{
                    this.$message.error('服务调用失败：' + err)
                })
            } else {
                addTask(postData).then(json=>{
                    if (json.code === 200) {
                        this.$message({ type: 'success', message: '保存成功' })
                        this.$emit('refresh')
                        this.$refs.modelRef.hide()
                    } else {
                        this.$message.error('服务调用失败：' + json.message)
                    }
                }).catch(err=>{
                    this.$message.error('服务调用失败：' + err)
                })
            }
            
        }
    }
}

</script>
<style lang="css" scoped>
</style>
