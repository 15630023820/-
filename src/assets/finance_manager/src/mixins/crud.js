import request from '@/utils/request'
export default {
    data(){
        return {
            tableData: [],
            isLoading:false,
            queryOption:null
        }
    },
    beforeDestroy(){
        console.log(this.$options.name,'被销毁了');
    },
    async created(){
       console.log(this.$options.name,'被创建了',this);
       await this.checkOption();
       this.loadByPage();

    },
    methods:{
        async doSubmit(option){
            const res = await request({
                url:this.queryOption.submit.url,
                method:this.queryOption.submit.method,
                ...option
            });
            this.loadByPage();
        },
        selectionChange(row){
            console.log('被选中了:',row)
        },
        async checkOption(){
            // 调用的重写后的方法
            this.queryOption = await this.getRequestOption();
            if (!this.queryOption) throw new Error('混入CRUD时，必须重写getRequestOption方法，且返回值不为false等..')
            
        },
        async doDelete(addStr){
            const res = await request({
                url:this.queryOption.delete.url + addStr,
                method:this.queryOption.delete.method
            });
            this.loadByPage();
        },
        async doUpdate(option,addStr=''){
            const res = await request({
                url:this.queryOption.update.url + addStr,
                method:this.queryOption.update.method,
                ...option
            });
            this.loadByPage();
        },
        getRequestOption(){
            return false;
        },
        async loadByPage() {
            this.isLoading = true;
            var res = await request({
                url: this.queryOption.read.url,
                method: this.queryOption.read.method,
                params: this.pager
            });
            this.isLoading = false;
            this.tableData = Object.freeze(res?.data?.data?.list);
            // 调用pager的方法
            this.setTotal(res.data?.data.rows);
            // 获取并处理total
        },
    }
}