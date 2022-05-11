/*
 * @path: src/components/library
 * @Autor:jiea
 * @LastEditors: Huhuuuu
 * Date: 2022-05-11 19:05
 * @LastEditTime: 2022-05-11 19:05
 * IDE:WebStorm
 * @Description: ...
 */
// 实现使用函数调用 xtx-message 组件的逻辑
import { createVNode, render } from 'vue'
import XtxMessage from '@/components/library/xtx-message'
// 准备 Dom 容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)
let timer = null
export default ({ type, text }) => {
  /**
   * 根据 xtx-message.vue 渲染消息提示
   * 1.导入组件
   * 2.根据组件创建虚拟结点
   */
  const vnode = createVNode(XtxMessage, { type, text })
  //  3.准备 DOM 容器
  //  4.把虚拟结点渲染到 DOM 容器中
  render(vnode, div)
  //  5.开启定时器 移除 DOM 容器内容
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
