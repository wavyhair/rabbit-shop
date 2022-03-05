import { createRouter, createWebHashHistory } from "vue-router";
import TopCategory from "@/views/category";
import SubCategory from "@/views/category/sub";
const Layout = () => import("@/views/Layout");
const Home = () => import("@/views/home");
const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: Home
      },
      { path: "/category/:id", component: TopCategory },
      { path: "/category/sub/:id", component: SubCategory }
    ]
  }
];

const router = createRouter({
  // 使用 hash 方式实现路由
  history: createWebHashHistory(),
  routes
});

export default router;
