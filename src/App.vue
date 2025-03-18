<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>
<script>
import req from '@/utils/request'
import router from './router';
  export default{
   methods: {
    textAjax2(){
      // req.post('/user/login',{
      //   account:'admin',
      //   password:'approve123456.'
      // })
      this.$ajax.get('https://www.baidu.com')
    }
   },
  }

</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</styl>
