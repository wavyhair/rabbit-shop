/*
 * @Author: jiea
 * @Date: 2022-05-03 08:35:14
 * @LastEditors: jiea
 * @LastEditTime: 2022-05-03 08:35:14
 * @Description: desc
 */
<template>
  <AppTopnav />
  <AppHeader />
  <AppHeaderSticky />
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <AppFooter />
</template>
<script setup>
import AppTopnav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import AppHeaderSticky from '@/components/app-header-sticky.vue'

import { useStore } from 'vuex'
// 获取下分类数据
const store = useStore()
store.dispatch('category/getCategory')
</script>
<style lang="less" scoped>
</style>
