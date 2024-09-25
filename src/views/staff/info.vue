<template>
  <div id="info">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>个人简历</span>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form id="stuFrom" :model="handImg" ref="stuInfo">
              <el-form-item label="头像">
                <img id="stuImg" width="200" height="200" :src="staff.handImg" alt="" class="avatar">
                <input id="foo" name="handImg" type="file" accept="image/png,image/gif,image/jpeg"  style="display: none;"/>
                <el-button type="primary" size="small" @click="uploadImg">更换头像</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="16">
          <el-descriptions :column="2">
            <el-descriptions-item label="姓名">{{ staff.name }}</el-descriptions-item>
            <el-descriptions-item label="年龄">{{ staff.age }}</el-descriptions-item>
            <el-descriptions-item label="学历">{{ staff.education }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ staff.phone }}</el-descriptions-item>
            <el-descriptions-item label="职务">{{ title }}</el-descriptions-item>
            <el-descriptions-item label="特长">{{ staff.specialty }}</el-descriptions-item>
          </el-descriptions>
          <el-divider></el-divider>
          <div class="info-item">
            <span class="label">成果：</span>
            <span>{{ staff.results }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {getStaffInfo, uploadAvatar} from "@/api/staff/info";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "info",
  data() {
    return {
      staff: {},
      title: "",
      handImg: {
        url: "",
        file: null,
      },
    }
  },
  mounted() {
    getStaffInfo().then(response => {
      this.title = response.data.title.title;
      this.staff = response.data;
      this.handImg.url = response.data.handImg;
    }).catch(error => {
      console.error("获取新闻数据失败:", error);
    })
  },
  methods: {
    uploadImg() {
      document.getElementById('foo').click();
      // 手动触发文件选择后，立即监听 change 事件
      document.getElementById('foo').addEventListener('change', this.chengImg);
    },
    chengImg(event) {
      this.handImg.file = event.target.files[0];
      if (!this.handImg.file) {
        return;
      }
      const formData = new FormData();
      formData.append('handImg', this.handImg.file);

      uploadAvatar(formData).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '头像上传成功',
            type: 'success'
          });
          // 更新头像地址
          this.staff.handImg = response.data;
        } else {
          this.$message.error('头像上传失败');
        }
      }).catch(error => {
        console.error("头像上传失败:", error);
        this.$message.error('头像上传失败');
      });
      // 处理完文件上传后，移除监听器，避免重复触发
      document.getElementById('foo').removeEventListener('change', this.chengImg);
    }
  },
}
</script>

<style scoped>
.box-card {
  width: 80%;
  margin: 20px auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
}

.info-item {
  margin-top: 20px;
}

.label {
  font-weight: bold;
  margin-right: 10px;
}
</style>
