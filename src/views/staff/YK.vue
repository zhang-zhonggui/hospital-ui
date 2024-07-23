<template>
  <div id="yk">
    <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
      <el-form-item label="病人姓名">
        <el-input v-model="searchInfo.pname" placeholder="查询病人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="ChaPatient">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="PatientInfoArr" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="pname" label="病人姓名" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄" width="180"></el-table-column>
      <el-table-column prop="sex" label="性别" width="180"></el-table-column>
      <el-table-column prop="riqi" label="预约日期" width="180"></el-table-column>
      <el-table-column prop="keshi.keshi" label="预约科室" width="180"></el-table-column>
      <el-table-column prop="staff.name" label="预约医生" width="180"></el-table-column>
      <el-table-column prop="text" label="病情" width="180"></el-table-column>
      <el-table-column label="预约情况">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.state === 1">已处理</el-button>
          <el-button type="danger" v-if="scope.row.state === 0" @click="handleChangeStatus(scope.row.id)">
            处理
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="info" v-if="scope.row.illness === 1" @click="get(scope.row.id)">
            添加医嘱
          </el-button>
          <el-button type="info" v-if="scope.row.illness !== 1">
            <router-link :to="{path: '/staff/CMessage',query: {id: scope.row.id}}">查看病历</router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加医嘱" :visible.sync="AddFourDialogFormVisible">
      <el-form :model="PatientInfo" ref="DoctorDJInfo">
        <el-form-item label="编号：" prop="id">
          <el-input v-model="PatientInfo.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="请添加医嘱" prop="illness">
          <el-input v-model="PatientInfo.illness" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="AddFourDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="updateYZ">添 加</el-button>
      </div>
    </el-dialog>

    <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
// 导入axios请求函数
import {query, update, getDeptById} from '@/api/staff/YK';

export default {
  name: 'YK',
  data() {
    return {
      PatientInfoArr: [],
      PatientInfo: {},
      searchInfo: {
        pname: '', // 默认值为空字符串
        pageNO: 1,
        pageCount: 6,
      },
      totalCount: 0,
      AddFourDialogFormVisible: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async updateYZ() {
      try {
        const res = await update(this.PatientInfo);
        if (res.code === 1) {
          this.AddFourDialogFormVisible = false;
          this.$message.success('添加成功');
          await this.getData();
        } else {
          this.$message.error('添加失败 请确认添加信息 或者联系管理员');
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
    handleChangeStatus(id) {
      this.$confirm('即将为该病人看病, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        // 在这里调用后端接口修改状态
        try {
          // 假设接口参数为 {id, state}
          const res = await update({id, state: 1});
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '看病完成，将为该病人添加医嘱',
              type: 'success',
            });
            this.getData();
          } else {
            this.$message.error(res.msg || '修改状态失败');
          }
        } catch (error) {
          console.error(error);
          this.$message.error('网络错误，请稍后重试');
        }
      });
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

