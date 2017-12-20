import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 变量定义
  state,
  // 变量操作
  getters,
  // 函数
  mutations,
  // 异步的数据操作
  actions
})
export default store
