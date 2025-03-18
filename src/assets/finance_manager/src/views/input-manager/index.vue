<template>
  <div>
    <GQuery @queryChange="setQuery" />
    <GQuery>
      <template #btn="{query}">
        <el-button type="primary" @click="e=>setQuery(query)">搜索{{query}}</el-button>
      </template>
    </GQuery>

    <GTable
      @handleSizeChange="doHandleSizeChange"
      @handleCurrentChange="doHandleCurrentChange"
      @selection-change="selectionChange"
      :tableData="tableData"
      :columns="columns"
      :pager="configPager"
      :config="tableConfig"
    >
      <template #status="row">
        <el-tag :type="row.status|common('statusColor')">{{ row.status|common('status') }}</el-tag>
      </template>
      <template #operation="row">
        <el-button type="primary" @click="editing(row)">编辑</el-button>
        <el-button type="danger" @click="deleteLoan(row.id,row.name)">删除</el-button>
        <GEbutton type="success" :confirm="`是否【${row.name}】确认提交审核?`" @submit="doSubmitData(row.id,$event)">提交审核</GEbutton>
      </template>
      <template #append>
        <button>我是行尾</button>
      </template>
    </GTable>

    <!-- 底部弹窗 -->
    <el-dialog
      title="申请管理-编辑"
      :visible.sync="dialogVisible"
      @open="childExist = true"
      @closed="childExist = false"
      width="50%"
    >
      <GFormCreator ref="editForm" v-if="childExist" :config="editFormConfig">
        <div>
          <GEbutton confirm="是否确认保存" @submit="updateForm">保存</GEbutton>
          <el-button @click="cancelDialog">取消</el-button>
        </div>
      </GFormCreator>
    </el-dialog>
  </div>
</template>

<script>
import { columns } from "./pageConfig";
import pager from "@/mixins/pager";
import crud from "@/mixins/crud";
import { addDefaultValueByData } from "@/utils/form";
import { sexOptions } from "@/conf/uiFields";
export default {
  mixins: [crud, pager],
  methods: {
    // 提交审核
    doSubmitData(id,e) {
      console.log("接收到id",id,e);
      this.doSubmit({data:{id}});
    },
    // 点击编辑
    editing(row) {
      this.dialogVisible = true;
      // 不需要响应式，更新的接口中提交要用
      this.currentRow = row;
      // 生成表单展示的内容，一般是发请求
      addDefaultValueByData(row, this.editFormConfig); // 给config加value
    },
    updateForm() {
      // 获取表单数据
      const reqData = this.$refs.editForm.getData();
      this.doUpdate({
        data: {
          ...this.currentRow, // {  name:1,xx:2}
          ...reqData // 覆盖更新内容  { name:'a' }
        }
      });
      this.cancelDialog();
    },
    cancelDialog() {
      this.dialogVisible = false;
    },
    getRequestOption() {
      // 同步
      return {
        read: { url: "/loan/list", method: "get" },
        delete: {
          url: "/loan/delete/",
          method: "delete"
        },
        update: {
          url: "/loan/update",
          method: "put"
        },
        submit: {
          url: "/loan/submitToApprove",
          method: "post"
        }
      };

      // 覆盖混入中的方法
      // 允许异步获取 需要返回Promise
      return new Promise(res => {
        // 模拟异步获取请求参数
        setTimeout(() => {
          res({
            read: { url: "/loan/list", method: "get" },
            delete: {
              url: "/loan/delete/",
              method: "delete"
            }
          });
        }, 1000);
      });
    },
    async deleteLoan(id, name) {
      let needNext = await this.$gconfirm(`是否确定删除【${name}】?`);
      if (!needNext) return;
      this.doDelete(id); // 拼接url
    }
  },
  data() {
    return {
      configPager:{},
      editFormConfig: {
        fields: [
          [{ label: "姓名", value: "111", type: "text", key: "name" }],
          [
            {
              label: "性别",
              value: "0",
              type: "select",
              key: "sex",
              options: sexOptions
            }
          ]
        ],
        rules: {
          name: [{ required: true, message: "请输入姓名", triggle: "blur" }],
          sex: [{ required: true, message: "请选择性别", triggle: "blur" }]
        }
      },
      childExist: false,
      dialogVisible: false,
      tableConfig: {
        usePager: true,
        multipleSelection: true
      },
      columns
    };
  }
};
</script>

<style scoped>
</style>