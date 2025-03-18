<template>
  <div id="app">
    <!-- <el-button type="primary" @click="testAjax">测试按钮</el-button> -->
    <!-- <el-button type="primary" @click="testAjax2">测试按钮2</el-button> -->
    <!-- <button @click="test404">测试404</button> -->
    <!-- <button @click="getRoutes">获取动态菜单</button> -->
    <router-view/>
  </div>
</template>

<script>
import req from '@/utils/request';
export default {
  methods:{
    getRoutes(){
      req.get('/user/menu')
      .then(console.log)
      .catch(console.log)
    },
    test404(){
      req.get('/user/log123123432')
      .catch(console.warn)
    },
    testAjax(){
      this.$ajax.get('http://www.baidu.com')
      .then(console.log)
      .catch(console.log)
    },
     testAjax2(){
      req.post('/user/login',{
        account:'admin',
        password:'approve123456.'
      })
    }
  }
}
</script>


<style lang="scss">
</style>
