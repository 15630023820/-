<template>
  <div class="login-box">
    <div class="center login-input-box">
      <h1 class="login-title t-center">信贷管理系统</h1>
      <!-- 表单 -->

      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules" >
          <el-form-item prop="account">
            <el-input prefix-icon="el-icon-user-solid" type="text" clearable v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-s-order"
              show-password
              type="password"
              v-model="form.password"
            ></el-input>
          </el-form-item>

          <el-button type="primary" @click="doLogin">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '@/api/user'
export default {
  methods: {
    doLogin() {
      console.log("__登录..");
      this.$refs.form.validate(async valid=>{
        if (valid) {
            console.log(valid,'成功');
            await login(this.form,{ full:true} );

            // 保存token对应的用户名密码，方便刷新token使用
            // 正常开发，带着原token访问refresh_token接口
            this.$store.commit('user/setAccount',this.form);

            // await login(this.form);
            this.$router.push({
              path:this.$route.query.redirect || '/'
            });

        } else {
            console.log('验证失败./...');
        }
      })


    }
  },
  data() {
    return {
      form: {
        account: "admin",
        password: "approve123456."
      },
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/bg2.jpg");
  /* 变量:COVER CONTAIN */
  background-size: 100% 100%;
  // 同级 &: .login-box.login-input-box
  // 子集 > .login-box > .login-input-box[data-v-26084dc2] {
  // 后代 .a { .b{}  }
  > .login-input-box {
    width: 700px;
    height: 360px;
    background-color: #fff;
    border-radius: 4px;
  }
  .login-form {
    padding: 20px;
  }
  .el-input {
    margin-bottom: 20px;
  }
  //   .el-input:nth-child(2) {
  //     margin-bottom: 60px;
  //   }
  //   最新最稳定的写法
  :deep(.el-input__inner) {
    background-color: #e5e5e5;
  }
  .el-button {
    width: 100%;
    margin-top: 20px;
  }
}
</style>