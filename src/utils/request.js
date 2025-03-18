import Axios from 'axios'
import {reqToken,resToken} from './interceptors/token'
import {reqDuplicate,resDuplicate,errDuplicate} from './interceptors/duplicate'
import {openLoading,closeLoading,closeLoadingByExcet} from './interceptors/loading'
import {reqRefreshToken} from './interceptors/refreshToken'
const req = Axios.create({
    baseURL:'/api',
    timeout:5000,
   
})

//拦截重复请求
req.interceptors.request.use(reqDuplicate)
req.interceptors.response.use(resDuplicate,errDuplicate)


//请求loading
req.interceptors.request.use(openLoading)
req.interceptors.response.use(closeLoading,closeLoadingByExcet)

//请求token
req.interceptors.request.use(reqToken);
req.interceptors.response.use(resToken);


//无感刷新token
req.interceptors.request.use(reqRefreshToken); 


export default req;