import { isLogin } from "@/utils" 
import {getToken} from "@/api/user";
import  store  from "@/store";
let refeshStatus = 'need';
let cacheRequest = [];
let skipUrl = ['/protected','/login'] //刷新缓存要跳过的url
/**
 * 无感刷新token
 * @param {*} config 
 * @returns 
 */
export const reqRefreshToken = async (config) => {
    if(config.url === '/login'){    
        return config;
    }
    let token = isLogin(window.sessionStorage.getItem('token')); 
    if (!token) { 
        if(refeshStatus === 'need'){
            refeshStatus = 'pending';
            //刷新token 
            try{
                let res = await getToken(); 
                refeshStatus = 'need';
                cacheRequest.forEach(cb=>cb())
                cacheRequest.length = 0;
                cacheRequest = [];
            }catch(err){ 
                refeshStatus = 'need';
                cacheRequest.forEach(cb=>cb())
                cacheRequest.length = 0;
                cacheRequest = [];
             }  
        } 
      
        if(refeshStatus === 'pending' && !skipUrl.includes(config.url)){   
            return new Promise((resolve,reject)=>{
                cacheRequest.push(()=>{resolve(config)})
            })
        }else{
            return config;
        }
    }
    
    return config;
}