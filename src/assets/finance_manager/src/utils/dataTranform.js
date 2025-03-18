export const resDataHandler = (resStr,...args)=>{
    if (resStr instanceof Blob)return resStr;
    let resData = JSON.parse(resStr);
    // 无尽向下查找data
    let tmp = resData;
    while(tmp.data) {
        // 指针向下移
        tmp = tmp.data;
    }
    // 特殊情况处理，最后一层的data是数组
    if (Array.isArray(tmp)) {
        resData.data.list = tmp;
    } else {
        resData.data = tmp; // 普通深层向上移动
    }
    return resData; // res.data Axios的响应体 res.data.data 自己封装的数据 list rows
}