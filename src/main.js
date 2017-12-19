// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
// import Axios from 'axios'
import ElementUI from 'element-ui'
import 'openlayers/css/ol.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(ElementUI)
Vue.config.productionTip = false

// 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等
// Vue.prototype.$http = Axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
