import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 变量定义
  state: {
    buttonName: '按钮1',
    asideShow: false
  },
  // 变量操作
  getters: {
    buttonName: state => state.buttonName,
    asideShow: state => state.asideShow
  },
  // 函数
  mutations: {
    asideToggle (state) {
      state.asideShow = !state.asideShow
    }
  },
  // 异步的数据操作
  actions: {
  }
})
export default store
