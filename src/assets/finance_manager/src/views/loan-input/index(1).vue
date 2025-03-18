<template>
  <!-- 单标签还是双标签: 需求中是否有个性化添加的DOM-->
  <!-- 双标签: 兼容不传递插槽，显示默认按钮 -->
  <div>
    <!-- <GFormCreator ref="fd"  :config="loanInputConfig" >
      <template #default="{innerValue}">
        <el-button @click="showData" type="primary">确定{{innerValue}}</el-button>
      </template>
    </GFormCreator>-->
    <GFormCreator :config="loanInputConfig" @submit="doSubmit" />
  </div>
</template>

<script>
import config from "./pageConfig";
import test from "./test";
import { createLoan } from "@/api/loan";
import { deepClone } from '@/utils/'
export default {
  methods: {
    async doSubmit(data) {
      console.log('@submit="doSubmit"获取到数据了...', data);
      // API接口请求
      let res = await createLoan(data);
      console.log(res, "res");
      if (res.code === 20000) {
        await this.$gconfirm("添加成功, 是否去首页?");
        this.$router.push("/dashboard");
      }
    },
    showData() {
      let res = this.$refs.fd.getData();

      res.gender = "123";
      console.log("this.$refs.fd.getData()获取到数据了...", res);
    }
  },

  created() {
    // console.log("创建", this.loanInputConfig);
    // let i = 1;
    // loanInputConfig.cards.forEach(card => {
    //   card.items.forEach(row => {
    //     row.forEach(item => {
    //       item.value = "_" + i++;
    //     });
    //   });
    // });
  },

  data() {
    // 模块对象下的属性会共享，不会每次是新的对象
    // console.log('组件创建',loanInputConfig.n++)
    // fn也将是相同的函数
    // let fn = loanInputConfig.rules.mobile_phone[1]._validator;
    // 给验证器绑定组件的this                         
    // 页面再次切换时，无法对已bind的函数进行二次绑定
    // let str = fn.toString()
    // let paramsReg = /\(|\)/;
    // const pattern = /function\s*\([^)]*\)\s*{([\s\S]*)}/;
    // const match = str.match(pattern); // [1]是函数体
    // let paramsArr = str.split(paramsReg); // 参数1,2,3
    // let params = paramsArr[1].split(','); // [1,2,3]
    // let fnArr = [...params,match[1]];
    // console.log(str,'函数体');
    // let fn2 = new Function(...fnArr);
    // loanInputConfig.rules.mobile_phone[1].validator = fn2.bind(this);




  //   loanInputConfig.rules.mobile_phone[1].validator =  (rule, value, callback)=>{
  //     if (!value) {
  //         return callback(new Error('电话不能为空'));
  //     }
  //     console.log(this,'当前的this');
  //     const phoneReg = /^1[3589]\d{9}$/;
  //     if (phoneReg.test(value)) {
  //         return callback();
  //     } else {
  //         return callback(new Error('手机号不合法..'))
  //     }
  // };

    // 对需要修改的属性进行深拷贝, 针对【持久化】模块引入的对象，又需要改变值，一般需要使用深拷贝
    const loanInputConfig = deepClone(config,true);
    const arr = loanInputConfig.rules.mobile_phone;
    arr[1].validator = arr[1].validator.bind(this);
    // fn2(1,2,3);
    // 简易的创建函数

    return {
      loanInputConfig
    };
  }
};
</script>

<style>
</style>
