<template>
  <div id="index">
    <el-container>
      <el-header>
        <a
            style="margin-right: 1100px; font-size: 20px"
            class="el-icon-office-building"
        >
          好医生: 欢迎你 ，好医生帮你找到好医生
        </a>
        <el-link type="primary"
        >
          <router-link to="staff/login">员工登录</router-link>
        </el-link>
        <el-link type="success"
        >
          <router-link to="login">患者登录</router-link>
        </el-link>
        <el-link type="warning">
          <!--          <button style="text-decoration: none" @click="open">病情查询</button>-->
        </el-link>
      </el-header>
      <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="50%">
        <el-table
            :visible.sync="dialogVisible"
            :data="userData"
            style="width: 100%"
        >
          <el-table-column prop="data" label="日期"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="code" label="身份证号"></el-table-column>
          <el-table-column prop="conditions" label="病情"></el-table-column>
        </el-table>
      </el-dialog>
      <el-carousel :interval="4000" type="card" height="650px">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <img :src="item.idView" class="image" width="100%" height="500px"/>
        </el-carousel-item>
      </el-carousel>
      <!-- 写新闻的地方 -->
      <el-row>
        <template>
          <el-carousel
              :interval="5000"
              arrow="always"
              style="height: 500px; background-color: #fffafa"
          >
            <el-carousel-item v-for="news in Info" :key="news.id">
              <h1 v-html="news.title"></h1>
              <p style="margin: 0 auto; text-indent: 2em">
                <span v-html="news.body" @click="clickShow(news.id)"></span>
              </p>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-row>
      <el-footer>
        <i class="el-icon-office-building">好医生 |</i>
        <i class="el-icon-phone">101—56706180 |</i>
        <i cite="el-icon-location-information">郑州市金水区杨金路牛顿国际6楼 | 豫ICP备123789456号</i>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import {backData} from "../api/index";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  data() {
    return {
      Info: [],
      imgList: [
        {id: 0, idView: require('@/assets/1.jpeg')},
        {id: 1, idView: require('@/assets/2.jpeg')},
        {id: 2, idView: require('@/assets/3.jpeg')},
        {id: 3, idView: require('@/assets/4.jpeg')},
        {id: 4, idView: require('@/assets/5.jpeg')},
      ],
      userData: [],
      dialogVisible: false,
    };
  },
  mounted() {
    backData().then(response => {
      this.Info = response.data;
    }).catch(error => {
      console.error("获取新闻数据失败:", error);
    });
  },
  methods: {
    clickShow(id) {
      this.$router.push({name: "showMessage", params: {id: id}});
    },
    // ... your other methods
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0px;
}

.el-header,
.el-footer {

  background-color: #079ABD;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

</style>
