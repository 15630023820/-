export const columns = Object.freeze([
    {
        prop: 'birthday',
        label: '出生日期',
        width: 120,
        filter:'convertDate'
    },
    {
        prop: 'name',
        label: '姓名',
        width: 120,
    },
    {
        label: '性别',
        prop: 'sex',
        filter:'common'
    },
    {
        prop: 'education',
        label: '教育程度',
        filter:'common'
    },
    {
        prop: 'address1',
        label: '居住地址',

    },
    {
        prop: 'mobile_phone',
        label: '手机号',
    },
    {
        label: '申请状态',
        prop: 'status',
        width:100
    },
    {
        label: '操作',
        prop: 'operation',
        width: 300,
    },
    {
        label: '配送信息',
        children: [
            {
                label: '地址',
                children: [
                    { label: '省份', prop: 'name' },
                    { label: '市区' },
                    { label: '街道', prop: 'address' },
                ]
            }
        ]
    },
    {
        width: 400,
        label: '显示html',
        prop: 'test',
        filter:'common&name',
        formatter(row) {
            return `<div>
            <h2>${row.name}这是自定义html</h2>
            <button>按钮</button>
          </div>`
        }
    }
].map(ele => ({ ...ele, align: 'center' })));