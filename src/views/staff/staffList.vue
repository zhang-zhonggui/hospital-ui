<template>
  <div id="staff">
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
      <el-form-item>
        <el-button type="primary" @click="addStaffInfo()">添加</el-button>
        <el-button type="primary" @click="exportSta()">导出</el-button>
      </el-form-item>
      <a href="@/assets/excel/temp.xlsx">下载模板</a>
      <form id="upform">
        <input name="hehe" type="file">
      </form>
      <el-button type="primary" @click="uploadSta()">导入</el-button>
    </el-form>
    <el-table :data="staffArr" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="80">
      </el-table-column>

      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>

      <el-table-column prop="age" label="年龄">
      </el-table-column>

      <el-table-column prop="sex" label="性别">
      </el-table-column>

      <el-table-column prop="education" label="学历">
      </el-table-column>

      <el-table-column prop="phone" label="电话">
      </el-table-column>

      <el-table-column prop="buname.buname" label="部门">
      </el-table-column>

      <el-table-column prop="title.title" label="职务">
      </el-table-column>

      <el-table-column prop="keshi.keshi" label="科室">
      </el-table-column>

      <el-table-column prop="state" label="状态">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">


        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteStaff(scope.row.id)">删除</el-button>
          <el-button type="text" size="small" @click="showUpdateDialog(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>


    </el-table>
    <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="totalCount">
    </el-pagination>

    <el-dialog title="添加员工" :visible.sync="dialogFormVisible">
      <el-form :model="staffInfo" :rules="rules" ref="staffInfo" label-width="80px">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="staffInfo.name"></el-input>
        </el-form-item>

        <el-form-item label="人员性别">
          <el-select v-model="staffInfo.sex" placeholder="请选择人员性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input v-model="staffInfo.age" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>

        <el-form-item label="学历" prop="education">
          <el-input v-model="staffInfo.education"></el-input>
        </el-form-item>

        <el-form-item label="员工电话" prop="phone">
          <el-input v-model="staffInfo.phone" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>

        <el-form-item label="部门" prop="bid">
          <el-select v-model="staffInfo.bid" placeholder="请选择入职部门">
            <el-option
                v-for="b in bunameArr"
                :key="b.id"
                :label="b.buname"
                :value="b.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="科室" prop="kid">
          <el-select v-model="staffInfo.kid" placeholder="请选择入职科室">
            <el-option
                v-for="k  in  keshiArr"
                :label="k.keshi"
                :key="k.id"
                :value="k.id">

            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="职务" prop="tid">
          <el-select v-model="staffInfo.tid" placeholder="请选择职务或职称">
            <el-option v-for="t  in  titleArr " :key="t.id" :label="t.title" :value="t.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="人员状态">
          <el-select v-model="staffInfo.state" placeholder="请选择人员状态">
            <el-option label="在职" value="0"></el-option>
            <el-option label="离职" value="1"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStaff()">添 加</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

    <el-dialog title="修改员工信息" :visible.sync="updateDialogFormVisible">
      <el-form :model="staffInfo" :rules="rules" ref="staffInfo">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="staffInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工年龄" prop="age">
          <el-input v-model="staffInfo.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工性别" prop="sex">
          <el-input v-model="staffInfo.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工学历" prop="education">
          <el-input v-model="staffInfo.education" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工电话" prop="phone">
          <el-input v-model="staffInfo.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="bid">
          <el-select v-model="staffInfo.bid" placeholder="请选择部门">
            <el-option v-for="b in bunameArr" :key="b.id" :label="b.buname" :value="b.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职务" prop="tid">
          <el-select v-model="staffInfo.tid" placeholder="请选择职务">
            <el-option v-for="t  in  titleArr " :key="t.id" :label="t.title" :value="t.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科室" prop="kid">
          <el-select v-model="staffInfo.kid" placeholder="请选择科室">
            <el-option v-for="k  in  keshiArr " :key="k.id" :label="k.keshi" :value="k.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员状态">
          <el-select v-model="staffInfo.state" placeholder="请选择人员状态">
            <el-option label="在职" value="0"></el-option>
            <el-option label="离职" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSta()">修 改</el-button>
      </div>

    </el-dialog>

  </div>
