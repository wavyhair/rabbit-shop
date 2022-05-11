import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入自己 UI 组件库
import UI from '@/components/library'
// 初始化样式
import 'normalize.css'
import '@/assets/styles/common.less'

// 创建一个 vue 应用实例
createApp(App)
  .use(store)
  .use(router)
  .use(UI)
  .mount('#app')
