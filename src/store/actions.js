import Axios from 'axios'
export default {
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
