<!-- 添加角色 -->
<template lang="html">
    <b-modal ref="modelRef" title="新增/编辑角色" :no-close-on-backdrop="true">
        <b-form>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="角色名称：" label-for="className">
                <b-form-input v-model="data.name" type="text" placeholder="请填写用户名" autocomplete="off"/>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="角色类型：" label-for="className">
                <b-form-input v-model="data.type" type="text" placeholder="请填写密码" autocomplete="off"/>
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
import { saveRole } from '@/config/getData'

export default {
    props: ['size', 'data'],
    data () {
        return {
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
            saveRole(this.data).then(json=>{
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

