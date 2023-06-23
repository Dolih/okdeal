import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
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
    path: '/AdminServicesView',
    name: 'AdminServicesView',
    meta: {layout: 'main'},
    component: () => import('../views/AdminServicesView.vue')
  },
  {
    path: '/UserView',
    name: 'UserView',
    meta: {layout: 'main'},
    component: () => import('../views/UserView.vue')
  },
  
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
