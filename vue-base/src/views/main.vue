<template>
  <div class="nav">
    <div class="left">
      <el-radio-group v-model="isCollapse">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        @select="handleSelect"
      >
        <!-- 包含下级菜单 -->
        <el-submenu :index="menu.path" v-for="menu in hasChild(menus)" :key="menu.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{menu.title}}</span>
          </template>
          <!-- 二级菜单，没有下级菜单 -->
          <el-menu-item :index="v.path" v-for="v in noChild(menu.child)" :key="v.id">{{v.title}}</el-menu-item>
          <!-- 二级菜单，有下级菜单 -->
          <el-submenu :index="v.path" v-for="v in hasChild(menu.child)" :key="v.id">
            <span slot="title">{{v.title}}</span>
            <el-menu-item :index="c.path" v-for="c in v.child" :key="c.id">{{c.title}}</el-menu-item>
          </el-submenu>
        </el-submenu>
        <!-- 无下级菜单 -->
        <el-menu-item :index="menu.path" v-for="menu in noChild(menus)" :key="menu.id">
          <i class="el-icon-menu"></i>
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
        <el-tab-pane v-for="i in editTabs" :key="i.id" :label="i.title" :name="i.id">
          <router-view :name="i.path"></router-view>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  //
  data() {
    return {
      menus: [
        {
          id: "1",
          path: "",
          title: "系统管理",
          child: [
            { id: "2", path: "role", title: "角色管理", child: [] },
            { id: "3", path: "menu", title: "菜单管理", child: [] },
            {
              id: "4",
              path: "",
              title: "用户管理",
              child: [{ path: "user", id: "5", title: "用户管理1", child: [] }]
            }
          ]
        },
        { id: "6", path: "", title: "IOS系统", child: [] }
      ],
      isCollapse: false, // 是否水平折叠收起菜单
      isRouter: true,
      editableTabsValue: 0,
      editTabs: [],
      tabIndex: 0
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      this.getMenuDetail(this.menus, key);
    },
    hasChild(menus) {
      // 过滤掉没有子菜单的数据
      return menus.filter(f => f.child.length > 0);
    },
    noChild(menus) {
      // 过滤掉有子菜单的数据
      return menus.filter(f => f.child.length == 0);
    },
    addTab(tab) {
      // tab页
      let ret = this.editTabs.some(item => {
        //任一项返回true，则返回true
        return item.id === tab.id;
      });
      if (!ret) {
        this.editTabs.push(tab);
      }
      this.editableTabsValue = tab.id;
    },
    removeTab(targetName) {
      // 移除tab页
      let tabs = this.editTabs;
      this.editTabs = tabs.filter(tab => tab.id !== targetName);
      this.editableTabsValue = this.editTabs[0].id;
    },
    getMenuDetail(json, pathName) {
      //
      if (json == "" || json == undefined) {
        return;
      }
      for (var i = 0; i < json.length; i++) {
        var key = json[i];
        if (key.path === pathName) {
          this.addTab(key);
          break;
        } else {
          this.getMenuDetail(key.child, pathName);
        }
      }
    }
  }
};
</script>
<style>
.nav {
  height: 100%;
}
.left {
  float: left;
  height: 100%;
}
.right {
  float: left;
  height: 100%;
  width: 50%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.el-menu--collapse {
  height: 100%;
}
</style>
