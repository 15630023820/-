<template>
  <el-dropdown @command="$emit('command',$event)">  
    <span class="el-dropdown-link">
      {{ info }}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :key="i" v-bind="it.attrs" v-for="(it,i) in items">{{ it.title }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
props:{
    items:{
        type:Array,
        required:true
    },
    info:String
},
  name: "GDropDown"
};
</script>

<style>
</style>