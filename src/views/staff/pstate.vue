<template>
  <div id="pstate">
    <el-form :inline="true" :model="searchInfo" class="demo-form-inline">

      <el-form-item label="姓名">
        <el-input v-model="searchInfo.name" placeholder="姓名"></el-input>
      </el-form-item>

      <el-form-item label="科室">
        <el-input v-model="searchInfo.keshi" placeholder="科室名称"></el-input>
      </el-form-item>

      <el-form-item label="职务">
        <el-input v-model="searchInfo.title" placeholder="职务"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="seachInfo()">查询</el-button>
      </el-form-item>

    </el-form>
    <el-table
        :data="staffArr"
        border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="编号"
          width="80">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="age"
          label="年龄">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="education"
          label="学历">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="电话">
      </el-table-column>
      <el-table-column
          prop="buname"
          label="部门">
      </el-table-column>
      <el-table-column
          prop="title"
          label="职务">
      </el-table-column>
      <el-table-column
          prop="keshi"
          label="科室">
      </el-table-column>
      <el-table-column prop="state" label="状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" slot="reference" type="danger" @click="handleSetDanger( scope.row.id)"
                     v-if="scope.row.state=='在职'">离职办理
          </el-button>
          <el-button size="mini" slot="reference" type="success" @click="handleSetSuccess(scope.row.id)"
                     v-if="scope.row.state=='离职'">入职办理
          </el-button>
        </template>

      </el-table-column>

    </el-table>
    <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="totalCount">
    </el-pagination>
  </div>
</template>
<script>
import {getStaffList} from "@/api/staff/staffList";
import {handleSetSuccess, setstate} from "@/api/staff/pstate";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "pstate",
  data() {
    return {
      bunameArr: [],
      keshiArr: [],
      titleArr: [],
      staffInfo: {},
      staffArr: [],
      searchInfo: {},
      totalCount: 0,
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.getData(val, 10)
    },
    seachInfo() {
      this.getData(1, 10)
    },
    handleSetDanger(id) {
      this.$confirm('确认为该员工办理离职吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setstate(id).then(() => {
          this.$message.success('离职办理成功');
          this.getData(1, 10);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消离职'
        });
      });
    },
    handleSetSuccess(id) {
      this.$confirm('确认为该员工办理入职吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        handleSetSuccess(id).then(() => {
          this.$message.success("入职办理成功");
          this.getData(1, 10);
        })

      })
    },
    getData(a, b) {
      this.searchInfo.pageNO = a;
      this.searchInfo.pageCount = b;
      getStaffList(this.searchInfo).then((response) => {
        if (response.code === 200) {
          this.staffArr = response.data.list;
          this.totalCount = response.data.total;
          for (var i = 0; i < this.staffArr.length; i++) {
            if (this.staffArr[i].state == 0) {
              this.staffArr[i].state = "在职"
            } else if (this.staffArr[i].state == 1) {
              this.staffArr[i].state = "离职"
            }
          }
        }
      })

    },

  },
  mounted() {
    this.getData(1, 10);
  }
}
</script>

<style scoped>

</style>
