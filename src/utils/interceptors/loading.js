let service;
import {  AxiosError } from "axios";
import { Loading,Notification } from "element-ui";

/**
 * 打开loading
 * @param {*} config 
 * @returns 
 */
export const openLoading=config=>{
    if(config.loading){
        service = Loading.service({fullscreen:true})
    }
    
    return config
}

/**
 * 关闭loading
 * @param {*} response 
 * @returns 
 */
export const closeLoading = response=>{
    if(response.config.loading){
        service.close()
    }
    
    return response
}

/**
 * 异常
 * @param {*} err 
 * @returns 
 */
export const closeLoadingByExcet = err=>{
  
    if(err instanceof AxiosError){
        if(err.config.loading){
            service.close();
        }
        Notification.error(err.message);
    }
    return Promise.reject(err);
}