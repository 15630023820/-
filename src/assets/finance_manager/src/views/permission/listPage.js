export const columns = Object.freeze([
    { label:'用户名' ,prop:'account'},
    { label:'密码' ,prop:'password'},
    { label:'创建时间' ,prop:'reg_time',filter:'convertDate'},
    { label:'创建者' ,prop:'creator'},
    { label:'权限分配' ,prop:'role_name',filter:'common&role_name'},
].map(ele=>{
    ele.align = 'center';
    return ele;
}))