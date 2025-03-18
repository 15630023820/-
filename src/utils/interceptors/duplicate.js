import {AxiosError} from 'axios';

const request = [];
const parseConfig = c =>{
    return `${c.method}&${c.url}`;
}
const killRequestByConfig = config =>{
    let token;
     if(typeof config === 'string'){
        token = config;
    }else{
        token = parseConfig(config);
    }

    //查找是否存在这个请求
    let index = request.findIndex(item=>item.token == token);
    if(index > -1){
        request[index].c.abort();
        request.splice(index,1);
    }
}
/**
 * 请求拦截器储存这个请求，并关联取消请求控制器
 * @param {*} config 
 */
export const reqDuplicate = config =>{
    let controller = new AbortController();
    let token = parseConfig(config)

    //去除上次存在的同名请求
    killRequestByConfig(token);
    
    //保存这次的取消请求
    request.push({
        c:controller,
        token:token
    });
    //关联上取消请求
    config.signal = controller.signal

    return config
}

/**
 * 响应时取消上次的请求
 * @param {*} response 
 * @returns 
 */
 export const resDuplicate = response =>{
    if(response === undefined){ //防止出现取消后响应会出现response为undefined
        return response;
    }
    let token = parseConfig(response.config)
    //去除这上次存的请求
    killRequestByConfig(token);
    return response 
}


/**
 * 异常处理
 * @param {*} err 
 * @returns 
 */
export const errDuplicate = err =>{
    if(err instanceof AxiosError){
        if(err.code === 'ECONNABORTED'){
           console.log('请求超时');
        }
       
    }
    return err;
}