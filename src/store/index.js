import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const modules = {}
const modulesFn = require.context('./modules', true, /\.js$/)

modulesFn.keys().forEach((fileName) => {
  const moduleConfig = modulesFn(fileName)
  const moduleName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
  modules[moduleName] = moduleConfig.default
  modules[moduleName].namespaced = true; //统一加上命名空间
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
