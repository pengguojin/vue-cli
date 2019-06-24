<!-- 工单主页 -->
<template lang="html">
    <div class="main">
        <div class="work-left">
            <el-menu default-active="/work/all" 
                class="el-menu-vertical-demo" @select="handleSelect" router>
                <el-submenu index="/work/all">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>安全通报</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/work/all">
                            <i class="el-icon-document"></i>
                            <span slot="title">全部安全通报</span>
                        </el-menu-item>
                        <el-menu-item index="/work/me">
                            <i class="el-icon-document"></i>
                            <span slot="title">由我创建</span>
                        </el-menu-item>
                        <el-menu-item index="/work/deal">
                            <i class="el-icon-document"></i>
                            <span slot="title">指派给我</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="/work/daily">
                    <i class="el-icon-menu"></i>
                    <span slot="title">日常安全通报</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="work-right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
      handleSelect(key, keyPath) {
      }
  }
}

</script>
<style lang="css" scoped>
    .main { padding: 5px; }
    .work-left {
        width: 15%;
        height: 100%;
        float: left;
        border-right: solid 1px #e6e6e6;
    }
    .work-right {
        padding: 5px;
        width: 85%;
        height: 100%;
        float: left;
    }
</style>
