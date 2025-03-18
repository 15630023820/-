let service;
import { AxiosError } from 'axios';
import { Loading, Notification } from 'element-ui';
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
