import jwt_decode from "jwt-decode";
import { expiresAdditionTime } from '@/conf'
/**
 * 判断token是否临近过期
 * @param {*} token 
 * @returns 
 */
export const isLogin = token =>{
    if (!token) return false;
    var decoded = jwt_decode(token);
    let finalExpiresTime = decoded.exp * 1000
    let current = Date.now();
    //  1691420524000    -   600000          1691417612112
    if (finalExpiresTime - expiresAdditionTime < current) {
        return false;
    }
    return decoded; // {id,type,account}
}