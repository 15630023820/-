import req from "@/utils/request";
//登录
export const login = (form)=>{
  return req.post('/login',form
    ,{loading:true})
}
//获取token
export const getToken = ()=>{
  return req.get('/protected')
}

//获取菜单
export const loadMenu = (form)=>{
  return req.get('/user/menu')
}