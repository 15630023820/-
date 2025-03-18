<template>
  <!-- 如果item.children: 输出目录，否则输出文字 -->

  <el-submenu :index="item.path" v-if="!item.nonRenderChild
 && item.children">
    <template #title>
      <span>{{item?.meta?.title}}</span>
    </template>
    <template #default>
        <GMenuItem :key="index" v-for="(it,index) in item.children" :item="it"/>
    </template>
    <!-- 目录内的迭代 -->
  </el-submenu>
  <el-menu-item :index="item.path"  v-else>
    <template #title>
      <span>{{item?.meta?.title}}</span>
    </template>
  </el-menu-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  name: "GMenuItem"
};
</script>

<style>
</style>