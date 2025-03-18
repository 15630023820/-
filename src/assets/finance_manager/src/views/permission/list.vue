<template>
    <div>
        <GQuery @queryChange="setQuery" />
        <GTable 
             @handleCurrentChange="changeCurrent"
            :tableData="showTable"
            :columns="columns"
            :pager="configPager"
            :config="{ usePager:true}"
        />

    </div>
</template>

<script>
import { columns } from './listPage'
import pager from '@/mixins/pager';
import crud from '@/mixins/crud';
export default {
    computed:{
        showTable(){
            return this.tableData.slice(this.start,this.end);
        }
    },
    mixins:[pager,crud],
    data(){
        return {
            start:0,
            end:20,
            columns,
            configPager:{}
        }
    },
    methods:{
        changeCurrent(current){
            this.start = (current - 1) * 20;
            this.end = this.start + 20;
        },
        getRequestOption(){
            return {
                read:{
                    url:'/user/list?type=new',
                    method:'get'
                }
            }
        }
    }
}
</script>

<style>

</style>