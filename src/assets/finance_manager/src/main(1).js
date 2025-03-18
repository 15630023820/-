import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios';
import GMenuItem from '@/components/GMenuItem';
import GBreadCrumb from '@/components/GBreadCrumb';
import GDropDown from '@/components/GDropDown';
import GDigitalFlop from '@/components/GDigitalFlop';
import GChart from '@/components/GChart';
import GFormCreator from '@/components/GFormCreator';
import GTable from '@/components/GTable';
import GColumn from '@/components/GColumn';
import GQuery from '@/components/GQuery';
import GEbutton from '@/components/GEbutton';


Vue.component(GBreadCrumb.name, GBreadCrumb);
Vue.component(GDropDown.name, GDropDown);
Vue.component(GMenuItem.name, GMenuItem);
Vue.component(GDigitalFlop.name, GDigitalFlop);
Vue.component(GChart.name, GChart);
Vue.component(GFormCreator.name, GFormCreator);
Vue.component(GTable.name, GTable);
Vue.component(GColumn.name, GColumn);
Vue.component(GQuery.name, GQuery);
Vue.component(GEbutton.name, GEbutton);
// 样式重置的css
import '@/assets/css/normalize.css'
// 全局样式
import '@/assets/css/global_style.css'


// 注册组件
import drag from '@/directives/drag'
Vue.use(drag);

// 注册过滤器
import filters from '@/filters';
Vue.use(filters)



console.log(process.env.VUE_APP_URL,'环境变量');

Vue.config.productionTip = false
// element UI 安装 开始

import './elementInstall';

// element UI 安装 结束

// 方便 组件内使用的ajax
Vue.prototype.$ajax = Axios;

Object.defineProperty(Vue.prototype, '$gconfirm', {
  set() { },
  get() {
    return function (title) {
      return Vue.prototype.$messageBox.confirm(title, '提示', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          return true;
        })
        .catch(e => {
          console.log(title, '取消了');
          return false
        })
    }
  }
})

window.onunhandledrejection = function(e) {
  e.preventDefault(); // 禁止控制台的 未捕获异常的处理和报错
}

new Vue({
  router,
  store,
  render: h => h(App),
 
}).$mount('#app')
