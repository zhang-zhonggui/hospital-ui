<template>
  <div class="dict-management">
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>字典类型</span>
              <el-button type="primary" size="small" @click="handleAddType">
                <el-icon :size="16">
                  <Plus/>
                </el-icon>
                新增
              </el-button>
            </div>
          </template>
          <el-input
              v-model="typeSearch"
              placeholder="请输入字典类型名称"
              clearable
              size="small"
              style="margin-bottom: 10px"
          />
          <el-table
              :data="filteredTypeList"
              stripe
              style="width: 100%"
              @row-click="handleTypeSelect"
          >
            <el-table-column prop="dictName" label="字典名称" width="180"/>
            <el-table-column prop="dictType" label="字典类型" width="180"/>
            <el-table-column label="操作" width="180">
              <template #default="scope">
                <el-button size="small" @click.stop="handleEditType(scope.row)">
                  编辑
                </el-button>
                <el-button
                    size="small"
                    type="danger"
                    @click.stop="handleDeleteType(scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>字典数据</span>
              <el-button type="primary" size="small" @click="handleAddData">
                <el-icon :size="16">
                  <Plus/>
                </el-icon>
                新增
              </el-button>
            </div>
          </template>
          <el-input
              v-model="dataSearch"
              placeholder="请输入字典标签或键值"
              clearable
              size="small"
              style="margin-bottom: 10px"
          />
          <el-table
              v-loading="dataListLoading"
              :data="filteredDataList"
              stripe
              style="width: 100%"
          >
            <el-table-column prop="dictLabel" label="字典标签" width="180"/>
            <el-table-column prop="dictValue" label="字典键值" width="180"/>
            <el-table-column prop="dictSort" label="排序" width="80"/>
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag
                    :type="row.status === '0' ? 'success' : 'danger'"
                    disable-transitions
                >
                  {{ row.status === "0" ? "正常" : "停用" }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注"/>
            <el-table-column label="操作" width="180">
              <template #default="scope">
                <el-button size="small" @click="handleEditData(scope.row)">
                  编辑
                </el-button>
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDeleteData(scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              v-if="total > 0"
              :current-page="currentPage"
              :page-size="pageSize"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>

    <!-- 新增/编辑字典类型对话框 -->
    <el-dialog
        :visible.sync="typeDialogVisible"
        :title="dialogType === 'add' ? '新增字典类型' : '编辑字典类型'"
        width="500px"
    >
      <el-form
          ref="typeForm"
          :model="typeForm"
          :rules="typeRules"
          label-width="80px"
      >
        <el-form-item label="字典id" v-show="false" :disabled="true" prop="dictId">
          <el-input v-model="typeForm.dictId"/>
        </el-form-item>
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="typeForm.dictName"/>
        </el-form-item>
        <el-form-item label="字典类型" prop="dictType">
          <el-input v-model="typeForm.dictType"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="typeDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitTypeForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 新增/编辑字典数据对话框 -->
    <el-dialog
        :visible.sync="dataDialogVisible"
        :title="dialogType === 'add' ? '新增字典数据' : '编辑字典数据'"
        width="500px"
    >
      <el-form
          ref="dataForm"
          :model="dataForm"
          :rules="dataRules"
          label-width="80px"
      >
        <el-form-item label="字典标签" prop="dictLabel">
          <el-input v-model="dataForm.dictLabel"/>
        </el-form-item>
        <el-form-item label="字典键值" prop="dictValue">
          <el-input v-model="dataForm.dictValue"/>
        </el-form-item>
        <el-form-item label="排序" prop="dictSort">
          <el-input-number v-model="dataForm.dictSort" :min="0"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="dataForm.status">
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" type="textarea"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dataDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitDataForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  listType,
  addType,
  updateType,
  deleteType,
} from "@/api/staff/dict/type";
import {
  pageData,
  addData,
  updateData,
  deleteData,
} from "@/api/staff/dict/data";

export default {
  name: "DictManagement",
  data() {
    return {
      // 字典类型列表
      typeList: [],
      // 字典数据列表
      dataList: [],
      // 表单数据
      typeForm: {
        dictId: null,
        dictName: "",
        dictType: "",
      },
      dataForm: {
        dictCode: null,
        dictLabel: "",
        dictValue: "",
        dictSort: 0,
        status: "0",
        remark: "",
        dictType: "", // 当前选中的字典类型
      },

      // 表单验证规则
      typeRules: {
        dictName: [
          {required: true, message: "请输入字典名称", trigger: "blur"},
        ],
        dictType: [
          {required: true, message: "请输入字典类型", trigger: "blur"},
        ],
      },
      dataRules: {
        dictLabel: [
          {required: true, message: "请输入字典标签", trigger: "blur"},
        ],
        dictValue: [
          {required: true, message: "请输入字典键值", trigger: "blur"},
        ],
        dictSort: [{required: true, message: "请输入排序", trigger: "blur"}],
      },

      // 对话框
      typeDialogVisible: false,
      dataDialogVisible: false,
      dialogType: "add", // 对话框类型：add 或 edit

      // 搜索关键字
      typeSearch: "",
      dataSearch: "",

      // 分页参数
      total: 0,
      currentPage: 1,
      pageSize: 10,

      // 加载状态
      dataListLoading: false,
    };
  },
  computed: {
    // 过滤后的字典类型列表
    filteredTypeList() {
      return this.typeList.filter((item) => {
        return (
            !this.typeSearch ||
            item.dictName.toLowerCase().includes(this.typeSearch.toLowerCase())
        );
      });
    },

    // 过滤后的字典数据列表
    filteredDataList() {
      return this.dataList.filter((item) => {
        return (
            !this.dataSearch ||
            item.dictLabel
                .toLowerCase()
                .includes(this.dataSearch.toLowerCase()) ||
            item.dictValue.toLowerCase().includes(this.dataSearch.toLowerCase())
        );
      });
    },
  },
  created() {
    this.getTypeList();
  },
  methods: {
    // 获取字典类型列表
    getTypeList() {
      listType().then((res) => {
        this.typeList = res.data;
      });
    },
    // 处理字典类型选择
    handleTypeSelect(row) {
      this.dataForm.dictType = row.dictType;
      this.getDataList();
    },
    // 获取字典数据列表
    getDataList() {
      this.dataListLoading = true;
      pageData({
        dictType: this.dataForm.dictType,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      })
          .then((res) => {
            this.dataList = res.data.list;
            this.total = res.data.total;
          })
          .finally(() => {
            this.dataListLoading = false;
          });
    },

    // 处理每页条数改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDataList();
    },

    // 处理页码改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDataList();
    },

    // 新增字典类型
    handleAddType() {
      this.typeDialogVisible = true;
      this.dialogType = "add";
      this.resetTypeForm();
    },

    // 编辑字典类型
    handleEditType(row) {
      this.typeDialogVisible = true;
      this.dialogType = "edit";
      this.typeForm = Object.assign({}, row);
    },
    // 删除字典类型
    handleDeleteType(row) {
      this.$confirm("确定要删除该字典类型吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            deleteType(row.dictId)
                .then(() => {
                  this.$message.success("删除成功");
                  this.getTypeList();
                  // 如果删除的是当前选中的类型，则清空字典数据列表
                  if (row.dictType === this.dataForm.dictType) {
                    this.dataForm.dictType = "";
                    this.dataList = [];
                    this.total = 0;
                  }
                })
                .catch(() => {
                });
          })
          .catch(() => {
          });
    },

    // 提交字典类型表单
    submitTypeForm() {
      this.$refs.typeForm.validate((valid) => {
        if (valid) {
          if (this.dialogType === "add") {
            addType(this.typeForm)
                .then(() => {
                  this.$message.success("新增成功");
                  this.typeDialogVisible = false;
                  this.getTypeList();
                })
                .catch(() => {
                });
          } else {
            updateType(this.typeForm)
                .then(() => {
                  this.$message.success("修改成功");
                  this.typeDialogVisible = false;
                  this.getTypeList();
                })
                .catch(() => {
                });
          }
        }
      });
    },

    // 重置字典类型表单
    resetTypeForm() {
      this.$refs.typeForm.resetFields();
      this.typeForm = {
        dictId: null,
        dictName: "",
        dictType: "",
      };
    },

    // 新增字典数据
    handleAddData() {
      if (!this.dataForm.dictType) {
        this.$message.warning("请先选择字典类型");
        return;
      }
      this.dataDialogVisible = true;
      this.dialogType = "add";
      this.resetDataForm();
    },

    // 编辑字典数据
    handleEditData(row) {
      this.dataDialogVisible = true;
      this.dialogType = "edit";
      this.dataForm = Object.assign({}, row);
    },

    // 删除字典数据
    handleDeleteData(row) {
      this.$confirm("确定要删除该字典数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            deleteData(row.dictCode)
                .then(() => {
                  this.$message.success("删除成功");
                  this.getDataList();
                })
                .catch(() => {
                });
          })
          .catch(() => {
          });
    },

    // 提交字典数据表单
    submitDataForm() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          if (this.dialogType === "add") {
            addData(this.dataForm)
                .then(() => {
                  this.$message.success("新增成功");
                  this.dataDialogVisible = false;
                  this.getDataList();
                })
                .catch(() => {
                });
          } else {
            updateData(this.dataForm)
                .then(() => {
                  this.$message.success("修改成功");
                  this.dataDialogVisible = false;
                  this.getDataList();
                })
                .catch(() => {
                });
          }
        }
      });
    },

    // 重置字典数据表单
    resetDataForm() {
      this.$nextTick(() => {
        if (this.$refs.dataForm) {
          this.$refs.dataForm.resetFields();
        }
      });
    },
  },
};
</script>

<style scoped>
.dict-management {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tree-node-actions {
  float: right;
  font-size: 12px;
}

.delete-btn {
  color: #f56c6c;
}
</style>
