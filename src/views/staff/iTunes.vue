<template>
  <div id="iTunes">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldPass">
        <el-input type="password" v-model.number="ruleForm.oldPass"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import router from "@/router";
import {removeToken} from "@/utils/auth";
import {updatePassword} from "@/api/staff/iTunes";

export default {
  name: "iTunes",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        oldPass: "",
      },
      rules: {
        pass: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur'}
        ],
        oldPass: [
          {required: true, message: '请输入旧密码', trigger: 'blur'},
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updatePassword(this.ruleForm).then((backData) => {
            console.log(backData)
            if (backData.code !== 200) {
              this.$notify.error({
                title: "温馨提示",
                message: backData.msg
              });
            } else {
              router.push("/");
              this.$notify({
                title: "温馨提示",
                message: "修改成功!请重新登录!",
                type: "success"
              });
              removeToken();
            }
          }).catch((error) => {
            console.log(error);
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }

  }
}
</script>

<style scoped>
.demo-ruleForm {
  width: 500px;
  margin: 150px auto;
  border: 0px;
  padding: 30px;
}
</style>
