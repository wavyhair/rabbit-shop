import { createRouter, createWebHashHistory } from 'vue-router'
import TopCategory from '@/views/category'
import SubCategory from '@/views/category/sub'
import Goods from '@/views/goods'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const Login = () => import('@/views/login')
const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      { path: '/category/:id', component: TopCategory }, // 二级类目
      { path: '/category/sub/:id', component: SubCategory }, // 三级类目
      { path: '/product/:id', component: Goods } // 商品详情
    ]
  }
]

const router = createRouter({
  // 使用 hash 方式实现路由
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior (to, from, savedPosition) {
    return { top: 0, left: 0 }
  }
})

export default router
