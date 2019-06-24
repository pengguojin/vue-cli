<!-- 修改密码 -->
<template lang="html">
    <b-modal ref="modelRef" title="新增/编辑角色" :no-close-on-backdrop="true">
        <b-form>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="源密码：" label-for="className">
                <b-form-input v-model="oldPwa" type="password" placeholder="请填写密码" autocomplete="off"/>
            </b-form-group>
            <b-form-group horizontal :label-cols="3" label-size="sm" label="新密码：" label-for="className">
                <b-form-input v-model="newPwa" type="password" placeholder="请填写密码" autocomplete="off"/>
            </b-form-group>
        </b-form>
        <div slot="modal-footer">
            <div class="btn-gro">
                <el-button type="success" icon="el-icon-circle-plus-outline" :size="size" @click="savePwa">保存</el-button>
                <el-button type="danger" icon="el-icon-circle-close-outline" :size="size" @click="hideModel">关闭</el-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import { changePwa } from '@/config/getData'

export default {
    props: ['data'],
    data () {
        return {
            newPwa: '',
            oldPwa: '',
            size: 'small' // 按钮大小
        }
    },
    methods: {
        hideModel () {
            this.$refs.modelRef.hide()
        },
        showModel () {
            this.$refs.modelRef.show()
        },
        savePwa () {
            let rowData = `newPwa=${this.newPwa}&oldPwa=${this.oldPwa}&id=${this.data[0].id}`
            changePwa(rowData).then(json=>{
                if (json.code === 200) {
                    this.$message({ type: 'success', message: '修改密码成功！' })
                }else {
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
