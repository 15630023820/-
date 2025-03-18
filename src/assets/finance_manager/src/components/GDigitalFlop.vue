<template>
  <el-row :gutter="10">
    <el-col v-for="(item,i) in data" v-bind="size" :index="item.i">
      <div class="grid-box" :style="{ 'background-color':item.color}">
        <p v-text="item.title"></p>
        <countTo :duration="3000" :endVal="item.num" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import countTo from "vue-count-to";
export default {
  computed: {
    size() {
      return {
        xs: 24,
        sm: 24,
        md: 12,
        lg: Math.round(24 / this.data.length),
        xl: Math.round(24 / this.data.length)
      };
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  name: "GDigitalFlop",
  components: { countTo }
};
</script>

<style lang="scss" scoped>
.grid-box {
  background: yellowgreen;
  height: 150px;
  color: #fff;
  font-weight: bold;
  // 触发BFC块级元素的重新计算，外边距合并的问题
  overflow: hidden;
  > p {
    margin-top: 30px;
    color: black;
    margin-bottom: 20px;
  }
}
</style>