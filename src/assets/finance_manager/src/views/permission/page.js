export default {
    fields: Object.freeze([
        [{ label: '用户名', colspan: 24, key: 'account', type: 'text' }],
        [{ label: '密码', colspan: 24, key: 'password', type: 'password' }],
        [{ label: '确认密码', colspan: 24, key: 'confirmPwd', type: 'password' }],
        [{
            label: '权限分配', colspan: 8, key: 'role_id', type: 'radio', value:'2',
            radios: [
                { label: '2', text: '销售人员' },
                { label: '1', text: '初审人员' },
            ]

        }]
    ]),
    rules: {
        account: [{ "required": true, "message": "用户名必填", "trigger": "blur" }],
        password: [{ "required": true, "message": "用户名必填", "trigger": "blur" },
        { "trigger": "blur", message: '密码必须要6-12位之间', min: 6, max: 12, }
        ],
        confirmPwd:[{ "trigger": "blur",validator: function (rule, value, callback) {
            if (!value) {
                return callback(new Error('确认密码不能为空'));
            }
            if (value === this.formData.password) {
                return callback();
            } else {
                return callback(new Error('两次密码不一致..'))
            }
        } }],
    }
}


