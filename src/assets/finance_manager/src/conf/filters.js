// table内置过滤功能要求属性名与过滤器子名称一致
export const dataMap = {
    // 测试
    name:{
       Niko:'尼克' 
    },
    sex: {
        man: '男',
        woman: '女'
    },
    education: {
        college: '大学',
        highschool: '高中'
    },
    status: [
        '进件',
        '提交初审',
        '初审通过',
        '初审拒绝',
        '提交终审',
        '终审通过',
        '终审拒绝',
        '生成合同'
    ],
    statusColor: [
        'success',
        '',
        'success',
        'danger',
        'warning',
        'success',
        'danger',
        'success'
    ],
    role_name:{
        input:'录入专员',
        administrator:'管理员',
        approve:'审批专员'
    },
    contractText:[
        '未生成合同','未生成合同','未生成合同','未生成合同','未生成合同',
        '已生成合同','已生成合同','已生成合同','已生成合同','已生成合同'
        
    ],
    contractColor:[
        'primary','primary','primary','primary','primary',
        'success','success','success','success','success'
    ]

}