<template>
  <div id="staffMain">
    <el-container>
      <el-header
        style="
          background: linear-gradient(to right, #4a90e2, #4a90e2);
          color: white;
          padding: 0 20px;
          box-shadow: 0 2px 4px rgb(74, 144, 226);
        "
      >
        <div style="font-size: 1.5em; line-height: 60px">
          好医生后台管理系统
        </div>
      </el-header>
      <el-container>
        <el-aside width="230px" style="background-color: #2c3e50">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="transparent"
            text-color="#ffffff"
            :unique-opened="true"
            active-text-color="#3498db"
            :default-active="activeMenu"
            @select="handleSelect"
            :default-openeds="$router.path"
            :router="true"
          >
            <el-submenu
              v-for="m in empMenu"
              :key="m.id"
              :index="m.id.toString()"
            >
              <template slot="title">
                <i :class="m.icon"></i>
                <span>{{ m.name }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="s in m.son"
                  :key="s.id"
                  :index="s.url"
                  @click="addTab(s)"
                >
                  <i :class="s.icon"></i>
                  {{ s.name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main style="padding: 20px; background-color: #ffffff">
          <el-tabs
            v-model="editableTabsValue"
            @tab-click="tabClick"
            type="card"
            closable
            @tab-remove="removeTab"
          >
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.url"
              :label="item.name"
              :name="item.id"
            >
              <!-- 不要在这里写 <router-view /> -->
            </el-tab-pane>
          </el-tabs>
          <!-- 只在这里写一个 router-view -->
          <router-view />
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
      empMenu: [],
    };
  },
  methods: {
    handleSelect(key) {
      this.activeMenu = key;
    },
    addTab(targetName) {
      let newTabName = targetName.url;
      let newTabLabel = targetName.name;
      let routeName = targetName.url;

      const tabExists = this.editableTabs.some(
        (tab) => tab.routeName === routeName
      );
      if (!tabExists) {
        this.editableTabs.push({
          id: newTabName,
          name: newTabLabel,
          routeName: routeName,
        });
      }
      // Handle both Promise and non-Promise returns from $router.push
      const navigationResult = this.$router.push(routeName);
      if (navigationResult && typeof navigationResult.then === "function") {
        navigationResult
          .then(() => {
            this.$nextTick(() => {
              this.editableTabsValue = newTabName;
            });
          })
          .catch((error) => {
            if (error.name !== "NavigationDuplicated") throw error;
          });
      } else {
        this.editableTabsValue = newTabName;
      }
    },
    removeTab(targetName) {
      // 从 editableTabs 数组中移除指定 id 的标签页
      let tabs = this.editableTabs.filter((tab) => tab.id !== targetName);
      this.editableTabs = tabs;

      // 如果关闭的是当前标签页，则跳转到最后一个标签页或首页
      if (this.editableTabsValue === targetName) {
        if (tabs.length > 0) {
          this.editableTabsValue = tabs[tabs.length - 1].id;
          this.$router.push(tabs[tabs.length - 1].routeName);
        }
      }
    },
    tabClick() {
      this.$router.push({ path: this.editableTabsValue });
    },
    setMainHeight() {
      const mainHeight = window.innerHeight - 60;
      this.$el.querySelector(".el-main").style.height = `${mainHeight}px`;
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setMainHeight);
  },
  mounted() {
    this.setMainHeight();
    window.addEventListener("resize", this.setMainHeight);
    getInfo().then((response) => {
      if (response.code === 200) {
        this.info = response.data;
        this.empMenu = response.data.empMenu;
      } else {
        this.$message.error(response.msg);
        this.$router.push({ name: "Staff" });
      }
    });
  },
  created() {
    console.log("staffMain created", this._uid);
  },
};
</script>
<style>
#staffMain {
  font-family: "Helvetica Neue", Arial, sans-serif;
}

.el-header {
  background-color: #e7f5fe;
  color: #333; /* 可以根据需要调整文字颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-container {
  height: 100%;
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
