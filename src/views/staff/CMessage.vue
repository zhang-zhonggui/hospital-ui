<template>
  <div id="cMessage">
    <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
      <el-form-item label="病人姓名">
        <el-input v-model="searchInfo.pname" placeholder="查询病人"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="ChaPatient">查询</el-button>
      </el-form-item>
    </el-form>

    <template>
      <el-table :data="PatientInfoArr" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="180"/>
        <el-table-column prop="pname" label="病人姓名" width="180"/>
        <el-table-column prop="age" label="年龄" width="180"/>
        <el-table-column prop="sex" label="性别" width="180"/>
        <el-table-column prop="riqi" label="就诊日期" width="180"/>
        <el-table-column prop="keshi.keshi" label="就诊科室" width="180"/>
        <el-table-column prop="staff.name" label="就诊医生" width="180"/>
        <el-table-column prop="text" label="病情" width="180"/>
        <el-table-column prop="illness" label="医嘱"/>
        <el-table-column label="修改医嘱">
          <template slot-scope="scope">
            <el-button type="danger" @click="get(scope.row.id)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog title="修改医嘱" :visible.sync="AddFourDialogFormVisible">
      <el-form :model="PatientInfo" ref="DoctorDJInfo">
        <el-form-item label="编号：" prop="id">
          <el-input v-model="PatientInfo.id" autocomplete="off" disabled/>
        </el-form-item>
        <el-form-item label="修改医嘱" prop="illness">
          <el-input v-model="PatientInfo.illness" autocomplete="off"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="AddFourDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="updateYZ">修改</el-button>
      </div>
    </el-dialog>

    <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="totalCount"
    />
  </div>
</template>

<script>
import {getDeptById, query, update} from '@/api/staff/CMessage';

export default {
  name: 'CMessage',
  data() {
    return {
      PatientInfoArr: [],
      PatientInfo: {},
      searchInfo: {
        id: -1,
        pname: '',
        pageNO: 1,
        pageCount: 6,
      },
      totalCount: 0,
      AddFourDialogFormVisible: false,
    };
  },
  mounted() {
    this.searchInfo.id = this.$route.query.id;
    this.getData();
    this.searchInfo.id = -1;
  },
  methods: {
    async updateYZ() {
      try {
        const res = await update(this.PatientInfo);
        if (res.code === 200) {
          this.AddFourDialogFormVisible = false;
          this.$message.success('修改成功');
          this.getData();
        } else {
          this.$message.error('修改失败 请确认修改信息 或者联系管理员');
        }
      } catch (error) {
        console.error(error);
        this.$message.error('网络错误，请稍后重试');
      }
    },
    async get(id) {
      try {
        const res = await getDeptById(id);
        this.PatientInfo = res.data;
        this.AddFourDialogFormVisible = true;
      } catch (error) {
        console.error(error);
        this.$message.error('网络错误，请稍后重试');
      }
    },
    ChaPatient() {
      this.searchInfo.pageNO = 1;
      this.searchInfo.pageCount = 6;
      this.getData();
    },
    handleCurrentChange(val) {
      this.searchInfo.pageNO = val;
      this.getData();
    },
    async getData() {
      try {
        const res = await query(this.searchInfo);
        this.PatientInfoArr = res.data.crrentData;
        this.totalCount = res.data.totalCount;
      } catch (error) {
        console.error(error);
        this.$message.error('网络错误，请稍后重试');
      }
    },
  },
};
</script>

