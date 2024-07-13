<template>
  <div id="app">
    <el-container>
      <el-header style="background: linear-gradient(to right, #4A90E2, #4A90E2); color: white; padding: 0 20px; box-shadow: 0 2px 4px rgb(74, 144, 226);">
        <div style="font-size: 1.5em; line-height: 60px;">好医生后台管理系统</div>
      </el-header>
      <el-container>
        <el-aside width="250px" style="background-color: #2c3e50; height: calc(100vh - 60px);">
          <el-menu
              class="el-menu-vertical-demo"
              background-color="transparent"
              text-color="#ffffff"
              active-text-color="#3498db"
              :default-active="activeMenu"
              @select="handleSelect"
          >
            <el-submenu v-for="m in empMenu" :key="m.id" :index="m.id.toString()">
              <template slot="title">
                <i :class="m.icon"></i>
                <span>{{ m.name }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                    v-for="s in m.son"
                    :key="s.id"
                    :index="s.id.toString()"
                    @click="addTab(s)"
                >
                  <i :class="s.icon"></i>
                  {{ s.name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main style="padding: 20px; background-color: #ffffff;">
          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
                v-for="item in editableTabs"
                :key="item.id"
                :label="item.name"
                :name="item.id">
              <router-view />
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getInfo } from "@/api/staff/staffMain";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "staffMain",
  data() {
    return {
      info: "",
      editableTabsValue: "0",
      editableTabs: [],
      activeMenu: "", // 默认选中的菜单项
      empMenu: []
    };
  },
  methods: {
    handleSelect(key) {
      this.activeMenu = key;
    },
    addTab(targetName) {
      let newTabName = targetName.id.toString();
      let newTabLabel = targetName.name;
      let routeName = targetName.url.replace('/', '');

      // 根据标签页的 ID 判断是否重复
      if (this.editableTabs.findIndex(tab => tab.id === newTabName) === -1) {
        this.editableTabs.push({
          id: newTabName,
          name: newTabLabel,
          routeName: routeName
        });

        this.$router.push({ name: routeName }).then(() => {
          this.$nextTick(() => {
            this.editableTabsValue = newTabName;
          });
        });
      }
    },
    removeTab(targetName) {
      let tabs = this.editableTabs.filter(tab => tab.id !== targetName);
      this.editableTabs = tabs;
    },
    setMainHeight() {
      const mainHeight = window.innerHeight -60;
      this.$el.querySelector('.el-main').style.height = `${mainHeight}px`;
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setMainHeight);
  },
  mounted() {
    this.setMainHeight();
    window.addEventListener('resize', this.setMainHeight);
    getInfo().then(response => {
      this.info = response.data;
      this.empMenu = response.data.empMenu;
    });
  }
};
</script>
<style>
#app {
  font-family: "Helvetica Neue", Arial, sans-serif;
}

.el-header {
  background-color: #e7f5fe;
  color: #333; /* 可以根据需要调整文字颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-container{
  height:100%;

}
.el-main {
  height: 800px; /* 根据实际情况调整高度 */
  overflow-y: auto; /* 超出部分显示滚动条 */
}

.el-menu-item.is-active {
  background-color: #e9ecef;
}

/* 修改菜单项的 hover/active 状态样式 */
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #3498db !important; /* 使用 !important 提高优先级 */
}
</style>
