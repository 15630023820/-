<template>
  <div>
    <GQuery @queryChange="setQuery" />
    <GTable
      @handleSizeChange="doHandleSizeChange"
      @handleCurrentChange="doHandleCurrentChange"
     :config="{index:false,usePager:true}" :tableData="tableData" :columns="columns" :pager="configPager">
      <template #status="row">
        <el-tag :type="row.status | common('statusColor')">{{ row.status | common('status')}}</el-tag>
      </template>
      <template #operation="row">
        <GEbutton
          :disabled="row.status !== 5"
          :confirm="`是否确定为【${row.name}】生成合同?`"
          @submit="genContract(row.id)"
        >合同生成</GEbutton>
        <GEbutton
          :disabled="row.status !== 7"
          type="success"
          :confirm="`是否确定下载【${row.name}】的合同?`"
          @submit="donwLoadContract(row.id)"
        >下载生成</GEbutton>
      </template>
    </GTable>
  </div>
</template>

<script>
import crud from "@/mixins/crud";
import pager from "@/mixins/pager";
import { columns } from "./pageConfig.js";
import { getContractUrl,downloadByUrl } from '@/api/loan';
import { downloadByTag } from '@/utils'
export default {
  mixins: [crud, pager],
  data() {
    return {
      columns,
      configPager: {}
    };
  },
  methods: {
    async donwLoadContract(id) {
      // 1. 获取下载文件的url
      let url = await getContractUrl(id);
      // 2. a标签下载内容
      let res = await downloadByUrl(url);

      downloadByTag(res.data,`合同-${id}.docx`)
      // El
      this.$message('下载成功..')
    },
    genContract(id) {
      this.doUpdate({
        data: { id }
      });
    },
    getRequestOption() {
      return {
        read: {
          url: "/contract/list",
          method: "get"
        },
        update: {
          url: "/contract/createFile",
          method: "post"
        }
      };
    }
  }
};
</script>

<style>
</style>