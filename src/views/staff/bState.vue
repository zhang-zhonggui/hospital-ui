<template>
  <div id="bState">
    <el-form>
      <el-input size="medium" placeholder="请输入部门" style="display: inline-block;width: 200px;"
                v-model.trim="searchInfo.name"
                >
      </el-input>

      <el-button type="primary" @click="deptSearch()">查询</el-button>
    </el-form>
    <template>
      <el-table
          :data="  deptArr"
          border
          style="width: 100%">
        <el-table-column
            prop="id"
            label="编号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="科室名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="state"
            label="部门状态">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="changeDanger( scope.row.id)" v-if="scope.row.state=='启用'">停用
            </el-button>
            <el-button type="success" @click="changeSuccess(scope.row.id)" v-if="scope.row.state=='禁用'">启用
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
import {closeState, openState, query} from "@/api/staff/bumen";

export default {
  name: "bState",
  data() {
    return {
      deptArr: [],
      searchInfo: {},
      totalCount: 0,
    }
  },

  methods: {
    deptSearch() {
      this.getData(1, 10)
    },
    handleCurrentChange(val) {
      this.getData(val, 10)
    },
    changeDanger(id) {
      this.$confirm('确认禁用该部门吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        closeState(id).then(res => {
          this.$message.error(res.data);
          this.getData(1, 10);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用'
        });
      });
    },
    changeSuccess(id) {
      this.$confirm('确认启用该部门吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        openState(id).then(res => {
          this.$message.success(res.data);
          this.getData(1, 10);
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
          this.deptArr = res.data.list;
          this.totalCount = res.data.total;
        }
      })
    }


  },
  mounted() {
    this.getData(1, 10)
  }
}
</script>

<style scoped>

</style>
