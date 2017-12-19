import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 变量定义
  state: {
    buttonName: '按钮1',
    asideShow: false,
    url: ''
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
    },
    setUrl (state, location) {
      state.url = location
    }
  },
  // 异步的数据操作
  actions: {
    getData ({commit, state}, id) {
      // 使用 CancelToken 退出一个Axios事件
      // var CancelToken = Axios.CancelToken
      // var source = CancelToken.source()
      // source.cancel()
      // console.log('cancel')

      Axios.get('http://www.xxx.com?id=' + id).then(res => {
        // 统一数据模型，方便后台接口的改变
        var url = res.data.data[0].url
        commit('setUrl', url)
      })
      .catch((error) => {     // 错误处理
        console.log(error)
      })
    }
  }
})
export default store
