<template>
  <div id="log">
    <div class="demo-input-size">
      <el-input
          size="medium"
          placeholder="请输入操作人姓名"
          style="display: inline-block;width: 200px;"
          v-model.trim="log.username"
          :clearable=true
      >
      </el-input>
      <el-input
          size="medium"
          placeholder="请输入想要搜索的操作"
          style="display: inline-block;width: 200px;"
          v-model.trim="log.msg"
          :clearable=true
      >
      </el-input>
      <el-button icon="el-icon-search" type="success" circle @click="searchLog()"></el-button>
      <el-table
          :data="logData"
          border
          style="width: 100%"
          height="580px">
        <el-table-column
            prop="id"
            label="操作编号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="username"
            label="操作人员"
            width="180">
        </el-table-column>
        <el-table-column
            prop="code"
            label="操作条数">
        </el-table-column>
        <el-table-column
            prop="time"
            label="操作时间">
        </el-table-column>
        <el-table-column
            prop="msg"
            label="操作内容">
        </el-table-column>
        <el-table-column
            prop="addr"
            label="地址">
        </el-table-column>
        <el-table-column
            prop="data"
            label="操作内容"
            :show-overflow-tooltip="true"
        >
        </el-table-column>
      </el-table>
      <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total=total>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {getLogData} from "@/api/log/log";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "log",
  data() {
    return {
      log: {
        pageNO: 1,
        pageCount: 10,
        username: "",
      },
      total: 0,
      logData: []
    }
  },
  mounted() {
    this.getDate(1, 10);
  },
  methods: {
    getDate(pageNO, pageCount) {
      this.log.pageNO = pageNO;
      this.log.pageCount = pageCount;
      getLogData(this.log).then((backData) => {
        if (backData.code !== 200) {
          this.$notify.error({
            title: "温馨提示",
            message: backData.msg
          });
        } else {
          console.log(backData)
          this.logData = backData.data.list;
          this.total = backData.data.total;
        }
      })
    },
    searchLog() {
      this.getDate(1, 10)
    },
    handleCurrentChange(val) {
      this.getDate(val, 10)
    }
  }
}
</script>

<style scoped>

</style>
