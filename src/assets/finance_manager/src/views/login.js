export default {
    labelDisable:true,
    fields: [ 
        [{ value:'admin',label: '', type: 'text', colspan: 24, key: 'account', attrs: { 'prefix-icon': 'el-icon-user-solid', clearable: true } }],
        [{ value:'approve123456.',attrs: { 'prefix-icon': 'el-icon-s-order', 'show-password': true }, key:'password', type: 'password' }]
    ],
    rules: {
        account: [{ required: true, message: '请输入用户名', triggle: 'blur' }],
        password: [{ required: true, message: '请输入密码', triggle: 'blur' }],
    }
}