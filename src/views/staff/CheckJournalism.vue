<template>
  <div id="checkJournalism">
    <div class="demo-input-size">
      <el-input
        placeholder="请输入标题"
        suffix-icon="el-icon-date"
        style="display: inline-block; width: 200px"
        v-model="checkJournalism.title"
      >
      </el-input>
      <el-input
        placeholder="请输入作者姓名"
        suffix-icon="el-icon-date"
        style="display: inline-block; width: 200px"
        v-model="checkJournalism.writer"
      >
      </el-input>

      <el-date-picker
        v-model="checkJournalism.date"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>

      <el-select v-model="checkJournalism.tid" placeholder="请选择新闻类型">
        <el-option
          v-for="(t, i) in checkType"
          :key="i"
          :label="t.dictLabel"
          :value="t.dictCode"
        ></el-option>
      </el-select>

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="checkInfo()"
        circle
      ></el-button>
      <el-button
        type="warning"
        icon="el-icon-refresh-right"
        @click="newWindow()"
        circle
      ></el-button>
      <el-table :data="checkJournalismReturn" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="200px">
        </el-table-column>
        <el-table-column prop="writer" label="作者" width="250px">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="300px">
        </el-table-column>
        <el-table-column prop="date" label="时间" width="300px">
        </el-table-column>
        <el-table-column prop="type.tname" label="新闻类型" width="300px">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="particularsJournalism(scope.row.id)"
              >新闻详情</el-button
            >
            <el-button
              type="success"
              @click="passJournalism(scope.row.id)"
              :disabled="scope.row.state == 1 ? true : false"
              >审核通过</el-button
            >
            <el-button type="warning" @click="noPassJournalism(scope.row.id)"
              >拒绝</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="checkJournalismCount"
      >
      </el-pagination>

      <el-dialog
        title="新闻详情"
        :visible.sync="centerDialogVisible"
        width="60%"
        center
      >
        <div id="div1">新闻标题</div>
        <div id="div4">
          {{ showJournalism.title }}
        </div>
        <div id="div2">新闻内容</div>
        <div id="div3" v-html="showJournalism.body"></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>

      <el-dialog
        id="np"
        title="拒绝理由"
        :model="noReason"
        :visible.sync="dialogFormVisible"
      >
        <el-form>
          <el-form-item label="拒绝理由" style="font-size: 20px">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="noReason.reason"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="noPass()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  journalismCheck,
  noPassNews,
  passJournalism,
  showNews,
} from "@/api/news/checkJournalism";
import { listData } from "@/api/staff/dict/data";
export default {
  name: "CheckJournalism",
  data() {
    return {
      checkType: [],
      checkJournalism: {
        title: "",
        writer: "",
        date: "",
        tid: "",
      },
      checkJournalismReturn: [],
      checkJournalismCount: 0,
      centerDialogVisible: false,
      showJournalism: {},
      dialogFormVisible: false,
      noReason: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.fetchJournalismTypes();
    this.getCheck(1, 10);
  },
  methods: {
    newWindow() {
      this.getCheck(1, 10);
    },
    noPass() {
      noPassNews(this.noReason).then((res) => {
        if (res.code === 200) {
          this.getCheck(1, 10);
          this.$message({
            message: "执行成功",
            type: "success",
          });
          this.dialogFormVisible = false;
        } else {
          this.$message({
            message: "拒绝失败",
            type: "error",
          });
        }
      });
    },
    noPassJournalism(id) {
      this.noReason.id = id;
      this.dialogFormVisible = true;
    },
    passJournalism(id) {
      passJournalism(id).then((res) => {
        if (res.code == 200) {
          this.checkInfo();
          this.$message({
            message: "审核通过",
            type: "success",
          });
        }
      });
    },
    async fetchJournalismTypes() {
      listData({ dictType: "news_type" })
        .then((response) => {
          this.checkType = response.data;
        })
        .catch((error) => {
          this.$message({
            message: "获取新闻类型失败" + error,
            type: "error",
          });
        });
    },
    particularsJournalism(id) {
      showNews(id).then((res) => {
        this.showJournalism = res.data;
        this.centerDialogVisible = true;
      });
    },
    getCheck(a, b) {
      this.checkJournalism.pageNO = a;
      this.checkJournalism.pageCount = b;
      journalismCheck(this.checkJournalism).then((res) => {
        if (res.code === 200) {
          this.checkJournalismReturn = res.data.journalismCheck;
          this.checkJournalismCount = res.data.journalismCheckTo;
        } else {
          this.$message.error("没有数据");
        }
      });
    },
    checkInfo() {
      this.getCheck(1, 10);
    },
    handleCurrentChange(val) {
      this.getCheck(val, 10);
    },
  },
};
</script>

<style>
.el-pagination {
  text-align: center;
}
#np {
  margin: 0px auto;
  font-size: 20px;
  font-weight: bolder;
  width: 1000px;
}
#div1 {
  font-size: 20px;
  font-weight: bolder;
  text-align: center;
}
#div4 {
  font-size: 30px;
  font-weight: bolder;
  color: #ffd700;
  text-align: center;
}
#div2 {
  font-size: 20px;
  font-weight: bolder;
  text-align: center;
}
#div3 {
  width: 95%;
  text-align: center;
}
#div3 img {
  margin: 0 auto;
}
</style>
