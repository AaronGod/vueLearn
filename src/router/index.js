import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login-page',
  component: () => import('@/views/Login')
},
{
  path: '/',
  // name: 'layout-page', 当子元素有默认导航时不需要设置name
  component: () => import('@/views/Layout'),
  children: [{
    path: '', // 默认导航
    name: 'home-page',
    component: () => import('@/views/Home')
  },
  {
    path: 'qa',
    name: 'qa-page',
    component: () => import('@/views/QA')
  },
  {
    path: 'video',
    name: 'video-page',
    component: () => import('@/views/Video')
  },
  {
    path: 'my',
    name: 'my-page',
    component: () => import('@/views/My')
  }
  ]
}
]

const router = new VueRouter({
  routes
})

export default router
