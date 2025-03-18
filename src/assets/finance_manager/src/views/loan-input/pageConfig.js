// 配置: 固定配置项（关键是不变更的优化）
// 冻结过的对象，vue不会去做Object.defineProperty的操作
// Object.isFrozen(obj); 返回是否被冻结来判断

import {
    sexOptions,
    companyOptions,
    marriageOptions,
    educationOptions
} from '@/conf/uiFields'
let phone_validator = function (rule, value, callback) {
    if (!value) {
        return callback(new Error('电话不能为空'));
    }
    console.log(this,'当前的this');
    const phoneReg = /^1[3589]\d{9}$/;
    if (phoneReg.test(value)) {
        return callback();
    } else {
        return callback(new Error('手机号不合法..'))
    }
};


// { cards,fields } 任选
export default {
    cards: Object.freeze([
        {
            title: '个人基本信息',
            items: [
                [
                    { "key": "name", "type": "text", "colspan": 8, "label": "姓名" },
                    { "key": "birthday", "type": "date", "colspan": 8, "label": "生日" },
                    {
                        "key": "sex", "type": "select", "colspan": 8, "label": "性别",
                        options: sexOptions
                    },
                ],
                [
                    { "key": "identity_card", "type": "text", "colspan": 8, "label": "身份证" },
                ],
                [
                    {
                        "key": "marriage", "type": "select", "colspan": 8, "label": "婚姻状况",
                        options: marriageOptions
                    },
                    {
                        "key": "education", "type": "select", "colspan": 8, "label": "教育程度",
                        options: educationOptions
                    },
                    { "key": "address1", "type": "text", "colspan": 8, "label": "地址1" },
                ],
                [
                    { "key": "address2", "type": "text", "colspan": 8, "label": "地址2" },
                    { "key": "phone", "type": "text", "colspan": 8, "label": "电话" },
                    { "key": "mobile_phone", "type": "text", "colspan": 8, "label": "移动电话" },
                ],
            ]
        },
        {
            title: '职业信息',
            items: [
                [
                    { "key": "company", "type": "text", "colspan": 6, "label": "公司" },
                    {
                        "key": "trade", "type": "select", "colspan": 6, "label": "行业",
                        options: companyOptions
                    },
                    { "key": "position", "type": "text", "colspan": 6, "label": "职位" },
                    { "key": "address3", "type": "text", "colspan": 6, "label": "地址3" },
                ],
                [
                    { "key": "company_type", "type": "text", "colspan": 8, "label": "公司类型" },
                    { "key": "company_email", "type": "text", "colspan": 8, "label": "邮箱" },
                    { "key": "company_phone", "type": "text", "colspan": 8, "label": "公司电话" },
                ],
            ]
        },
        {
            title: '收支情况',
            items: [
                [
                    { "key": "income", "type": "text", "colspan": 8, "label": "收入" },
                ],
            ]
        },
        {
            title: '家庭联系人',
            items: [
                [
                    { "key": "contact", "type": "text", "colspan": 8, "label": "关系1" },
                    { "key": "contact_name", "type": "text", "colspan": 8, "label": "姓名" },
                ],
                [
                    { "key": "contact_phone", "type": "text", "colspan": 8, "label": "手机" },
                ],
            ]
        },
        {
            title: '工作证明人',
            items: [
                [
                    { "key": "contact2", "type": "text", "colspan": 12, "label": "关系2" },
                    { "key": "contact2_name", "type": "text", "colspan": 12, "label": "姓名" },
                ],
                [
                    { "key": "contact2_phone", "type": "text", "colspan": 8, "label": "手机" },
                ],
                [
                    { "key": "contact2_dep", "type": "text", "colspan": 12, "label": "部门" },
                    { "key": "contact2_pos", "type": "text", "colspan": 12, "label": "职位" },
                ],

                [
                    { "key": "remark", "type": "textarea", "colspan": 24, "label": "备注" }
                ]
            ]
        }

    ]),
    rules: {
        "name": [{ "required": true, "message": "请输入姓名", "trigger": "blur" }],
        "birthday": [{ "required": true, "message": "请输入生日", "trigger": "blur" }],
        "sex": [{ "required": true, "message": "请输入性别", "trigger": "blur" }],
        "identity_card": [{ "required": true, "message": "请输入身份证号码", "trigger": "blur" }],
        "marriage": [{ "required": true, "message": "请输入婚姻状况", "trigger": "blur" }],
        "education": [{ "required": true, "message": "请输入教育程度", "trigger": "blur" }],
        "address1": [{ "required": true, "message": "请输入地址1", "trigger": "blur" }],
        "address2": [{ "required": true, "message": "请输入地址2", "trigger": "blur" }],
        "phone": [{ 
            // "required": true, "message": "请输入电话", 
            validator: phone_validator,
            "trigger": "blur" }],
        "mobile_phone": [
            { "required": true, "message": "请输入移动电话", "trigger": "blur" },
            //  写function后续可以bind(this)，就可以再这里面操作组件
            {
                validator:phone_validator, trigger: 'blur'
            }
        ],
        "company": [{ "required": true, "message": "请输入公司", "trigger": "blur" }],
        "trade": [{ "required": true, "message": "请输入行业", "trigger": "blur" }],
        "position": [{ "required": true, "message": "请输入职位", "trigger": "blur" }],
        "address3": [{ "required": true, "message": "请输入地址3", "trigger": "blur" }],
        "company_type": [{ "required": true, "message": "请输入公司类型", "trigger": "blur" }],
        "company_email": [{ "required": true, "message": "请输入公司电子邮件", "trigger": "blur" }],
        "company_phone": [{ "required": true, "message": "请输入公司电话", "trigger": "blur" }],
        "income": [{ "required": true, "message": "请输入收入", "trigger": "blur" }],
        "contact": [{ "required": true, "message": "请输入联系人", "trigger": "blur" }],
        "contact_name": [{ "required": true, "message": "请输入联系人姓名", "trigger": "blur" }],
        "contact_phone": [{ "required": true, "message": "请输入联系人电话", "trigger": "blur" }],
        "contact2": [{ "required": true, "message": "请输入联系人2", "trigger": "blur" }],
        "contact2_name": [{ "required": true, "message": "请输入联系人2姓名", "trigger": "blur" }],
        "contact2_phone": [{ "required": true, "message": "请输入联系人2电话", "trigger": "blur" }],
        "contact2_dep": [{ "required": true, "message": "请输入联系人2部门", "trigger": "blur" }],
        "contact2_pos": [{ "required": true, "message": "请输入联系人2职位", "trigger": "blur" }],
        "remark": [{ "required": true, "message": "请输入备注", "trigger": "blur" }]
    },
    n:1
}