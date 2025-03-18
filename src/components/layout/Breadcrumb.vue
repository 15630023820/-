<template>
    <el-breadcrumb separator-class="el-icon-arrow-right"> 
        <template v-for="(item, index) in menuList" v-key="index">
            <el-breadcrumb-item v-if="index == menuList.length - 1">{{item.meta.title}}</el-breadcrumb-item>
            <el-breadcrumb-item v-else :to="{ path: item.path }">{{item.meta.title}}</el-breadcrumb-item>
        </template>
       
    </el-breadcrumb>
</template>
<script>
export default {
    name: 'Breadcrumb',
    data() {
        return {
            menuList: []
        }
    },
    created() {
        this.menuList = this.$route.matched.filter(item => item.meta && item.meta.title)
        
    }
}

</script>