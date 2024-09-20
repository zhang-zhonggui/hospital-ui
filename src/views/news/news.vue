<template>
  <div id="news">
    <div class="demo-input-size">
      <el-input
        placeholder="请输入标题"
        suffix-icon="el-icon-date"
        style="display: inline-block; width: 200px"
        v-model="searchJournalism.title"
      >
      </el-input>
      <el-input
        placeholder="请输入作者姓名"
        suffix-icon="el-icon-date"
        style="display: inline-block; width: 200px"
        v-model="searchJournalism.writer"
      >
      </el-input>
      <el-date-picker
        v-model="searchJournalism.date"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-select v-model="searchJournalism.rid" placeholder="请选择审核员">
        <el-option
          v-for="r in passRole"
          :key="r.id"
          :label="r.permission"
          :value="r.id"
        ></el-option>
      </el-select>

      <el-select v-model="searchJournalism.tid" placeholder="请选择新闻类型">
        <el-option
          v-for="t in passType"
          :key="t.dictCode"
          :label="t.dictLabel"
          :value="t.dictCode"
        ></el-option>
      </el-select>

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="searchInfo()"
        circle
      ></el-button>
      <el-button
        type="warning"
        icon="el-icon-refresh-right"
        @click="newPass()"
        circle
      ></el-button>

      <el-table :data="journalism" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="130px">
        </el-table-column>
        <el-table-column prop="writer" label="新闻作者" width="190px">
        </el-table-column>
        <el-table-column prop="title" label="新闻标题" width="190px">
        </el-table-column>
        <el-table-column prop="date" label="审核日期" width="200px">
        </el-table-column>
        <el-table-column prop="type.tname" label="类型" width="190px">
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="info.name"-->
        <!--label="审核人"-->
        <!--width="150px">-->
        <!--</el-table-column>-->
        <el-table-column prop="state" label="新闻状态" width="190px">
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="NewsState.id"-->
        <!--label="审核状态"-->
        <!--width="190px">-->
        <!--</el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.newsState.id == 2">
              <el-button
                type="info"
                size="small"
                @click="showPassId(scope.row.id)"
                >新闻详情</el-button
              >
              <el-button
                type="success"
                size="small"
                @click="shang(scope.row.id)"
                >新闻上架</el-button
              >
              <el-button type="danger" size="small" @click="zhi(scope.row.id)"
                >置顶</el-button
              >
            </div>
            <div v-if="scope.row.newsState.id == 5">
              <el-button
                type="info"
                size="small"
                @click="showPassId(scope.row.id)"
                >新闻详情</el-button
              >
              <el-button type="success" size="small" @click="xia(scope.row.id)"
                >新闻下架</el-button
              >
              <el-button type="danger" size="small" @click="zhi(scope.row.id)"
                >置顶</el-button
              >
            </div>
            <div v-if="scope.row.newsState.id == 6">
              <el-button
                type="info"
                size="small"
                @click="showPassId(scope.row.id)"
                >新闻详情</el-button
              >
              <el-button
                type="success"
                size="small"
                @click="shang(scope.row.id)"
                >新闻上架</el-button
              >
              <el-button type="danger" size="small" @click="zhi(scope.row.id)"
                >置顶</el-button
              >
            </div>
            <div v-if="scope.row.newsState.id == 7">
              <el-button
                type="info"
                size="small"
                @click="showPassId(scope.row.id)"
                >新闻详情</el-button
              >
              <el-button type="success" size="small" @click="xia(scope.row.id)"
                >新闻下架</el-button
              >
              <el-button type="danger" size="small" disabled>置顶</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="journalismCount"
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
          {{ returnShowPass.title }}
        </div>
        <div id="div2">新闻内容</div>
        <div id="div3" v-html="returnShowPass.body"></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  journalism,
  showPassById,
  zhiDing,
  shang,
  xia,
  searchRoleType,
} from "@/api/news/news";
import { listData } from "@/api/staff/dict/data";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "news",
  data() {
    return {
      centerDialogVisible: false,
      returnShowPass: {},
      passType: [],
      passRole: [],
      searchJournalism: {
        title: "",
        writer: "",
        date: "",
        tid: "",
        rid: "",
      },
      journalism: [],
      journalismCount: 0,
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
      value1: "",
      value2: "",
      value3: "",
    };
  },
  mounted() {
    this.getJournalism(1, 10);
    this.fetchJournalismTypes();
    this.searchRole();
  },
  methods: {
    async searchRole() {
      searchRoleType().then((res) => {
        this.passRole = res.data;
      });
    },
    async fetchJournalismTypes() {
      listData({ dictType: "news_type" })
        .then((response) => {
          this.passType = response.data;
        })
        .catch((error) => {
          this.$message({
            message: "获取新闻类型失败" + error,
            type: "error",
          });
        });
    },
    async getJournalism(a, b) {
      this.searchJournalism.pageNO = a;
      this.searchJournalism.pageCount = b;
      journalism(this.searchJournalism).then((res) => {
        this.journalism = res.data.newsPassCheck;
        this.journalismCount = res.data.newsPassCheckTo;
      });
    },
    showPassId(id) {
      showPassById(id).then((res) => {
        this.returnShowPass = res.data;
        this.centerDialogVisible = true;
      });
    },
    newPass() {
      this.getJournalism(1, 10);
    },

    handleCurrentChange(val) {
      this.getJournalism(val, 10);
    },
    zhi(id) {
      zhiDing(id).then(() => {
        this.getJournalism(1, 10);
      });
    },
    shang(id) {
      shang(id).then(() => {
        this.getJournalism(1, 10);
      });
    },
    xia(id) {
      xia(id).then(() => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getJournalism(1, 10);
      });
    },
  },
};
</script>

<style></style>