</template>
<script>
import {
  del,
  getStaffList,
  saveStaff,
  updateDialog,
  update,
  uploadSta,
  getBranchList,
  getKeshiList, getTitleList
} from "@/api/staff/staffList";

export default {
  name: "staffList",
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      bunameArr: [],
      keshiArr: [],
      titleArr: [],
      dialogFormVisible: false,
      staffInfo: {},
      staffArr: [],
      searchInfo: {
        pageNO: 1,
        pageCount: 10,
        name: "",
        keshi: "",
        title: ""
      },
      andleCurrentChange: {},
      totalCount: 0,
      updateDialogFormVisible: false,
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        age: [
          {required: true, message: '请输入年龄', trigger: 'blur'},
        ],
        sex: [
          {required: true, message: '请输入性别', trigger: 'blur'},
        ],
        education: [
          {required: true, message: '请输入学历', trigger: 'blur'},
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {min: 11, max: 11, message: '请输入正确手机号', trigger: 'blur'},
        ],
        bid: [
          {required: true, message: '请选择部门', trigger: 'change'},
        ],
        kid: [
          {required: true, message: '请选择科室', trigger: 'change'},
        ],
        tid: [
          {required: true, message: '请选择职称/职务', trigger: 'change'},
        ],
        state: [
          {required: true, message: '请选择状态', trigger: 'change'},
        ],
      }
    }
  },
  mounted() {
    this.getBranch();
    this.getKeshi();
    this.getTitle();
    this.getData(1, 10)
  },
  methods: {
    uploadSta() {
      var staData = new FormData(this.upform);
      uploadSta(staData).then((response) => {
        if (response.code === 200) {
          this.$notify({
            title: "温馨提示",
            message: response.msg,
            type: "success",
          });
        } else {
          this.$notify({
            title: "温馨提示",
            message: response.msg,
            type: "error",
          });
        }
      })

    },
    addStaff() {
      this.$refs["staffInfo"].validate((valid) => {
        if (valid) {
          saveStaff(this.staffInfo).then((response) => {
            if (response.code === 200) {
              this.$notify({
                title: "温馨提示",
                message: response.msg,
                type: "success",
              });
              this.dialogFormVisible = false;
              this.$refs["staffInfo"].resetFields();
            } else {
              this.$notify({
                title: "温馨提示",
                message: "添加失败 请确认数据 或者联系管理员",
                type: "error",
              });
            }
          })
        }
      });

    },
    updateSta() {
      update(this.staffInfo).then((response) => {
        if (response.code === 200) {
          this.updateDialogFormVisible = false;
          this.$refs["staffInfo"].resetFields();
          this.$message.success('修改成功');
          this.getData(1, 10);
        }
      })
    },
    deleteStaff(id) {
      this.$confirm('此操作将永久删除该人员, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(id).then((response) => {
          this.$message.success(response.msg)
        })
        this.getData(1, 10);
      });
    },
    getData(a, b) {
      this.searchInfo.pageNO = a;
      this.searchInfo.pageCount = b;
      getStaffList(this.searchInfo).then((response) => {
        if (response.code === 200) {
          this.staffArr = response.data.list;
          this.totalCount = response.data.total;
        }
      })

    },
    showUpdateDialog(id) {
      updateDialog(id).then((response) => {
        if (response.code === 200) {
          this.staffInfo = response.data;
          this.updateDialogFormVisible = true;
        }
      })
    },
    addStaffInfo() {
      this.dialogFormVisible = true;
      this.staffInfo = {};
    },
    seachInfo() {
      this.getData(1, 10)
    },
    handleCurrentChange(val) {
      this.getData(val, 10)
    },
    getBranch() {
      getBranchList().then((response) => {
        if (response.code === 200) {
          this.bunameArr = response.data;
          this.dialogFormVisible = false;
        }
      })
    },
    getKeshi() {
      getKeshiList().then((response) => {
        if (response.code === 200) {
          this.keshiArr = response.data;
          this.dialogFormVisible = false;
        }
      })
    },
    getTitle() {
      getTitleList().then((response) => {
        if (response.code === 200) {
          this.titleArr = response.data;
          this.dialogFormVisible = false;
        }
      })
    },
  },
}
</script>
<style scoped>

</style>
