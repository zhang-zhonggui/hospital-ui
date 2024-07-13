<template>
  <div id="info">
    <el-descriptions title="个人简历" direction="vertical" :column="4" border class="one">
      <el-descriptions-item label="姓名" :span="6">
        <el-col :span="6">
          <div class="grid-content bg-purple">{{ staff.name }}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form id="stuFrom" :model="handImg" ref="stuInfo">
              <el-form-item label="头像">
                <el-image
                    v-if="handImg.url"
                    :src="handImg.url"
                    style="width: 100px; height: 100px"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-descriptions-item>
      <el-descriptions-item label="年龄" :span="2"> {{ staff.age }}</el-descriptions-item>
      <el-descriptions-item label="学历" :span="2">{{ staff.education }}</el-descriptions-item>
      <el-descriptions-item label="手机号" :span="2">{{ staff.phone }}</el-descriptions-item>
      <el-descriptions-item label="职务" :span="2">{{ title }}</el-descriptions-item>
      <el-descriptions-item label="特长" :span="2">{{ staff.specialty }}</el-descriptions-item>
      <el-descriptions-item label="成果">{{ staff.results }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import {getStaffInfo} from "@/api/staff/info";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "info",
  data() {
    return {
      staff: {},
      title: "",
      handImg: {
        url: "",
      },
    }
  },
  mounted() {
    getStaffInfo().then(response => {
      this.title = response.data.title.title;
      console.log(response.data.title.title)
      this.staff = response.data;
      console.log(response.data.handImg)
      this.handImg.url = response.data.handImg;
      console.log(this.handImg)
    }).catch(error => {
      console.error("获取新闻数据失败:", error);
    })
  },
  methods: {},

}
</script>

<style scoped>

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
