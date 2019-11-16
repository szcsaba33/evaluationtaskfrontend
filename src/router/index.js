import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HistoryView from '@/views/HistoryView'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView
    },
    {
      path: '/stats',
      name: 'stats',
      components: () => import('../views/StatsView.vue')
    }
  ]
})
