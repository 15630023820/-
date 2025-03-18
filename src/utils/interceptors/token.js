/**
 * 请求时
 * @param {*} config 
 * @returns 
 */

export const reqToken=config=>{
    let token = window.sessionStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    
    }
    return config
}
/**
 * 相应时
 * @param {*} config 
 * @returns 
 */

export const resToken=response=>{
    if(response == undefined){
        return response
    } 
    let token = response?.data?.token || false; 
    if(token){
       
        window.sessionStorage.setItem('token',token)
    }
    return response
}