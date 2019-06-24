<!-- 添加用户 -->
<template lang="html">
    <b-modal ref="modelRef" title="新增/编辑用户" :no-close-on-backdrop="true">
        <b-form>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="用户名：" label-for="className">
                <b-form-input v-model="data.name" type="text" placeholder="请填写用户名" autocomplete="off"/>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="年龄：" label-for="className">
                <b-form-input v-model="data.age" type="text" placeholder="请填写年龄" autocomplete="off"/>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="E-Mail：" label-for="className">
                <b-form-input v-model="data.email" type="text" placeholder="请填写E-Mail" autocomplete="off"/>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="性别：" label-for="cornId">
                <b-form-select v-model="data.sex" :options="optionsAssets" placeholder="请填写性别" autocomplete="off">
                    <template slot="first">
                        <option :value="''">-- 请选择 --</option>
                        <option :value="1">男</option>
                        <option :value="2">女</option>
                    </template>
                </b-form-select>
            </b-form-group>
        </b-form>
        <div slot="modal-footer">
            <div class="btn-gro">
                <el-button type="success" icon="el-icon-circle-plus-outline" :size="size" @click="saveOrUpdate">保存</el-button>
                <el-button type="danger" icon="el-icon-circle-close-outline" :size="size" @click="hideModel">关闭</el-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import { saveUser } from '@/config/getData'

export default {
    props: ['size', 'data'],
    data () {
        return {
            optionsAssets: []
        }
    },
    methods: {
        hideModel () {
            this.$refs.modelRef.hide()
        },
        showModel () {
            this.$refs.modelRef.show()
        },
        saveOrUpdate () {
            saveUser(this.data).then(json=>{
                if (json.code === 200) {
                    this.$message({ type: 'success', message: '保存成功！' })
                    this.$refs.modelRef.hide()
                    this.$emit('refresh')
                }
                else {
                    this.$message.error(json.message)
                }
            }).catch(err=>{
                this.$message.error('服务调用失败')
            })
        }
    }
}

</script>
<style lang="css" scoped>
</style>

