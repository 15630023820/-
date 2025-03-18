<script>
// 1. 引入ElTable组件
import { Table } from "element-ui";
// 2. 继承他

export default {
  extends: Table,
  name: "TableWrapper",
  methods: {
    // 应该保持原方法的内容，此处就是方法的覆盖
    doLayout() {
      if (this.shouldUpdateHeight) {
        this.layout.updateElsHeight();
      }
      this.layout.updateColumnsWidth();
      // 给el-table组件加上属性
      if (this.$scopedSlots.append)
        this.$slots.append = this.$scopedSlots.append();
    }
  }
};
</script>

<style>
</style>