<template>
  <div id="login">
    <div id="staff">
      <fieldset>
        <legend>员工登录</legend>
        <el-form
          :model="staffInfo"
          status-icon
          :rules="rules"
          ref="staffInfo"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model.trim="staffInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model.trim="staffInfo.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('staffInfo')"
              >提交</el-button
            >
            <el-button @click="resetForm('staffInfo')">重置</el-button>
          </el-form-item>
        </el-form>
      </fieldset>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/staff/staff";
import { setToken } from "@/utils/auth";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "staff",
  data() {
    return {
      staffInfo: {},
      rules: {
        username: [
          {
            required: true,
            message: "账号不能为空",
          },
        ],
        password: [
          {
            required: true,
            message: "账号不能为空",
          },
        ],
      },
    };
  },
  methods: {
    resetForm(staffInfo) {
      this.$refs[staffInfo].resetFields();
    },
    submitForm(staffInfo) {
      this.$refs[staffInfo].validate((valid) => {
        if (valid) {
          login(this.staffInfo).then((response) => {
            if (response.code === 200) {
              this.$router.push({ name: "StaffMain" });
              this.$notify({
                title: "登录成功",
                type: "success",
              });
              console.log("response:", response.data);
              //存储认证信息
              setToken(response.data);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

#login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("@/assets/info.png") no-repeat center center;
  /*加载背景图*/
  /* 背景图不平铺 */
  background-size: cover;
  /* 让背景图基于容器大小伸缩 */
  background-attachment: fixed;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-color: #cccccc;
}

#staff {
  margin: 200px auto;
  width: 600px;
}

fieldset {
  padding-top: 80px;
  padding-right: 50px;
  width: 650px;
  height: 300px;
  border-radius: 20px;
}
</style>
