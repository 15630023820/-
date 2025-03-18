<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :key="i" v-for="(route,i) in breads">
        <span v-if="breads.length - 1 === i" v-text="route?.meta.title"></span>
        <!-- <router-link :to="route">{{ route?.meta.title }}</router-link> -->
        <!-- <router-link :to="{path:route.path}">{{ route?.meta.title }}</router-link> -->
        <router-link v-else :to="route.path">{{ route?.meta.title }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
 
<script>
export default {
  name: "GBreadCrumb",
  computed: {
    breads() {
      // 保证所有参与面包屑的元素有title,没有就去除了
      return this.$route.matched.filter(route=>route?.meta?.title)
    }
  }
};
</script>

<style>
</style>