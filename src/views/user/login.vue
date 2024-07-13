<template>
  <div id="login">
    <div class="dowebok">
      <div class="logo"></div>
      <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="telephone">
          <el-input id="telephone" type="text" v-model="userForm.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input id="password" type="password" v-model="userForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <a :href="'adduser.html'">
            <el-button type="primary">注册</el-button>
          </a>
          <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {login} from "@/api/login";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  data() {
    return {
      userForm: {},
      rules: {
        telephone: [{required: true, message: "账号不能为空"},

          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur'},
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: '请输入正确的手机号码'
          }

        ],
        password: [{required: true, message: "密码不能为空"}],
      },
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.userForm).then((response) => {
            if (response === 200) {
              window.location.href = "/hospital/user/main.html"
            } else {
              this.$message({
                message: '登录失败',
                type: 'warning'
              });
            }
          })
          // $.post("/hospital/user/userLogin",this.userForm,function(backData){
          //   if (backData.code == 1){
          //     window.location.href="/hospital/user/main.html"
          //   }else {
          //     this.$message({
          //       message: '登录失败',
          //       type: 'warning'
          //     });
          //   }
          // })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}

</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}

html {
  height: 100%;
}

body {
  height: 100%;
  background: #fff url(@/assets/user_banner.jpg) 50% 50% no-repeat;
  background-size: cover;
}

.dowebok {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 430px;
  height: 550px;
  margin: -300px 0 0 -215px;
  border: 1px solid #fff;
  border-radius: 20px;
  overflow: hidden;
}

.logo {
  width: 104px;
  height: 104px;
  margin: 50px auto 80px;
  background: url(@/assets/login.png) 0 0 no-repeat;
}


#telephone, #password {
  width: 288px;
  height: 48px;
  padding-left: 70px;
  border: 1px solid #fff;
  border-radius: 25px;
  font-size: 18px;
  color: #fff;
  background-color: transparent;
  outline: none;
}


#telephone {
  background: url(@/assets/emil.png) 20px 14px no-repeat;
}

#password {
  background: url(@/assets/password.png) 23px 11px no-repeat;
}

@media screen and (max-width: 500px) {
  * {
    box-sizing: border-box;
  }

  .dowebok {
    position: static;
    width: auto;
    height: auto;
    margin: 0 30px;
    border: 0;
    border-radius: 0;
  }

  .logo {
    margin: 50px auto;
  }

}

.el-form-item label {
  color: #ffffff;
  font-size: 20px;
}
</style>
