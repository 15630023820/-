
import Vue from 'vue';
export const columns = Object.freeze([
    {
        prop: 'birthday',
        label: '出生日期',
        filter:'convertDate'
    },
    {
        prop: 'name',
        label: '姓名',
    },
    {
        label: '身份证',
        prop: 'identity_card',
    },
    {
        label: '操作',
        prop: 'operation',
        width: 300,
    },
].map(ele => ({ ...ele, align: 'center' })));


console.log(Vue.filter('common')('man','sex'),'filter')

// fn('convertDate') 调用内部依赖了this.options
// 而该函数执行时 this是undefined
let fn = Vue.filter.bind(Vue);


export const genEditConfig = function(row){
    return {
        fields: [
            [{ label: 'id', value: row.id, key: 'id' }],
            [{ label: '姓名', value: row.name, key: 'name', }],
            [{ label: '出生日期', value: fn('convertDate')(row.birthday), key: 'birthday' }],
            [{ label: '性别', value: fn('common')(row.sex,'sex'), key: 'sex' }],
            [{ label: '教育程度', value: fn('common')(row.education,'education'), key: 'education' }],
            [{ label: '地址', value: row.address1, key: 'address1' }],
            [{ label: '手机号', value: row.mobile_phone, key: 'mobile_phone' }],
            [{ label: '身份证', value: row.identity_card, key: 'identity_card' }],
        ].map((arr) => {
            arr[0].type = 'text';
            arr[0].attrs = {
                disabled: true
            }
            arr[0].colspan = 22;
            return arr;
        }),
    }
}