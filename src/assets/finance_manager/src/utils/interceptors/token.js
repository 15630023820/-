
/**
 * 请求时处理token 
 * @param {*} config 
 * @returns 
 */
export const reqToken = config =>{
    let token = window.sessionStorage.getItem('token');
    if (token) {
        config.headers.token = token;
    }
    return config;
}
/**
 * 响应时处理token 
 * @param {*} response 
 * @returns 
 */
export const resToken = response => {
   
    let token = response.data.data.token;
    if (token) {
        window.sessionStorage.setItem('token',token);
    }
    return response
}


