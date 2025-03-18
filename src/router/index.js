import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { winteList } from '@/conf/index'
import { isLogin } from '@/utils/index'
import req from '@/utils/request'
import store from '@/store/index'
import { loadMenu as getMenu } from '@/api/user'
import Layoutview from '@/views/Layout.vue' 
Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
 
  {
    path: '/login',
    name: 'login',
    meta:{title:'登录'},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  }
]

const router = new VueRouter({
  routes
})

function getRoutes(menu){
  return menu.map(item=>{
  
    if(item.component == 'Home'){
      // item.component = HomeView
    }else if(item.component == 'Layout'){
      item.component = Layoutview 
    }else{
      item.component = () => import(`@/views${item.path}.vue`)
    }
    if(item.children && item.children.length > 0){
      item.children = getRoutes(item.children)
    }
    return item
  })
}

async function loadMenu(to,next){
  //1.获取菜单
  let res = await getMenu()
  //2.存储菜单
  store.commit('user/setMenuList',res?.data) 
  //3.生成路由
  const routes =  getRoutes(res.data)
  //4.添加路由
  console.log(routes, 'routes');
  routes.forEach(route=>{
    router.addRoute(route)
  })
  
  router.addRoute({
    path:'*', 
    component:() => import('@/views/404.vue')
  })
  
  //5.跳转 用最新的重定向，替换之前无用的访问
  next({...to,replace:true})
 
}


//访问程序时 检查登录状态
router.beforeEach(async (to, from, next) => {
  console.log(to)
  console.log(router)
  if ( winteList.includes(to.path)) return next() 
    let token = window.sessionStorage.getItem('token') 
    if (!isLogin(token)) {
 
      // 未登录则跳转到登录页面 记录当前页面地址
      next('/login?redirect=' + to.fullPath)
    }  
    //vuex 判断是否加载动态菜单
    console.log(store.state.user.menu.menuList)
    if(store.state.user.menu.menuList && store.state.user.menu.menuList.length > 0){
      return next()
    } 
    await loadMenu(to,next)  
});

router.afterEach((to, from) => {
  console.log(to.matched)
  let str = '我的网站'
  to.matched.forEach(item=>{
    if(item.meta.title) {
       str += `-${item.meta.title}`
    }
   
  })
  document.title = str
  
})


router.beforeEach((to, from, next) => {
  store.commit('user/setActiveUrl', { path: to.path })
  next()
});
export default router
