<!-- 菜单管理 -->
<template lang="html">
  <div class="content-main">
    <div class="btn-gro">
        <el-button @click="btnAdd" type="success" icon="el-icon-circle-plus-outline" :size="size">添加菜单</el-button>
        <el-button @click="btnEdit" type="success" icon="el-icon-circle-plus-outline" :size="size">编辑菜单</el-button>
        <el-button @click="deleteMult" type="danger" icon="el-icon-circle-plus-outline" :size="size">删除菜单</el-button>
    </div>
    <div style="margin-top: 10px;">
      <el-tree ref="tree" :data="treeData" node-key="id" :props="defaultProps" default-expand-all check-strictly check-on-click-node @node-click="handleNodeClick"></el-tree>
    </div>
    <AddMenu ref="addModel" :data="choseNode" @refresh="refresh"/>
  </div>
</template>

<script>
import { getMenuPath } from '@/config/getData'
import AddMenu from './AddMenu'

export default {
  data () {
      return {
        treeData: [],
        size: 'small', // 按钮大小
        choseNode: { id: '', image: '', orderby: '', parentId: '',path: '',roleId: '',title: '', type: '', url: '' },
        defaultProps: {
          children: 'chilenNode',
          label: 'title'
        }
      }
  },
  created () {
    this.refresh()
  },
  methods: {
    refresh () {
      getMenuPath('').then(json=>{
            this.treeData = json.data
        })
    },
    handleNodeClick(data) {
      this.choseNode = data
    },
    btnAdd () {
      console.log(this.choseNode.parentId)
      if(this.choseNode.parentId === '' || this.choseNode.parentId === '0') {
        this.choseNode.parentId = this.choseNode.id
        this.choseNode.id = ''
        this.choseNode.url = ''
        this.choseNode.path = ''
        this.choseNode.image = ''
        this.choseNode.orderby = ''
        this.$refs.addModel.showModel()
      } else {
        this.$message({ type: 'warning', message: '目前只能添加二级菜单' })
      }
    },
    btnEdit () {

    },
    deleteMult () {
      
    }
  },
  components: {
    AddMenu
  }
}

</script>
<style lang="css" scoped>
</style>
