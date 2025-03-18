<template>
   <el-dropdown :hide-on-click="false"  @command="$emit('command',$event)">
    <span class="el-dropdown-link">
        {{user.account}}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
       
        <el-dropdown-item v-for="item in menudata" v-bind="item.attrs" >{{item.name}}</el-dropdown-item>
         
    </el-dropdown-menu>
    </el-dropdown>
</template>
<script>

import { mapState, mapMutations } from 'vuex';
export default {
   name: 'Dropdown',
   components: {
     
   },
   mixins: [],
   props: {
     menudata: {
        type:Array,
        required:true
     },
   },
   data() {
     return {
       
     }
   },
   computed: {
     ...mapState('user', ['user']),
   },
   watch: {
     
   },
   mounted() {
     
   },
   methods: {
     
   }
};
</script>
<style lang='' scoped>
</style>