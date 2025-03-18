<template>
  <GFormCreator ref="form" :config="createUserConf">
    <div>
      <el-button @click="createUser" type="primary">创建人员</el-button>
      <el-button>重置</el-button>
    </div>
  </GFormCreator>
</template>

<script>
import createUserConf from "./page.js";
import { createUser } from "@/api/user";
export default {
  methods: {
    async createUser() {
    console.log('点击了')
      let user = this.$refs.form.getData();
      console.log();
      let res = await createUser(user);

      console.log(res, "res");

      let ok = await this.$gconfirm('创建成功, 是否去首页?')
      console.log('ok',ok);

        
    }
  },
  data() {
    return {
      createUserConf
    };
  }
};
</script>

<style>
</style>