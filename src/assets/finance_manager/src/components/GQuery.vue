<template>
  <el-row :gutter="20">
    <el-col :span="hasBtn?18:24">
      <el-input v-model="q" placeholder @change="onchange"></el-input>
    </el-col>
    <el-col v-if="hasBtn" :span="6">
      <slot  name="btn" :query="q"></slot>
    </el-col>
  </el-row>
</template>

<script>
// 1. 输入结束自动查询
// 2. 输入完成之后 巧回车 完成查询
import { debounce } from "@/utils";
export default {
  name: "GQuery",
  data() {
    return {
      q: ""
    };
  },
  methods: {
    // 包裹防抖
    emitQuery: debounce(function() {
      if (this.queried) {
        this.$emit("queryChange", this.q);
      }
    }, 2000),
    onchange() {
      this.$emit("queryChange", this.q);
      this.queried = false;

    }
  },
  watch: {
    q() {
        // 防抖
        this.queried = true;
        this.$emit("queryChange", this.q);
    }
  },
  computed: {
    hasBtn() {
      return this.$scopedSlots.btn;
    }
  }
};
</script>

<style scoped>
.el-row {
  margin:10px;
}
:deep(.el-col:nth-child(2) > *) {
  width: 70%;
}

</style>