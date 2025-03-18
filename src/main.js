import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
Vue.config.productionTip = false
//vuex刷新后数据丢失
 
 

//样式
import '@/assets/css/normalize.css'
import '@/assets/css/global_style.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$ajax = Axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
