<template>
   <el-container style="height: 100vh;">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <menu-view class="menuBox"></menu-view> 
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <Breadcrumb></Breadcrumb>
     
      <Dropdown :menudata="menudata" @command="handleCommand"></Dropdown>
  
    </el-header> 
    
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
  </template>
  
  <script> 
  import Breadcrumb from '@/components/layout/Breadcrumb.vue';
import Dropdown from '@/components/layout/Dropdown.vue';
import MenuView from '@/components/layout/menu'
  export default {
    name:'Layout',
    components: {
      MenuView,
      Breadcrumb,
      Dropdown
    },
    data(){
      return {
        menudata:[
          {
            name:'个人中心',
            attrs:{
              icon:'el-icon-user',
              command:'personal',
              disabled:false,
              divided:false
            }
          },
          {
            name:'退出登录',
            attrs:{
              icon:'el-icon-switch-button',
              command:'logout',
              disabled:false,
              divided:true
            }
            
          }
        ]
      }
    },
    methods:{
      handleCommand(e){
        console.log(e)
        this[e]()
      },
      logout(){
        window.sessionStorage.removeItem('token')
       window.location.reload()
      } 
     }
  }
  </script>
  
  <style scoped lang="scss">
  
  .el-header, .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    > .el-menu {
          height: 100vh;
      border-right: none;
    }
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
 .el-container {
  height: 100vh;
  .el-header {
    display: flex;
    justify-content: space-between;
    .el-breadcrumb {
      line-height: 60px;
    }
  }
 }
</style>