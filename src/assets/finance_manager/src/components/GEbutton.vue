<template>
    <el-button :type="$attrs.type || 'primary'" v-bind="$attrs" v-on="$listeners" @click="doClick">
        <slot></slot>
    </el-button>
</template>

<script>
export default {
    props:{
        confirm:{
            type:String,
            default:()=>''
        }
    },
    name:'GEbutton',
    methods:{
        async doClick(){
            let res = true;
            if (this.confirm)
            res = await this.$gconfirm(this.confirm);
            if (!res)return;
            this.$emit('submit',true);
        }
    }
    
}
</script>

<style>

</style>