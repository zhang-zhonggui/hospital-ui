<template>
  <div id="pricing">
    <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
      <el-form-item label="医生姓名">
        <el-input v-model="searchInfo.name" placeholder="查询医生"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chaK()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="DoctorDjArr"
        border
        style="width: 100%">
      <el-table-column prop="id" label="编号" align="center" width="80px"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="90px"></el-table-column>
      <el-table-column prop="keshi" label="科室" align="center" width="90px"></el-table-column>

      <el-table-column prop="stimeone" align="center" :label="showDate[0]">
        <template slot-scope="scope">
          <el-button plain v-if="scope.row.stimeone != 0" @click="getOne(scope.row.id)">
            当前可预约人数:{{ scope.row.stimeone }}<br/><br/> 预约价格：{{ scope.row.sonedj }}
          </el-button>
          <el-button plain v-if="scope.row.stimeone === 0" @click="AddOne(scope.row.id)">添加排班</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="stimetwo" align="center" :label="showDate[1]">
        <template slot-scope="scope">
          <el-button plain v-if="scope.row.stimetwo != 0" @click="getTwo(scope.row.id)">
            当前可预约人数：{{ scope.row.stimetwo }}<br/><br/> 预约价格：{{ scope.row.stwodj }}
          </el-button>
          <el-button plain v-if="scope.row.stimetwo === 0" @click="AddTwo(scope.row.id)">添加排班</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="stimethree" align="center" :label="showDate[2]">
        <template slot-scope="scope">
          <el-button plain v-if="scope.row.stimethree != 0 " @click="getThree(scope.row.id)">
            当前可预约人数：{{ scope.row.stimethree }}<br/><br/> 预约价格：{{ scope.row.sthreedj }}
          </el-button>
          <el-button plain v-if="scope.row.stimethree === 0 " @click="AddThree(scope.row.id)">添加排班</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="stimefour" align="center" :label="showDate[3]">
        <template slot-scope="scope">
          <el-button plain v-if="scope.row.stimefour != 0" @click="getFour(scope.row.id)">
            当前可预约人数：{{ scope.row.stimefour }}<br/><br/> 预约价格：{{ scope.row.sfourdj }}
          </el-button>
          <el-button plain v-if="scope.row.stimefour === 0" @click="AddFour(scope.row.id)">添加排班</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="修改排班定价" :visible.sync="OneUpdateDialogFormVisible">
      <el-form :model=" DoctorDJInfo" ref=" DoctorDJInfo">
        <el-form-item label="预约编号：" prop="id">
          <el-input v-model=" DoctorDJInfo.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前可预约人数：" prop="stimeone">
          <el-input v-model=" DoctorDJInfo.stimeone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前预约价格：" prop="sonedj">
          <el-input v-model=" DoctorDJInfo.sonedj" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="UpdateOne()">修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改排班定价" :visible.sync="TwoUpdateDialogFormVisible">
      <el-form :model=" DoctorDJInfo" ref=" DoctorDJInfo">
        <el-form-item label="预约编号：" prop="id">
          <el-input v-model=" DoctorDJInfo.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前可预约人数：" prop="stimetwo">
          <el-input v-model=" DoctorDJInfo.stimetwo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前预约价格：" prop="stwodj">
          <el-input v-model=" DoctorDJInfo.stwodj" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="TwoUpdateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="UpdateTwo()">修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改排班定价" :visible.sync="ThreeUpdateDialogFormVisible">
      <el-form :model=" DoctorDJInfo" ref=" DoctorDJInfo">
        <el-form-item label="预约编号：" prop="id">
          <el-input v-model=" DoctorDJInfo.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前可预约人数：" prop="stimethree">
          <el-input v-model=" DoctorDJInfo.stimethree" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前预约价格：" prop="sthreedj">
          <el-input v-model=" DoctorDJInfo.sthreedj" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="ThreeUpdateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="UpdateThree()">修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改排班定价" :visible.sync="FourUpdateDialogFormVisible">
      <el-form :model=" DoctorDJInfo" ref=" DoctorDJInfo">
        <el-form-item label="预约编号：" prop="id">
          <el-input v-model=" DoctorDJInfo.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前可预约人数：" prop="s_time_four">
          <el-input v-model=" DoctorDJInfo.stimefour" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前预约价格：" prop="sfourdj">
          <el-input v-model=" DoctorDJInfo.sfourdj" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="FourUpdateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="UpdateFour()">修 改</el-button>
      </div>
    </el-dialog>
    <!--添加 按照修改去操作-->
    <el-dialog title="添加排班定价" :visible.sync="AddOneDialogFormVisible">
      <el-form :model=" DoctorDJInfo" ref=" DoctorDJInfo">
        <el-form-item label="预约编号：" prop="id">
          <el-input v-model=" DoctorDJInfo.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前可预约人数：" prop="stimeone">
          <el-input v-model=" DoctorDJInfo.stimeone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前预约价格：" prop="sonedj">
          <el-input v-model=" DoctorDJInfo.sonedj" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="AddOneDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="AddO()">添 加</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加排班定价" :visible.sync="AddTwoDialogFormVisible">
      <el-form :model=" DoctorDJInfo" ref=" DoctorDJInfo">
        <el-form-item label="预约编号：" prop="id">
          <el-input v-model=" DoctorDJInfo.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前可预约人数：" prop="stimetwo">
          <el-input v-model=" DoctorDJInfo.stimetwo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前预约价格：" prop="stwodj">
          <el-input v-model=" DoctorDJInfo.stwodj" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="AddOneDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="AddT()">添 加</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加排班定价" :visible.sync="AddThreeDialogFormVisible">
      <el-form :model=" DoctorDJInfo" ref=" DoctorDJInfo">
        <el-form-item label="预约编号：" prop="id">
          <el-input v-model=" DoctorDJInfo.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前可预约人数：" prop="stimethree">
          <el-input v-model=" DoctorDJInfo.stimethree" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前预约价格：" prop="sthreedj">
          <el-input v-model=" DoctorDJInfo.sthreedj" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="AddOneDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="AddTH()">添 加</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加排班定价" :visible.sync="AddFourDialogFormVisible">
      <el-form :model=" DoctorDJInfo" ref=" DoctorDJInfo">
        <el-form-item label="预约编号：" prop="id">
          <el-input v-model=" DoctorDJInfo.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前可预约人数：" prop="stimefour">
          <el-input v-model=" DoctorDJInfo.stimefour" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="当前预约价格：" prop="sfourdj">
          <el-input v-model=" DoctorDJInfo.sfourdj" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="AddOneDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="AddF()">添 加</el-button>
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
import {
  AddF,
  AddFour,
  AddO,
  AddOne,
  AddTH,
  AddThree,
  AddTwo,
  getFour, getOne,
  getThree, getTwo,
  query,
  UpdateFour, UpdateOne, UpdateThree, UpdateTwo
} from "@/api/staff/pricing";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "pricing",
  data() {
    return {
      time: {
        stimeOne: "",
        stimeTwo: "",
        stimeThree: "",
        stimeFour: "",
      }, AddFourDialogFormVisible: false,
      AddThreeDialogFormVisible: false,
      AddTwoDialogFormVisible: false,
      AddOneDialogFormVisible: false,
      FourUpdateDialogFormVisible: false,
      ThreeUpdateDialogFormVisible: false,
      TwoUpdateDialogFormVisible: false,
      OneUpdateDialogFormVisible: false,
      DoctorDjArr: [] + "",
      DoctorDJInfo: {},
      searchInfo: {},
      totalCount: 0,
      showDate: [],
    }
  },
  methods: {
    AddF() {
      AddF(this.DoctorDJInfo).then(res => {
        if (res.code === 200) {
          this.AddFourDialogFormVisible = false;
          this.$message.success('添加成功');
          this.getData(1, 6);
        } else {
          this.$message.error('添加失败 请确认添加信息 或者联系管理员');
        }
      })
    },
    AddFour(id) {
      AddFour(id).then(res => {
        this.DoctorDJInfo = res.data;
        this.AddFourDialogFormVisible = true;
      })
    },
    AddTH() {
      AddTH(this.DoctorDJInfo).then(res => {
        if (res.code === 200) {
          this.AddThreeDialogFormVisible = false;
          this.$message.success('添加成功');
          this.getData(1, 6);
        } else {
          this.$message.error('添加失败 请确认添加信息 或者联系管理员');
        }
      })
    },
    AddThree(id) {
      AddThree(id).then(res => {
        this.DoctorDJInfo = res.data;
        this.AddThreeDialogFormVisible = true;
      })
    },
    AddT() {
      AddTH(this.DoctorDJInfo).then(res => {
        if (res.code === 200) {
          this.AddTwoDialogFormVisible = false;
          this.$message.success('添加成功');
          this.getData(1, 6);
        } else {
          this.$message.error('添加失败 请确认添加信息 或者联系管理员');
        }
      })
    },
    AddTwo(id) {
      AddTwo(id).then(res => {
        this.DoctorDJInfo = res.data;
        this.AddTwoDialogFormVisible = true;
      })
    },
    AddO() {
      AddO(this.DoctorDJInfo).then(res => {
        if (res.code === 200) {
          this.AddOneDialogFormVisible = false;
          this.$message.success('添加成功');
          this.getData(1, 6);
        } else {
          this.$message.error('添加失败 请确认添加信息 或者联系管理员');
        }
      })
    },
    AddOne(id) {
      AddOne(id).then(res => {
        this.DoctorDJInfo = res.data;
        this.AddOneDialogFormVisible = true;
      })
    },
    getFour(id) {
      getFour(id).then(res => {
        this.DoctorDJInfo = res.data;
        this.FourUpdateDialogFormVisible = true;
      })
    },
    UpdateFour() {
      UpdateFour(this.DoctorDJInfo).then(res => {
        if (res.code === 200) {
          this.FourUpdateDialogFormVisible = false;
          this.$message.success('修改成功');
          this.getData(1, 6);
        } else {
          this.$message.error('修改失败 请确认修改信息 或者联系管理员');
        }
      })
    },
    getThree(id) {
      getThree(id).then(res => {
        this.DoctorDJInfo = res.data;
        this.ThreeUpdateDialogFormVisible = true;
      })
    },
    UpdateThree() {
      UpdateThree.then(res => {
        if (res.code === 200) {
          this.ThreeUpdateDialogFormVisible = false;
          this.$message.success('修改成功');
          this.getData(1, 6);
        } else {
          this.$message.error('修改失败 请确认修改信息 或者联系管理员');
        }
      })
    },
    getTwo(id) {
      getTwo(id).then(res => {
        this.DoctorDJInfo = res.data;
        this.TwoUpdateDialogFormVisible = true;
      })
    },
    UpdateTwo() {
      UpdateTwo(this.DoctorDJInfo).then(res => {
        if (res.code === 200) {
          this.TwoUpdateDialogFormVisible = false;
          this.$message.success('修改成功');
          this.getData(1, 6);
        } else {
          this.$message.error('修改失败 请确认修改信息 或者联系管理员');
        }
      })
    },
    getOne(id) {
      getOne(id).then(res => {
        this.DoctorDJInfo = res.data;
        this.OneUpdateDialogFormVisible = true;
      })
    },
    UpdateOne() {
      UpdateOne(this.DoctorDJInfo).then(res => {
        if (res.code === 200) {
          this.OneUpdateDialogFormVisible = false;
          this.$message.success('修改成功');
          this.getData(1, 6);
        } else {
          this.$message.error('修改失败 请确认修改信息 或者联系管理员');
        }
      })
    },
    chaK() {
      this.getData(1, 6)
    },
    handleCurrentChange(val) {
      this.getData(val, 6)
    },
    getData(a, b) {
      this.searchInfo.pageNO = a;
      this.searchInfo.pageCount = b;
      query(this.searchInfo).then(res => {
        this.DoctorDjArr = res.data.crrentData;
        this.totalCount = res.data.totalCount;
      }).catch(() => {
        this.$message.error('获取失败 请联系管理员');
      })
    },
    generateShowDates() {
      const data1 = new Date();
      for (let i = 0; i < 4; i++) {
        const date = data1.getDate() < 10 ? '0' + data1.getDate() : data1.getDate();
        const yue =
            data1.getMonth() + 1 < 10
                ? '0' + (data1.getMonth() + 1)
                : data1.getMonth() + 1;
        this.showDate.push(data1.getFullYear() + '-' + yue + '-' + date);
        data1.setDate(data1.getDate() + 1);
      }
    },
  },
  mounted() {
    this.getData(1, 6);
    this.generateShowDates();
  }
}
</script>
<style scoped>

</style>
