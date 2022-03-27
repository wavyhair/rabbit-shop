<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter />
      <!--    结果区域-->
      <div class="goods-list">
        <!--        排序-->
        <SubSort />
        <!--        列表-->
        <ul>
          <li v-for="item in goodsList" :key="item.id">
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <!-- 加载 -->
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>
<script setup>
import SubBread from './sub-bread.vue'
import SubFilter from './sub-filter.vue'
import SubSort from "@/views/category/sub-sort"
import GoodsItem from './components/goods-item.vue';
import XtxInfiniteLoading from '@/components/library/xtx-infinite-loading.vue';
import { useRoute } from 'vue-router';
import { findSubCategoryGoods } from '@/api/category';
import { ref, watch } from 'vue'
const route = useRoute()
const loading = ref(false)
// 是否加载完毕
const finished = ref(false)
// 商品列表数据
const goodsList = ref([])
// 查询参数
let reqParams = {
  page: 1,
  pageSize: 20
}
// 获取数据
const getData = () => {
  loading.value = true
  // 设置二级分类的 ID
  reqParams.categoryId = route.params.id
  findSubCategoryGoods(reqParams).then(({ result }) => {
    if (result.items.length) {
      goodsList.value.push(...result.items)
      reqParams.page++
    } else {
      // 没有数据代表加载完成
      finished.value = true
    }
    loading.value = false
  })
}
// 切换二级分类重新加载
watch(() => route.params.id, (newVal) => {
  if (newVal && route.path === ('/category/sub/' + newVal)) {
    goodsList.value = [] // 导致列表为空，加载更多组件顶上来，进入可视区，就会自动加载数据
    reqParams = {
      page: 1,
      pageSize: 20
    }
    finished.value = false
  }
})
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
