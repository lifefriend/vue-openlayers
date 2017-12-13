import Vue from 'vue'
import Router from 'vue-router'
import ol2d from '@/components/ol2d'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ol2d',
      component: ol2d
    }
  ]
})
