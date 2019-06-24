<!-- 添加菜单页面 -->
<template lang="html">
  <b-modal ref="modelRef" title="新增/编辑角色" :no-close-on-backdrop="true">
    <b-form>
      <b-form-group horizontal :label-cols="3" label-size="sm" label="菜单名称：" label-for="className">
        <b-form-input v-model="data.name" type="text" placeholder="请填写菜单名称" autocomplete="off"/>
      </b-form-group>
      <b-form-group horizontal :label-cols="3" label-size="sm" label="菜单url：" label-for="className">
        <b-form-input v-model="data.url" type="text" placeholder="请填写菜单url" autocomplete="off"/>
      </b-form-group>
      <b-form-group horizontal :label-cols="3" label-size="sm" label="父菜单：" label-for="className">
        <b-form-input v-model="data.title" type="text" placeholder="请填写父菜单" readonly autocomplete="off"/>
      </b-form-group>
      <b-form-group horizontal :label-cols="3" label-size="sm" label="菜单图标：" label-for="className">
        <b-form-input v-model="data.image" type="text" placeholder="请填写菜单图标" autocomplete="off"/>
      </b-form-group>
    </b-form>
    <div slot="modal-footer">
      <div class="btn-gro">
        <el-button type="success" icon="el-icon-circle-plus-outline" :size="size" @click="saveMenu">保存</el-button>
        <el-button type="danger" icon="el-icon-circle-close-outline" :size="size" @click="hideModel">关闭</el-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { saveMenu } from '@/config/getData'

export default {
  props: ['data'],
  data () {
    return {
      size: 'small' // 按钮大小
    }
  },
  methods: {
    saveMenu () {
      saveMenu(this.data).then(json => {
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
</style>
