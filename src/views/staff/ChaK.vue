<template>
  <div id="ChaK">
    <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
      <el-form-item label="科室">
        <el-input v-model="searchInfo.keshi" placeholder="查询科室"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chaK()">查询</el-button>
        <el-button type="success" @click="addDialogFormVisible = true">添加科室</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="添加科室" @close = "closeData()" :visible.sync="addDialogFormVisible">
      <el-form ref="KeShiInfo" :label-position="labelPosition" :model="KeShiInfo">
        <el-form-item prop="keshi" label="科室名称">
          <el-input v-model="KeShiInfo.keshi"></el-input>
        </el-form-item>
        <el-form-item label="科室状态">
          <el-select prop="state" v-model="KeShiInfo.state" placeholder="请选择活科室状态">
            <el-option label="启用" value="0"></el-option>
            <el-option label="未启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDialogFormVisible = false">返回</el-button>
          <el-button type="success" @click="addK()">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <template>
      <el-table
          :data=" KeShiArr"
          border
          style="width: 100%">
        <el-table-column
            prop="id"
            label="编号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="keshi"
            label="科室名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="state"
            label="科室状态">
        </el-table-column>
        <el-table-column
            prop="operate"
            label="操作">

          <template slot-scope="scope">
            <el-button type="warning" @click="showUpdateDialog(scope.row.id)">编辑</el-button>

            <el-button type="danger" @click="deleteK(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog title="修改科室" @close = "closeData()"  :visible.sync="updateDialogFormVisible">
      <el-form :model="KeShiInfo" ref="KeShiInfo">

        <el-form-item label="部门名称" prop="keshi">
          <el-input v-model=" KeShiInfo.keshi" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="科室状态">
          <el-select v-model="KeShiInfo.state" placeholder="请选择科室状态">
            <el-option label="启用" value="0"></el-option>
            <el-option label="未启用" value="1"></el-option>
          </el-select>
        </el-form-item>


      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="updateK()">修 改</el-button>
      </div>

    </el-dialog>
    <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="totalCount">
    </el-pagination>
  </div>
</template>
<script>
import {addK, deleted, query, showUpdateDialog, update} from "@/api/staff/ChaK";

export default {
  name: "ChaK",
  data() {
    return {
      labelPosition: 'right',
      addDialogFormVisible: false,
      updateDialogFormVisible: false,
      KeShiArr: [],
      KeShiInfo: {},
      searchInfo: {},
      totalCount: 0,
    }
  },
  mounted() {
    this.getData(1, 10)
  },
  methods: {
    addK() {
      addK(this.KeShiInfo).then(res => {
        if (res.code === 200) {
          this.addDialogFormVisible = false;
          this.$refs["KeShiInfo"].resetFields()
          this.$message.success('添加科室成功');
        } else {
          this.$message.error('添加失败 请确认数据 或者联系管理员');
        }
        this.getData(1, 10);
      })
    },
    chaK() {
      this.getData(1, 10)
    },
    handleCurrentChange(val) {
      this.getData(val, 10)
    },
    deleteK(id) {
      this.$confirm('此操作将永久删除该科室, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleted(id).then(() => {
          this.$message.success('删除成功');
          this.getData(1, 10);
        })
      });
    },
    showUpdateDialog(id) {
      showUpdateDialog(id).then(res => {
        this.KeShiInfo = res.data;
        this.updateDialogFormVisible = true;
        for (var i = 0; i < this.KeShiArr.length; i++) {
          if (this.KeShiArr[i].state === 0) {
            this.KeShiArr[i].state = "已启用"
          } else if (this.KeShiArr[i].state === 1) {
            this.KeShiArr[i].state = "未启用"
          }
        }
      })
    },
    updateK() {
      update(this.KeShiInfo).then(res => {
        if (res.code === 200) {
          this.updateDialogFormVisible = false;
          this.$message.success('修改成功');
          this.getData(1, 10)
        } else {
          this.$message.error('修改失败 请确认失败 或者联系管理员');
        }
      })
      this.$refs["KeShiInfo"].resetFields()
    },
    getData(a, b) {
      this.searchInfo.pageNO = a;
      this.searchInfo.pageCount = b;
      query(this.searchInfo).then(res => {
        if (res.code === 200) {
          this.KeShiArr = res.data.crrentData;
          this.totalCount = res.data.totalCount;
          for (var i = 0; i < this.KeShiArr.length; i++) {
            if (this.KeShiArr[i].state === 0) {
              this.KeShiArr[i].state = "已启用"
            } else if (this.KeShiArr[i].state === 1) {
              this.KeShiArr[i].state = "未启用"
            }
          }
        }
      })
    },
    closeData(){
      this.KeShiInfo={}
      this.$refs["KeShiInfo"].resetFields();
    }
  }
}
</script>
<style scoped>

</style>
