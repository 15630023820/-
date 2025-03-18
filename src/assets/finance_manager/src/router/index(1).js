import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { whiteList } from '@/conf';
import { isLogin } from '@/utils'
import { loadMenu as apiLoadMenu } from '@/api/user'
import store from '@/store';
import LayoutComponent from '@/views/Layout'
import NotFoundComponent from '@/views/NotFound'


// 解决router3版本的bug
/**
 * Uncaught (in promise) Error: Redirected when going from "...' to '...' via a navigation guard
 */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, resolve, reject) {
  if (resolve || reject) return originalPush.call(this, location, resolve, reject);
  return originalPush.call(this, location).catch(e => { });
}


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // component: HomeView
    redirect: '/dashboard'
  },
 
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

const LAYOUT = 'Layout', HOME = 'Home';
function generateRoutes(routes) {
  return routes.map(r => {
    if (r.component === LAYOUT) {
      r.component = LayoutComponent;
    } else if (r.component === HOME) {
      // r.component = HomeComponent;
    } else {
      const filePath = r.component;
      r.component = () => new Promise((resolve, reject) => {
        import(`../views/${filePath}.vue`)
          .then(module => {
            // 中间层加组件名
            module.default.name = r.name;
            resolve(module)
          })
          .catch(reject)
      })
    }
    if (r.children && r.children.length > 0) {
      r.children = generateRoutes(r.children)
    }
    return r;
  })
}

async function loadMenu(to, next) {
  // 1. 发请求
  let res = await apiLoadMenu();
  // 2. 关闭逻辑口子 user.menu
  const menu = res?.data?.data?.menu;
  store.commit('user/setMenu', { menu });
  // 3. 生成动态路由
  const routes = generateRoutes(menu);
  console.log(routes, 'routes');
  // 4. 加入到路由对象中
  routes.forEach(route => {
    router.addRoute(route);
  });

  // 4.5 最后加入404
  router.addRoute({
    path: '*',
    component: NotFoundComponent
    // redirect:{ name:'404' } 已经现有的路由中
  })

  // 5. 重新访问to的url,用最新的重定向，替换之前无用的访问:replace:true
  next({ ...to, replace: true });
}


// 不满足，就滚蛋（简化处理）
// 访问程序时 检查登录鉴权
router.beforeEach(async (to, from, next) => {
  // 1.是否无需验证登录，白名单
  if (whiteList.includes(to.path)) return next();
  // 2.用户是否登录               // 记录住本次访问的url，登录后跳过去
  let token = window.sessionStorage.getItem('token');
  let user = isLogin(token);
  if (!user) {
    return next('/login?redirect=' + to.fullPath);
  }
  // vuex 
  // 3.验证是否加载好动态菜单(有菜单)
  if (store.state.user.menu && store.state.user.menu.length > 0) return next();

  await loadMenu(to, next);
  // 最终放行
  // next();
});

// 路由一旦放行之后，加入动态title
router.afterEach((to, from) => {
  const matched = to.matched;
  let str = '金融信贷-'; // 默认值
  for (let i = 0, len = matched.length; i < len; i++) {
    if (matched[i]?.meta?.title) {
      str += matched[i]?.meta?.title + '-';
    }
  }
  str = str.substring(0, str.length - 1)
  document.title = str;
});

router.afterEach((to, from) => {
  store.commit('user/setActiveUrl', { path: to.path });
  // 记录路由的访问
  let specialTitle;
  // 针对dashboard做兼容
  if (to.path === '/dashboard') {
    // 父路由的title
    specialTitle = to.matched[0].meta.title
  }
  if (to.meta.title || specialTitle)
    store.commit('user/addCacheTag', {
      route: to,
      title: to.meta.title || specialTitle
    })
});


export default router
