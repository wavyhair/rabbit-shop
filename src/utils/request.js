// 创建 axios 实例
// 请求拦截器 如果有 token 进行头部携带
// 响应拦截器 剥离无效数据、处理 token 失效
// 导出函数 调用当前的 axios 实例发请求 返回 promise
import router from "@/router";
import store from "@/store";
import axios from "axios";

// 导出基准地址
export const baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net/";
const instance = axios.create({
  baseURL,
  timeout: 5000
});
// 请求拦截器
instance.interceptors.request.use(
  config => {
    const { profile } = store.state.user;
    if (profile.token) {
      // 请求头携带 token
      config.headers.Authorization = `Bearer ${profile.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// 响应拦截器
// res => res.data 取出 data 数据  调用接口直接拿到的就是后台返回的数据
instance.interceptors.response.use(
  res => res.data,
  err => {
    // 状态为 401 进入该函数
    if (err.response && err.response.status === 401) {
      // 清空无效用户信息
      store.commit("user/setUser", {});
      // 跳转到登录页
      // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
      //  encodeURIComponent 转换url编码 防止解析地址出问题
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath);
      // 跳转需要传参(当前路由地址)给登陆页码
      router.push("/login?redirectUrl=" + fullPath);
    }
    return Promise.reject(err);
  }
);

// 请求工具函数
export default (url,mathod,submitData) => {
    return instance({
        url,
        mathod,
          // 1. 如果是 get 请求  需要使用 params 来传递 submitData   ?a=10&c=10
    // 2. 如果不是 get 请求  需要使用 data 来传递submitData   请求体传参
        [mathod.toLowerCase()==='get'?'params':'data']:submitData
    })
}
