export const columns = [
    { label:'姓名', prop:'name'},
    { label:'身份证',prop:'identity_card'},
    {
        label:'合同状态',
        prop:'status',
        width:100,
        // filter:'common&status', 值要做两次转换
    },
    {
        label:'操作',
        prop:'operation',
        width:300,
        align:'center'
    }
];