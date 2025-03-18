import { isLogin } from '@/utils';
import req from '@/utils/request';
import store from '@/store';
let needRefresh =  true;
let cachedRequest = [];
let skipCacheUrl = '/user/login'; // 刷新token，缓存队列中需要跳过，等同于refresh_token
export const reqRefreshToken = async config => {
    let token = isLogin(window.sessionStorage.getItem('token'));
    console.log('当前token:', token);
    if (!token) {
        // 需要更新token
        if (needRefresh) {
            needRefresh = false; // 防止并发请求反复进入

            // 刷新token
            await req.post(skipCacheUrl, store.state.user.userAccount);
            // 清空缓存请求的队列
            needRefresh = true;
            cachedRequest.forEach(cb => cb());
            cachedRequest.length = 0;
            cachedRequest = [];
        }
        // 同时进来的后续请求需要缓存
        // 判断状态为刷新，且不是/user/login请求
        if (!needRefresh && config.url !== skipCacheUrl) {
            return new Promise(resolve => {
                cachedRequest.push(() => {
                    resolve(config);
                })
            })
        }
    }
    return config;
}