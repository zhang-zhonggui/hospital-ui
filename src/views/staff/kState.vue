<template>
  <div id="kState">
    <el-form :inline="true" :model="searchInfo" class="demo-form-inline">

      <el-form-item label="科室">
        <el-input v-model.trim="searchInfo.keshi" placeholder="查询科室"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="chaK()">查询</el-button>
      </el-form-item>

    </el-form>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="changeDanger( scope.row.id)" v-if="scope.row.state=='已启用'">停用
            </el-button>
            <el-button type="success" @click="changeSuccess(scope.row.id)" v-if="scope.row.state=='未启用'">启用
            </el-button>
          </template>

        </el-table-column>

      </el-table>
    </template>
    <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="totalCount">
    </el-pagination>
  </div>
</template>
<script>
import {closeState, openState, query} from "@/api/staff/ChaK";

export default {
  name: "kState",
  data() {
    return {
      KeShiArr: [],
      searchInfo: {},
      totalCount: 0,
    }
  },
  mounted() {
    this.getData(1, 10)
  },
  methods: {
    chaK(){
      this.getData(1,10)
    },
    handleCurrentChange(val){
      this.getData(val,10)
    },
    changeDanger(id) {
      this.$confirm('确认禁用该科室吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        closeState(id).then(res => {
          if (res.code === 200) {
            this.$message.success('禁用成功');
            this.getData(1, 10);
          } else {
            this.$message.error('禁用失败');
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用'
        });
      });
    },
    changeSuccess(id) {
      this.$confirm('确认启用该科室吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        openState(id).then(res => {
          if (res.code === 200) {
            this.$message.success('启用成功');
            this.getData(1, 10);
          } else {
            this.$message.error('启用失败');
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用'
        });
      });
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
  },
}
</script>
<style scoped>

</style>
