import { jwtDecode } from "jwt-decode";
import {expiresAdditionTime} from "@/conf/index";

export const isLogin = token => { 
    
    if (!token) {
        return false;
    } 
    let decoded = jwtDecode(token); 
    let finalExpiresTime = decoded.exp * 1000 ;
    let current = Date.now();
    
    if (finalExpiresTime - expiresAdditionTime < current) {
        return false;
    }
    
 
    
    return decoded;
    
}