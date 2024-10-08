<template>
  <div class="login-page">
    <div class="login-container">
      <div class="logo">
        <img src="@/assets/login.png" alt="Logo" />
      </div>
      <el-form
        ref="loginForm"
        :model="userForm"
        :rules="rules"
        status-icon
        label-width="100px"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model.trim="userForm.username"
            placeholder="请输入账号"
            clearable
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="userForm.password"
            placeholder="请输入密码"
            type="password"
            clearable
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item class="button-group">
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
          <router-link to="/register" class="register-link"
            >注册账号</router-link
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/staff/login";

export default {
  name: "StaffLogin",
  data() {
    return {
      userForm: {
        telephone: "",
        password: "",
      },
      rules: {
        // telephone: [
        //   { required: true, message: "请输入手机号码", trigger: "blur" },
        //   {
        //     min: 11,
        //     max: 11,
        //     message: "请输入11位手机号码",
        //     trigger: "blur",
        //   },
        //   {
        //     pattern:
        //       /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
        //     message: "请输入正确的手机号码",
        //   },
        // ],
        // password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          try {
            const response = await login(this.userForm);
            if (response.code === 200) {
              this.$message({
                message: "登录成功",
                type: "success",
              });
              this.$router.push("/staff"); // 登录成功后跳转到主页面
            } else {
              this.$message({
                message: response.message || "登录失败",
                type: "warning",
              });
            }
          } catch (error) {
            this.$message({
              message: "登录失败，请稍后重试",
              type: "error",
            });
          }
        }
      });
    },
    resetForm() {
      this.$refs.loginForm.resetFields();
    },
  },
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(@/assets/user_banner.jpg) no-repeat center center;
  background-size: cover;
}

.login-container {
  width: 430px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.logo img {
  width: 104px;
  height: 104px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.register-link {
  color: #409eff;
  font-size: 14px;
}
</style>
