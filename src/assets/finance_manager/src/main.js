import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios';
import GMenuItem from '@/components/GMenuItem';
import GBreadCrumb from '@/components/GBreadCrumb';
import GDropDown from '@/components/GDropDown';

Vue.component(GBreadCrumb.name,GBreadCrumb);
Vue.component(GDropDown.name,GDropDown);
Vue.component(GMenuItem.name,GMenuItem);
// 样式重置的css
import '@/assets/css/normalize.css'
// 全局样式
import '@/assets/css/global_style.css'



Vue.config.productionTip = false

// element UI 安装 开始
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// element UI 安装 结束

// 方便 组件内使用的ajax
Vue.prototype.$ajax = Axios;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
