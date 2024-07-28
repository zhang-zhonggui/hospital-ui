<template>
  <div>
    <el-form
        id="journalismFrom"
        :model="addInfo"
        :rules="rules"
        ref="addInfo"
        label-width="100px"
        class="demo-addInfo"
        style="width: 1500px"
    >
      <el-form-item label="新闻标题" prop="title">
        <el-input
            id="titlestyle"
            v-model="addInfo.title"
            placeholder="请输入标题"
            name="title"
        ></el-input>
      </el-form-item>
      <el-form-item label="日期时间" prop="date">
        <el-date-picker
            id="datastyle"
            v-model="addInfo.date"
            type="datetime"
            placeholder="选择日期时间"
            align="left"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            name="date"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="新闻类型" prop="tid">
        <select
            id="journalismtype"
            v-model="addInfo.tid"
            placeholder="请选择新闻类型"
            name="tid"
        >
          <option
              v-for="(t, i) in addType"
              :key="i"
              :label="t.tname"
              :value="t.id"
          ></option>
        </select>
      </el-form-item>
      <el-form-item label="作者" prop="writer">
        <el-input
            id="writerstyle"
            v-model="addInfo.writer"
            placeholder="请输作者名称"
            name="writer"
        ></el-input>
      </el-form-item>

      <el-form-item label="新闻内容" prop="body">
        <div id="div1"></div>
        <textarea
            id="text1"
            style="width: 100%; height: 200px; display: none"
            name="body"
        ></textarea>
      </el-form-item>

      <el-form-item hidden="hidden">
        <el-input v-model="addInfo.state"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
            type="primary"
            @click="addJournalism"
            :disabled="addState === 1"
        >提交</el-button
        >
        <el-button @click="anew">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import E from "wangeditor";
import { addJournalismApi, searchTypeApi } from "@/api/staff/addJournalism";

export default {
  name: "addJournalism",
  data() {
    return {
      addInfo: {
        title: "",
        date: "",
        tid: "",
        writer: "",
        body: "",
        state: "",
      },
      addType: [],
      addState: 0,
      rules: {
        title: [{required: true, message: "请输入标题", trigger: "blur"}],
        date: [{required: true, message: "请选择日期时间", trigger: "blur"}],
        tid: [{required: true, message: "请选择类型", trigger: "change"}],
        writer: [
          {required: true, message: "请输入作者名称", trigger: "blur"},
          {
            pattern: /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/,
            message: "输入正规名字",
          },
        ],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      editor: null,
    };
  },
  mounted() {
    this.fetchJournalismTypes();
    this.initEditor();
  },
  methods: {
    async fetchJournalismTypes() {
      try {
        const response = await searchTypeApi();
        this.addType = response.data;
        console.log(this.addType)
      } catch (error) {
        console.error("获取新闻类型失败:", error);
      }
    },
    initEditor() {
      const editor = new E("#div1");
      this.editor = editor; // 保存 editor 实例

      editor.config.placeholder = "新闻内容";
      editor.config.height = 350;
      editor.config.uploadImgServer = "/hospital/upload/file";
      editor.config.uploadImgMaxSize = 2 * 1024 * 1024; // 2M
      editor.config.uploadImgAccept = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "webp",
      ];
      editor.config.uploadImgMaxLength = 5; // 一次最多上传 5 个图片
      editor.config.uploadImgParams = {dir: "bbs", x: 100};
      editor.config.uploadFileName = "file";
      editor.config.uploadImgHooks = {
        customInsert: (insertImgFn, result) => {
          console.log("地址是" + result);
          insertImgFn(result.url);
        },
      };

      editor.config.onchange = (html) => {
        this.addInfo.body = html;
      };
      editor.create();
    },
    async addJournalism() {
      this.$refs["addInfo"].validate(async (valid) => {
        if (valid) {
          const formData = new FormData(
              document.getElementById("journalismFrom")
          );
          try {
            const response = await addJournalismApi(formData);
            if (response.data.code === 200) {
              this.$message({
                message: "提交成功",
                type: "success",
              });
              this.addState = 1;
            }
          } catch (error) {
            console.error("提交新闻失败:", error);
          }
        }
      });
    },
    anew() {
      this.$refs["addInfo"].resetFields();
      this.editor.clear(); // 清除富文本编辑器内容
      this.addState = 0;
    },
  },
};
</script>

<style scoped>
#journalismtype {
  width: 100%;
  height: 40px;
  background-color: white;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}

#datastyle {
  width: 200px;
}

#titlestyle {
  width: 400px;
}

#journalismtype {
  width: 200px;
}

#writerstyle {
  width: 200px;
}

.w-e-menu {
  z-index: 2 !important;
}

.w-e-text-container {
  z-index: 1 !important;
}
</style>
