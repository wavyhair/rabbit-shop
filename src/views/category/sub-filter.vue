<template>
  <!-- 筛选区 -->
  <div class='sub-filter' v-if='filterData&&!filterLoading'>
    <div class='item'>
      <div class='head'>品牌：</div>
      <div class='body'>
        <a
          :class='{active:filterData.selectedBrand==brand.id}'
          href='javascript:;'
          v-for='brand in filterData.brands'
          :key='brand.id'>{{ brand.name }}</a>
      </div>
    </div>

    <div class='item' v-for='p in filterData.saleProperties' :key='p.id'>
      <div class='head'>{{ p.name }}</div>
      <div class='body'>
        <a :class='{active:p.selectedProp==attr.id}' href='javascript:;' v-for='attr in p.properties'
           :key='attr.id'>{{ attr.name }}</a>
      </div>
    </div>
  </div>
  <!-- 骨架屏 -->
  <div v-else class='sub-filter'>
    <XtxSkeleton class='item' width='800px' height='40px' />
    <XtxSkeleton class='item' width='800px' height='40px' />
    <XtxSkeleton class='item' width='600px' height='40px' />
    <XtxSkeleton class='item' width='600px' height='40px' />
    <XtxSkeleton class='item' width='600px' height='40px' />
  </div>
</template>
<script setup>

import { findSubCategoryFilter } from '@/api/category'
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'

// 1.获取数据。
// 2.数据中心需要全部选中，需要预览将来点击激活功能，默认全部选中。
// 3.完成渲染
const route = useRoute()
const filterData = ref(null)
const filterLoading = ref(false)
// 4.分类发生变化的时候重新需要筛选数据，需要使用侦听器。
watch(
  () => route.params.id,
  (newVal, oldVal) => {
    // 当你从二级分类去顶级分类也会拿到 ID ,不能去加载数据因为它不是二级分类的 ID
    if (newVal && route.path === '/category/sub/' + newVal) {
      filterLoading.value = true
      findSubCategoryFilter(route.params.id).then(res => {
        // 给品牌添加全部
        res.selectedBrand = null
        res.result.brands.unshift({ id: null, name: '全部' })
        // 给销售属性添加全部
        res.result.saleProperties.forEach(p => {
          p.selectedProp = undefined
          p.properties.unshift({ id: null, name: '全部' })
        })
        filterData.value = res.result
        filterLoading.value = false
      })
    }
  },
  { immediate: true }
)
</script>
<style scoped lang='less'>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;

  .item {
    display: flex;
    line-height: 40px;

    .head {
      width: 80px;
      color: #999;
    }

    .body {
      flex: 1;

      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;

        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}

.xtx-skeleton {
  padding: 10px 0;
}
</style>
