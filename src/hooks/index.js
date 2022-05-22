// hooks 封装逻辑，提供响应式数据
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
// 数据懒加载函数
export const useLazyData = apiFn => {
  // 1.被观察的对象
  // 2.不同的Api函数
  const target = ref(null)
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop()
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    {
      threshold: 0
    }
  )
  return { target, result }
}
