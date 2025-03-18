export default {
  
    data() {
        return {    
            pager: {
                pageNo: 1,
                pageSize: 10,
                name: "" // 模糊查询
            },
        }
    },
    methods: {
        setQuery(q) {
            this.pager.name = q;
            this.loadByPage();
        },
        // 分页组件事件
        doHandleSizeChange(res) {
            this.pager.pageSize = res;
            this.pager.pageNo = 1;
            this.loadByPage();
        },
        doHandleCurrentChange(res) {
            this.pager.pageNo = res;
            this.loadByPage();
        },
        setTotal(total) {
            console.log('ces',this)
            if (!this.configPager)throw new Error('data必须声明configPager并传递给GTable')
            // this.configPager.total = total;
            this.$set(this.configPager,'total',total)
        }
    }
}