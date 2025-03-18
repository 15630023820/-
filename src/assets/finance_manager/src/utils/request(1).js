import Axios from 'axios';
import { reqToken, resToken } from './interceptors/token';
import {
    openLoading,
    closeLoading,
    closeLoadingByExcet
} from './interceptors/loading';
import {
    reqDuplicate,
    resDuplicate, errDuplicate
} from './interceptors/duplicate'
import { reqRefreshToken } from './interceptors/refreshToken';
import { resDataHandler } from './dataTranform';


const req = Axios.create({
    baseURL: '/api',
    // timeout:5000
    transformResponse:[resDataHandler],
    
})

req.interceptors.request.use(reqDuplicate);
req.interceptors.response.use(resDuplicate, errDuplicate);

req.interceptors.request.use(openLoading)
req.interceptors.response.use(closeLoading, closeLoadingByExcet)


// 自动装载token(要保证先处理token)
req.interceptors.request.use(reqToken);
req.interceptors.response.use(resToken);

// 无感刷新token
req.interceptors.request.use(reqRefreshToken);




export default req;