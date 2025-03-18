
<script>
import TableWrapper from './TableWrapper';
export default {
  components:{'el-table':TableWrapper},
  props: {
    tableData: {
      type: Array,
      required:true
    },
    columns: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => ({})
    },
    pager: {
      type: Object,
      required:true
    }
  },
  data() {
    let inner = {
      multipleSelection: false,
      index: true,
      tableConf: {
        // attrs 原生属性
        stripe: true, // 斑马纹
        border: true // 边框
        // height: 340
      }
    };
    let innerPager = {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 400 // 后端给
      };
    Object.assign(inner, this.config);
    Object.assign(innerPager, this.pager);
    return {
      innerConfig: inner,
      finalPager:innerPager
    };
  },
  name: "GTable",
  methods: {
    renderSpicalRows() {
      let rows = [];
      const { index, multipleSelection } = this.innerConfig;
      if (multipleSelection) {
        rows.push(
          <el-table-column type="selection" width="55"></el-table-column>
        );
      }
      if (index) {
        rows.push(<el-table-column type="index" width="50"></el-table-column>);
      }
      return rows;
    },
    renderRows(columns) {
      // 用GTable帮el-table-column渲染子元素
      return columns.map(col => {
        return (
          <el-table-column prop={col.prop} label={col.label} width={col.width}>
            {/*插槽default*/}
            {this.$scopedSlots[col.prop] &&
              this.$scopedSlots.address("我是地址")}
            {/*自定义html*/}
            {col.formatter && (
              <div domPropsInnerHTML={col.formatter("我是自定义HTML")}></div>
            )}
            {/*递归方法调用*/}
            {col.children && this.renderRows(col.children)}
          </el-table-column>
        );
      });
    },
    renderRowsWithSlot(columns) {
      // 用GTable帮el-table-column渲染子元素
      return columns.map(col => {
        // 1. 递归输出组件 2.做个性化属性输出 3.让el-table-column来渲染内容
        return <GColumn item={col} scopedSlots={this.$scopedSlots}/>;
      });
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    currentPage4() {},
    renderPager(pager,outterPager) {
      return (
        <el-pagination
          onSize-change={ e=>this.$emit('handleSizeChange',e)}
          onCurrent-change={ e=>this.$emit('handleCurrentChange',e)}
          currentPage={pager.currentPage}
          pageSizes={pager.pageSizes}
          pageSize={pager.pageSize}
          layout={pager.layout}
          total={outterPager.total}
        ></el-pagination>
      );
    }
  },
  render() {
    const { usePager, tableConf } = this.innerConfig;
    const { pager, finalPager, columns,$parent:{isLoading} } = this;
    // console.log(this.$slots); // 了解，后续没有了
    // console.log(this.$scopedSlots);
    // const scopedSlots = {
    //   append(scoped){
    //     console.log(scoped,'scoped')
    //     return <h1>表格末尾</h1>
    //   }
    // }

  // 此处省略v-
    const directives = [
       { name:'drag',value:".el-table__body-wrapper"  } ,  
       { name:'loading',value:isLoading  }
    ];

//{ ...{directives} }
// directives={ directives }

    // JSX中批量传入事件
    
    console.log('事件:',this); // selection-change

    const listeners = {
      on:{
        ...this.$listeners
      }
    }
    

    return (
      <div>
        <el-table { ...{directives} } {...listeners}    scopedSlots={this.$scopedSlots}  attrs={tableConf} data={this.tableData} style="width: 100%">
          {this.renderSpicalRows()}
          {this.renderRowsWithSlot(columns)}
        </el-table>
        {usePager && this.renderPager(finalPager,pager)}
      </div>
    );
  }
};
</script>

<style>
</style>