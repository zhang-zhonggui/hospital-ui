<template>
  <div id="NoPassNews">
    <div class="demo-input-size">
      <el-input
        placeholder="请输入标题"
        suffix-icon="el-icon-date"
        style="display: inline-block; width: 200px"
        v-model="noPassInfo.title"
      >
      </el-input>
      <el-input
        placeholder="请输入作者"
        suffix-icon="el-icon-user"
        style="display: inline-block; width: 200px"
        v-model="noPassInfo.writer"
      >
      </el-input>
      <el-date-picker
        v-model="noPassInfo.date"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>

      <el-select v-model="noPassInfo.rid" placeholder="请选择审核员">
        <el-option
          v-for="r in noPassRole"
          :key="r.id"
          :label="r.permission"
          :value="r.id"
        ></el-option>
      </el-select>
      <el-select v-model="noPassInfo.tid" placeholder="请选择新闻类型">
        <el-option
          v-for="t in noPassType"
          :key="t.dictCode"
          :label="t.dictLabel"
          :value="t.dictCode"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="searchNoPass()"
        circle
      ></el-button>
      <el-button
        type="warning"
        icon="el-icon-refresh-right"
        @click="newNoPassWindow()"
        circle
      ></el-button>

      <el-table :data="noPassReturn" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="80"> </el-table-column>
        <el-table-column prop="writer" label="新闻作者" width="100">
        </el-table-column>
        <el-table-column prop="title" label="新闻标题" width="100">
        </el-table-column>
        <el-table-column prop="date" label="审核日期"> </el-table-column>
        <el-table-column prop="type.tname" label="类型"> </el-table-column>
        <!--<el-table-column-->
        <!--prop="info.name"-->
        <!--label="审核人">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="role.rname"-->
        <!--label="权限管理">-->
        <!--</el-table-column>-->
        <el-table-column label="按钮操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="showNoPass(scope.row.id)"
              >拒绝理由</el-button
            >
            <el-button
              type="warning"
              @click="updateNoPass(scope.row.id)"
              :disabled="scope.row.state == 1 ? true : false"
              >重新修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="nojournalismCount"
      >
      </el-pagination>

      <el-dialog
        id="np"
        :model="showNoPassInfo"
        title="拒绝理由"
        :visible.sync="dialogFormVisible"
      >
        <el-form>
          <el-form-item label="活动区域" style="font-size: 20px">
            <el-input
              type="textarea"
              style="font-size: 20px; font-weight: bolder"
              placeholder="请输入内容"
              v-model="showNoPass.reason"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { searchRoleType } from "@/api/news/news";
import { listData } from "@/api/staff/dict/data";
import { getPages, getShowNoPassById } from "@/api/news/nopassnews";
export default {
  name: "NoPassNews",
  data() {
    return {
      noPassInfo: {
        title: "",
        writer: "",
        date: "",
        tid: "",
        rid: "",
      },
      noPassType: [],
      noPassRole: [],
      noPassReturn: [],
      nojournalismCount: 0,
      dialogFormVisible: false,
      showNoPassInfo: {},
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
  methods: {
    async searchRole() {
      searchRoleType().then((res) => {
        this.noPassRole = res.data;
      });
    },
    async fetchJournalismTypes() {
      listData({ dictType: "news_type" })
        .then((response) => {
          this.noPassType = response.data;
        })
        .catch((error) => {
          this.$message({
            message: "获取新闻类型失败" + error,
            type: "error",
          });
        });
    },
    searchNoPass() {
      this.getNoPass(1, 10);
    },
    newNoPassWindow() {
      this.getNoPass(1, 10);
    },
    handleCurrentChange(val) {
      this.getNoPass(val, 10);
    },
    showNoPass(id) {
      getShowNoPassById(id).then((res) => {
        this.showNoPassInfo = res.data;
        this.dialogFormVisible = true;
      });
    },
    getNoPass(a, b) {
      this.noPassInfo.pageNO = a;
      this.noPassInfo.pageCount = b;

      getPages(this.noPassInfo).then((res) => {
        this.noPassReturn = res.data.searchNoPassNews;
        this.nojournalismCount = res.data.searchNoPassNewsTo;
      });
    },
  },
  mounted() {
    this.getNoPass(1, 10);
    this.searchRole();
    this.fetchJournalismTypes();
  },
};
</script>

<style></style>
