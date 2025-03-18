import { isCancel, AxiosError } from "axios";

const requests = [];

const parseConfig = c => {
    return `${c.method}&${c.url}`;  // 一个请求的唯一标识
}

const killRequestByConfig = config => {
    let token;
    if (typeof config === 'string') token = config;
    else token = parseConfig(config);
    // 查找存在的req
    for (let i = 0, len = requests.length; i < len; i++) {
        const req = requests[i];
        if (token === req.token) {
            // abort取消
            req.c.abort();
            // 删除当前请求
            requests.splice(i, 1);
            // 减少执行次数
            return;
        }
    }
}

/**
 * 请求拦截器存储这个请求，并关联取消请求控制器
 * @param {*} config 
 * @returns 
 */
export const reqDuplicate = config => {
    let controller = new AbortController();
    let token = parseConfig(config);
    // 去除上次存在的同名请求
    killRequestByConfig(token); // A 移除上次的A

    // 保存这次的取消请求
    requests.push({
        c: controller,
        token
    });
    // 关联上取消请求【不是config.signal】
    config.signal = controller.signal;
    return config;
}

/**
 * 响应时取消请求
 * @param {*} response 
 * @returns 
 */
export const resDuplicate = response => {
    // 先有err,return err 这里和后续的response就都是err
    // if (response === undefined) {  // 防止出现 取消后的 响应会得到undefined;
    //     return response;
    // }
    let token = parseConfig(response.config);
    // 去除上次存在的同名请求
    killRequestByConfig(token); // 移除这次的A

    return response;
}

export const errDuplicate = err => {
    // if (err instanceof AxiosError) {
    //     if (err.code === 'ERR_CANCELD') {
    //         console.log('取消了一个请求...')
            // return Promise.reject(err);
    //     }
    // }
    if (isCancel(err)) {
        console.log('取消了一次请求...')
        // 截断这一次的响应err
    }
    return Promise.reject(err);

    // 如果有异常，返回到下一个拦截器就会有问题，resopnse成为了err对象
    // return err;
}