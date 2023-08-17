import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { d$auth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/test/:id?',
      name: 'test',
      component: () => import('@/views/TestView.vue'),
      meta: { auth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/404View.vue')
    },
    {
      path: '/profile',
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/LoginView.vue')
        },
        {
          path: '/profile/:id?',
          name: 'profile',
          component: () => import('@/views/ProfileView.vue'),
          meta: { auth: true }
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = d$auth().isLoggedIn
  if (to.meta.auth && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
