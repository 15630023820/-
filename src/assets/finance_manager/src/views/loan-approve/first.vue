<template>
  <div>
    <GQuery @queryChange="setQuery" />
    <GTable
      @handleSizeChange="doHandleSizeChange"
      @handleCurrentChange="doHandleCurrentChange"
      @selection-change="selectionChange"
      :tableData="tableData"
      :columns="columns"
      :pager="configPager"
      :config="{index:false}"
    >
      <template #operation="row">
        <el-button type="primary" @click="showInfo(row)">查看</el-button>
        <GEbutton :confirm="`是否拒绝${row.name}的申请?`" @submit="reject(row.id)" type="danger">拒绝</GEbutton>
        <GEbutton @submit="pass(row.id)" type="success" :confirm="`是否【${row.name}】确认提交审核?`">提交审核</GEbutton>
      </template>
    </GTable>
    <el-dialog
      title="初审审批-查看详情"
      :visible.sync="isShow"
      @open="isExist = true"
      @closed="isExist = false"
    >
      <GFormCreator v-if="isExist" :config="editorForm">
        <el-button @click="isShow=false">取消</el-button>
      </GFormCreator>
    </el-dialog>
  </div>
</template>

<script>
import { columns, genEditConfig } from "./pageConfig";
import crud from "@/mixins/crud";
import pager from "@/mixins/pager";
import { rejectLoan,passLoan } from '@/api/loan';


export default {
  methods: {
    async pass(id){
        await passLoan(id);
        this.loadByPage();
    },
    async reject(id){
        await rejectLoan(id);
        this.loadByPage();// pager方法
    },
    showInfo(row) {
      this.editorForm = genEditConfig(row);
      this.isShow = true;
    },
    getRequestOption() {
      // 同步
      return {
        read: { url: "/approve/first/list", method: "get" }
      };
    }
  },
  mixins: [crud, pager],
  data() {
    return {
      editorForm: {},
      isExist: false,
      isShow: false,
      columns,
      // 分页
      configPager: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 400 // 后端给
      }
    };
  }
};
</script>

<style>
</style>