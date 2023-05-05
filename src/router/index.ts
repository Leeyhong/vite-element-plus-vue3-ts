import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  { 
    path:"/", 
    redirect: '/login'
  },
  { 
    path:"/home", 
    component:()=>import("@/views/index.vue") 
  },
  { 
    path:"/login", 
    component:()=>import("@/views/login.vue") 
  },
]

const router = createRouter({
  history: createWebHistory(), // 采用history模式，不带#
  // history: createWebHashHistory(), // 采用hash模式，带#
  routes,
})

export default router
