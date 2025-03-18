<template>
    
</template>

<script>
import * as Echarts from "echarts";

export default {
  watch:{
    option:{
        deep:true,
        handler(){
            this.renderChart();
        }
    }
  },
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  name: "GChart",
  methods: {
    renderChart() {
      this.chartInstance.clear(); // 提前清除缓存
      this.chartInstance.setOption(this.option);
    },
    resizeFn() {
      this.chartInstance.resize();
    }
  },
  mounted() {
    if (!this.option) return;

    this.node = this.$el.parentNode;
    if (this.node.clientWidth <= 0 || this.node.clientHeight <= 0) {
        throw new Error('GChart组件:父容器必须指定宽高不能为0...')
    }

    this.$nextTick(() => {
      // 防止一次容器插入的变化，v-if="false=>true"
      // 1. 初始化
      this.chartInstance = Echarts.init(this.node);
      // 渲染函数中
      this.renderChart();
      // 绑定resize
      window.addEventListener("resize", this.resizeFn, {
        // 肯定不会调用preventDefault(), 监听器默认等待调用取消默认行为
        passive: true // 性能优化
      });
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeFn);
    this.chartInstance.dispose();
  }
};
</script>

<style>
</style>