<template>

<el-container>
  <el-aside >
    <el-menu router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="getDefaultActive">
      <GMenuItem :key="index" v-for="(it,index) in getMenu" :item="it"/>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>
        <GBreadCrumb/>
        <GDropDown info="Green" :items="dropList" @command="doCommand"/>
    </el-header>
    <el-main><router-view/></el-main>
    <el-footer>版权所有 金渡教育 2023</el-footer>
  </el-container>
</el-container>
</template>

<script>
import {mapState} from 'vuex';
export default {
 name:'Layout',
 methods:{
  doCommand(c){
    console.log('command:',c)
  }
 },
 data(){
  return {
    dropList:[
      { title:'退出', attrs:{ command:'logout'} },  // v-bind="item.attrs"
      { title:'升级VIP',attrs:{ disabled:true, divided:true }},
    ]
  }
 },
 computed:{
  ...mapState({
    getMenu(state){
      return state.user.menu
    },
    getDefaultActive(state){
      return state.user.activeUrl;
    }
  })
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