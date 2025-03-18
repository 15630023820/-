 <template>
    <el-menu
      :default-active="activeUrl"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b">
     
      <template
       v-for="(item,index) in menuList" v-key="item.path"
      > 
        <submenu v-if="item.children && item.children.length > 0" :item="item" :index="index"></submenu>
        <el-menu-item v-else :index="item.path">
        <i class="el-icon-menu"></i>
        <span slot="title"> {{item.meta?.title}}</span>
      </el-menu-item>
    </template>
     
      
       
    </el-menu>
 </template>
 

<script>
import { mapState } from 'vuex'
import submenu from './submenu.vue';
  export default {
    components: {
      submenu
    },
    computed: {
      ...mapState({
        menuList: state => state.user.menu.menuList,
        activeUrl:state => state.user.activeUrl
      })
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped >
:deep(.el-menu-item) {
  text-align: left;
}
:deep(.el-submenu) {
  text-align: left;
}
</style>