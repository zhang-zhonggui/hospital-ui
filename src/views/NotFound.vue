<template>
    <div class="not-found-page">
      <el-result
        icon="warning"
        title="404"
        sub-title="抱歉，您访问的页面不存在"
      >
        <template #extra>
          <el-button type="primary" @click="goHome">返回首页</el-button>
        </template>
      </el-result>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound",
    methods: {
      goHome() {
        this.$router.push("/"); //  跳转到你的首页路由
      },
    },
  };
  </script>
  
  <style scoped>
  .not-found-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /*  占据整个屏幕高度 */
    background-color: #f5f7fa; /*  设置背景颜色 (可选) */
  }
  
  .not-found-page .el-result {
    /* 可以在这里添加自定义样式，例如调整图标大小、文字颜色等 */
    /* 例如: */
    --el-result-icon-size: 60px;  /* 调整图标大小 */
    --el-result-title-font-size: 32px; /* 调整标题大小 */
    --el-result-subtitle-font-size: 18px; /* 调整副标题大小 */
  }
  </style>
  