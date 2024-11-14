<template>
  <div id="bumen">
    <div class="demo-input-size">

      <el-input size="medium" placeholder="请输入部门" style="display: inline-block;width: 200px;"
                clearable v-model.trim="searchInfo.name">
      </el-input>

      <el-button type="primary" @click="deptSearch()">查询</el-button>
      <el-button type="success" @click="addDept()">添加</el-button>

      <el-table :data="deptArr" border style="width: 100%">
        <el-table-column prop="id" label="编号">
        </el-table-column>
        <el-table-column prop="name" label="部门">
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
                    <span v-if="scope.row.state=== 0">
                 <div class="state-icon icon0"></div>开启
             </span>
            <span v-if="scope.row.state === 1">
                 <div class="state-icon icon1"></div>关闭
             </span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="warning" @click="getDept(scope.row.id)">修改</el-button>
            <el-button type="danger" @click="deleteDept(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="totalCount">
      </el-pagination>

      <el-dialog title="添加操作" @close="closeData()" :visible.sync="dialogFormVisible">
        <el-form :model="Department" :rules="rules" ref="Department">
          <el-form-item label="部门" prop="name">
            <el-input v-model="Department.name"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="Department.state" placeholder="请选择状态">
              <el-option label="开启" value="0"></el-option>
              <el-option label="关闭" value="1"></el-option>

            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="deptAdd()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改操作" @close="closeData()" :visible.sync="updatedialogFormVisible">
        <el-form :model="Department" :rules="rules" ref="Department">
          <el-form-item label="部门" prop="username">
            <el-input v-model="Department.name"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="Department.state" placeholder="请选择状态">
              <el-option label="开启" value="0"></el-option>
              <el-option label="关闭" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updatedialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateDept()">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
import {deleteDept, query, getDeptById, sava, update} from "@/api/staff/bumen";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "bumen",
  data() {
    return {
      searchInfo: {},
      deptArr: [],
      totalCount: 0,
      dialogFormVisible: false,
      updatedialogFormVisible: false,
      Department: {},
      rules: {
        name: [{
          required: true,
          message: '请输入部门',
          trigger: 'blur'
        },
          {
            min: 1,
            max: 7,
            message: '长度在1到7个字符',
            trigger: 'blur'
          }

        ],
        state: [{
          required: true,
          message: '请输入状态',
          trigger: 'blur'
        },
          {
            min: 1,
            max: 2,
            message: '长度在1到2个字符',
            trigger: 'blur'
          }

        ],
      }
    }
  },
  mounted() {
    this.getData(1, 10)
  },
  methods: {
    getData(a, b) {
      this.searchInfo.pageNO = a;
      this.searchInfo.pageCount = b;
      query(this.searchInfo).then(res => {
        if (res.code === 200) {
          this.deptArr = res.data.list;
          this.totalCount = res.data.total;
        }
      })
    },
    updateDept() {
      update(this.Department).then((response) => {
        if (response.code === 200) {
          this.updatedialogFormVisible = false;
          this.$refs["Department"].resetFields();
          this.$message.success('修改成功');
          this.getData(1, 10);
        } else {
          this.$message.error('修改错误');
        }
      })
    },
    getDept(id) {
      getDeptById(id).then(res => {
        this.Department = res.data;
        this.updatedialogFormVisible = true;
      })
    },

    deleteDept(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDept(id).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功');
            this.getData(1, 10);
          } else {
            this.$message.error('删除失败');
          }
        })
      })
    },
    deptAdd() {
      this.$refs["Department"].validate((valid) => {
        if (valid) {
          sava(this.Department).then((response) => {
            if (response.code === 200) {
              this.dialogFormVisible = false;
              this.$refs["Department"].resetFields();
              this.$message.success('添加成功');
              this.getData(1, 10);
            } else {
              this.$message.error('添加失败')
            }
          })
        }
      });

    },
    addDept() {
      this.dialogFormVisible = true;
    },
    deptSearch() {
      this.getData(1, 10)
    },
    handleCurrentChange(val) {
      this.getData(val, 10)
    },
    closeData(){
      this.Department={}
      this.$refs["Department"].resetFields();
    }
  }
}
</script>
<style scoped>

</style>
