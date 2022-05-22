/*
 * @Author: jiea
 * @Date: 2022-05-22 18:32:29
 * @LastEditors: jiea
 * @LastEditTime: 2022-05-22 18:33:25
 * @Description: desc
 */
<template>
    <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
        <XtxBreadItem  v-if="category.sub" :key="category.sub.id" :to="`/category/${category.sub.id}`">{{category.sub.name}}</XtxBreadItem>
        </Transition>
    </XtxBread>
</template>

<script setup>
import XtxBreadItem from '@/components/library/xtx-bread-item.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
//  获取二级分类的 id，在路由地址中。
const route = useRoute()
// 获取 vuex 中的类目数据
const store = useStore()
// 通过计算属性得到二级类目的名称 id，一级类目的名称 id。
const category = computed(() => {
  const obj = {}
  store.state.category.list.forEach(top => {
    top.children.forEach(sub => {
      if (sub.id === route.params.id) {
        // 设置二级类目
        obj.sub = { name: sub.name, id: sub.id }
        // 设置一级类目
        obj.top = { name: top.name, id: top.id }
      }
    })
  })
  return obj
})
</script>

<style scoped lang='scss'>
</style>
