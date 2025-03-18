<template>
    <div class="login-box">
        <div class="center login-input-box">
            <h1 class="login-title t-center">信贷管理系统</h1>
            <div class="login-form-box">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px"
                    class="demo-ruleForm"  > 
                    <el-form-item prop="account">
                        <el-input prefix-icon="el-icon-user-solid" type="text" clearable v-model="ruleForm.account" ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input prefix-icon="el-icon-s-order" show-password type="password" clearable v-model="ruleForm.password" autocomplete="off"></el-input>
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
    name: '',
    components: {

    },
    mixins: [],
    props: {

    },
    data() {
        return {
            ruleForm:{
                account:'',
                password:''
            },
            rules:{ 
                account:[
                    {required:true,message:'请输入用户名',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'}
                ],
            },
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        
    },
    methods: {
        doLogin(){
          
            console.log('登录')
            this.$refs.ruleForm.validate(valid=>{
                if(valid){ 
                    console.log('成功')
                    login(this.ruleForm).then(res=>{ 
                        this.$store.commit('user/setUser',this.ruleForm) 
                        this.$router.push({
                        path:this.$route.query.redirect || '/'
                    }).catch(err=>{ 
                        console.log(err)
                     })
                    })
                   
                  
                    
                }else{
                    console.log('不成功')
                }
            })
        }
    }
};
</script>
<style lang='scss' scoped>
.login-box {
    width: 100vw;
    height: 100vh;
    background: url('../assets/bg2.jpg');
    background-size: 100% 100%;

    .login-input-box {
        width: 700px;
        height: 360px;
        background-color: #fff;
        border-radius: 10px;
        .login-form-box{
            padding: 20px;
            .el-input{
                margin-bottom: 20px;
            
            }
            :deep(.el-input__inner){
                background-color: #e5e5e5;
            } 
            .el-button{
                width: 100%;
                margin-top: 30px;
            }
        }
    }
}
</style>