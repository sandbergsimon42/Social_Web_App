import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import UserPage from '@/components/UserPage'
import Search from '@/components/Search'
import NotFound from '@/components/404.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user/:username',
      name: 'UserPage',
      component: UserPage
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }

  ]
})
