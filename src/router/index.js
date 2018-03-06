import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ol2d from '@/components/ol2d'
import testComponent from '@/components/testComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/map',
      name: 'ol2d',
      component: ol2d
    },
    {
      path: '/test',
      name: 'testComponent',
      component: testComponent
    }
  ]
})
