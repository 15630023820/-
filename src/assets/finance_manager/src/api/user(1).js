import req from '@/utils/request';
export const login = (form,option) => req.post('/user/login', form,option)
export const loginByLoading = (form) => req.post('/user/login',form, { full:true })
export const loadMenu = ()=> req.get('/user/menu');
export const createUser = user => req.post('/permission/createUser',user);