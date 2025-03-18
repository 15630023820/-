let service;
import { AxiosError } from 'axios';
import { Loading, Notification,Message } from 'element-ui';
import {INFO_MAP} from '@/conf/message'
/**
 * 打开全局loading
 * @param { Object } config 
 * @returns 
 */
export const openLoading = config => {
    // 判断是否需要全局loading
    if (config.full)
        service = Loading.service({ fullscreen: true });
    return config;
}
/**
 * 关闭loading
 * @param {*} response 
 * @returns 
 */
export const closeLoading = response => {
    if (response.config.full)
        service.close();
    if(response?.data?.code === 20000) {
        Message.closeAll();
        if (response.data?.data && typeof response.data?.data === 'string')
        Message({
            type:'success',
            message:response.data?.data
        })
        else console.warn('该成功的请求没有文字描述',response.config.url)
    }
    return response;
}

/**
 * 异常展示
 * @param {*} err 
 * @returns 
 */
export const closeLoadingByExcet = err => {
    if (err instanceof AxiosError) {
        if (err.config.full) service.close();
        Notification.error(INFO_MAP[err.code]||err.code);
    }
    return Promise.reject(err);
}
