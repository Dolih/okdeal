import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/HomeView',
    name: 'HomeView',
    meta: {layout: 'main'},
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/AllServicesView',
    name: 'AllServicesView',
    meta: {layout: 'main'},
    component: () => import('../views/AllServicesView.vue')
  },
  {
    path: '/LoginView',
    name: 'LoginView',
    meta: {layout: 'empty'},
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/RegisterView',
    name: 'RegisterView',
    meta: {layout: 'empty'},
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/AddView',
    name: 'AddView',
    meta: {layout: 'main'},
    component: () => import('../views/AddView.vue')
  },
  {
    path: '/ServiceView/:serviceId',
    name: 'ServiceView',
    meta: {layout: 'main'},
    component: () => import('../views/ServiceView.vue')
  },
  {
    path: '/ChatView',
    name: 'ChatView',
    meta: {layout: 'main'},
    component: () => import('../views/ChatView.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
