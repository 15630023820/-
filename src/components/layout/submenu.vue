<template> 
    <div>
      <el-submenu v-if="item.children && item.children.length > 0" :index="item.path">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.meta?.title}}</span>
        </template> 
       
            <submenu v-for="(c,i) in item.children" :item="c" :index="i"></submenu> 
      </el-submenu>  
    
      <el-menu-item-group v-else :index="item.path">
        <el-menu-item :index="item.path">{{item.meta?.title}}</el-menu-item>
      </el-menu-item-group>
    </div>
 </template>
 

<script> 
  export default {
    name: 'submenu',
    props: {
      item: {
        type: Object,
        default: () => {}
      },
      index: {
        type: Number,
        default: 0
      }
    },
    
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, this.menuList);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>