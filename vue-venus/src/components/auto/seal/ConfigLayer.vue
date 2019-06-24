<!-- 自动封堵-配置项模态框 -->
<template lang="html">
  <b-modal ref="modelRef" title="配置" :no-close-on-backdrop="true">
    <el-form label-width="125px" size="small" label-position="left">
      <el-form-item label="推送周期：">
        <el-col :span="16">
          <el-input type="number" v-model="cycle"></el-input>
        </el-col>
        <el-col :span="4">  </el-col>
        <el-col :span="4">
          <el-button @click="save" type="primary" icon="el-icon-circle-plus-outline" :size="size">保存</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="推送周期：">
        <el-switch v-model="suc" inactive-color="#dcdfe6" active-color="#13ce66" @change="openOrStop"></el-switch>
      </el-form-item>
    </el-form> 

    <div slot="modal-footer">
      <div class="btn-gro">
        <el-button @click="hideModel" type="danger" icon="el-icon-circle-close-outline" :size="size">关闭</el-button>
      </div>
    </div>
    
  </b-modal>
</template>

<script>
import {getSealStatus, getSealInterval, saveSealInterval, choseInterval} from '@/config/getData'

export default {
  props: ['size'],
  data () {
    return {
      cycle: 0,
      suc: false
    }
  },
  mounted () {
    getSealStatus().then(json=>{
      this.suc = json.status
    })

    getSealInterval().then(json=>{
      this.cycle = json.interval
    })
    
  },
  methods: {
    save () { // 保存周期
      saveSealInterval(this.cycle).then(json=>{
        if (json.return){
          this.suc = true
          this.$message({
              type: 'success',
              message: '保存成功'
          });
        }
      }).catch(res=>{
        this.$message.error(`调用服务失败：${res}`)
      })
    },
    openOrStop (arg) { // 启动
      choseInterval(arg).then(json=>{
        if (json.return){
          this.suc = arg
          this.$message({ type: 'success', message: '更改成功' });
        }
      }).catch(res=>{
        this.$message.error('调用服务失败：' + res)
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
