<script>
import Vue from "vue";
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  name: "GColumn",
  render() {
    const { item: col } = this;
    let scopedSlots = {};
    let slot = this.$scopedSlots[col.prop];

    // 兼容没有过滤的空方法
    let filterDataByProp = row => row;
    // 存在需要过滤
    if (col.filter) {
      // 获取过滤器
      // 判断是否附加了属性, test/operation
      let filterName = col.filter,
        propName = col.prop;
      // 如果附加了_

      if (col.filter.includes("&")) {
        const params = col.filter.split("&");
        filterName = params[0];
        propName = params[1];
      }

      filterDataByProp = row => {
        const convertFilter = Vue.filter(filterName);
        if (convertFilter) {
          let res = {
            ...row
          };
          // row.name =
          res[propName] =
            convertFilter(res[propName], propName) || res[propName];
          return res;
        }
      };
    }

    // Gtable接收的插槽
    if (slot) {
      scopedSlots.default = function({ row }) {
        // 生成VNode，scoped里面的数据不干净，存在环形对象，JSON.stringify
        const newRow = filterDataByProp(row);
        return slot(newRow);
      };
    } else if (col.formatter) {   // 自定义HTML
      scopedSlots.default = function({ row }) {
        const newRow = filterDataByProp(row);
        return <div domPropsInnerHTML={col.formatter(newRow)}></div>;
      };
    } else if (col.filter) { // 最后处理文字的filter
      scopedSlots.default = function({ row }) {
         const newRow = filterDataByProp(row);
         return newRow[col.prop];
      };
    }
    return (
      <el-table-column
        scopedSlots={scopedSlots}
        prop={col.prop}
        label={col.label}
        width={col.width}
        align={col.align}
      >
        {col.children &&
          col.children.map(c => {
            return <GColumn item={c} scopedSlots={this.$scopedSlots} />;
          })}
      </el-table-column>
    );
  }
};
</script>

<style>
</style>