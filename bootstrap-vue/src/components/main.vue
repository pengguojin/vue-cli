<!-- 工单主页 -->
<template lang="html">
    <div class="main">
      <div class="work-top">
        <div style="float: left;font-size: 26px;margin: 3px;">
          <i class="el-icon-menu"></i>监控系统</div>
        <div style="float:right;margin: 8px;">
          <el-dropdown>
            <span class="el-dropdown-link">
              设置<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a @click="logout">登出</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div style="float:right;width:20%;margin-right: 20px;">
          <el-input placeholder="请输入内容" class="input-with-select" prefix-icon="el-icon-search">
            <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
          </el-input>
        </div>
      </div>
      <div class="work-left">
        <el-menu default-active="/main/Dashboard" class="el-menu-vertical-demo" @select="handleSelect"
            active-text-color="#ff9000" router>
          <div :key="index" v-for="(menu, index) in menus" >
            <el-menu-item :index="menu.url" v-if="menu.chilenNode.length==0">
              <i class="el-icon-menu"></i>
              <span slot="title">{{menu.title}}</span>
            </el-menu-item>

            <el-submenu :index="menu.url" v-if="menu.chilenNode.length>0">
              <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{menu.title}}</span>
              </template>
              <el-menu-item-group :key="index" v-for="(c, index) in menu.chilenNode">
                  <el-menu-item :index="c.url">
                      <i class="el-icon-document"></i>
                      <span slot="title">{{c.title}}</span>
                  </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </div>
      <div class="work-right">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
</template>

<script>
import { getMenuPath, logout } from '@/config/getData'

export default {
  data () {
    return {
      menus: []
    }
  },
  created() {
    getMenuPath('1').then(json=>{
      this.menus = json.data
    })
    this.$router.push('/main/Dashboard')
  },
  methods: {
      handleSelect(key, keyPath) {
      },
      logout () {
        logout().then(json=>{
          this.$router.push('/')
        })
      }
  }
}

</script>
<style lang="css" scoped>
    .main { 
      padding-top: 5px;
    }
    .work-top {
        width: 100%;
        height: 6%;
        float: left;
        border-bottom: solid 1px #e6e6e6;
    }
    .work-left {
        width: 15%;
        height: 94%;
        float: left;
        border-right: solid 1px #e6e6e6;
    }
    .work-right {
        /* padding: 5px; */
        width: 85%;
        height: 94%;
        float: left;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    .pull-nav {
      float: right;
    }
</style>
