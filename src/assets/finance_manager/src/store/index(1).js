import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const modules = {};

// 动态的引入
const modulesFn = require.context('./modules', true, /\.js$/);
let reg = /\.\/(.*)\.js$/;
modulesFn.keys().forEach(filePath => {
  let module = modulesFn(filePath).default;
  let moduleName = reg.exec(filePath)[1];
  modules[moduleName] = module;
  modules[moduleName].namespaced = true; // 统一加上命名空间
})




export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules
})
