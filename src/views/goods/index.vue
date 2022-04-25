<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goods">
      <!-- 面包屑 s -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem  :to="'/category/' + goods.categories[1].id">{{ goods.categories[1].name }}
        </XtxBreadItem>
        <XtxBreadItem  :to="'/category/sub/' + goods.categories[0].id">{{
            goods.categories[0].name
          }}
        </XtxBreadItem>
        <XtxBreadItem >{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 面包屑 e -->
      <!-- 商品信息 s -->
      <div class="goods-info" v-if="goods">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <!-- 区域组件 -->
          <GoodsName :goods="goods" />
          <!-- 规格组件 -->
          <GoodsSku :goods="goods" :sku-id="skuId" @change="changeSku" />
          <!-- 数量组件 -->
          <XtxNumbox label="数量" v-model="num" :max="goods.inventory" />
          <!--  按钮组件 -->
          <XtxButton class="xtx-button" type="primary">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品信息 e -->
      <!-- 商品组件  s -->
      <GoodsRelevant  :goodsId="goods.id"/>

      <!-- 商品详情 s -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs />
          <!-- 注意事项 -->
          <GoodsWarn/>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goods-id="goods.id" :type="1"/>
          <GoodsHot :goods-id="goods.id" :type="2"/>
        </div>
      </div>
      <!-- 商品详情 e -->
    </div>
  </div>
</template>

<script setup>
import GoodsRelevant from "./components/goods-relevant"
import XtxBreadItem from "@/components/library/xtx-bread-item.vue"

import { findGoods } from "@/api/product"
import { ref, nextTick, watch,provide } from "vue"
import { useRoute } from "vue-router"
import GoodsImage from "./components/goods-image.vue"
import GoodsName from "./components/goods-name.vue"
import GoodsSales from "./components/goods-sales.vue"
import GoodsSku from "./components/goods-sku.vue"
import GoodsTabs from "@/views/goods/components/goods-tabs"
import GoodsHot from "@/views/goods/components/goods-hot"
import GoodsWarn from "@/views/goods/components/goods-warn"

const skuId = ref(undefined)

// 获取商品详情
const useGoods = () => {
  // 出现路由地址商品 id 发生变化，但是不会重新初始化组件
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        // 让商品数据为 null 可以让使用 v-if 的组件重新销毁和创建
        goods.value = null
        nextTick(() => {
          goods.value = data.result
          skuId.value = goods.value.skus[0].id

        })
      })
    }
  }, { immediate: true })
  return goods
}
// sku 变化
const changeSku = (sku) => {
  if (sku.skuId) {
    goods.value.price = sku.price
    goods.value.oldPrice = sku.oldPrice
    goods.value.inventory = sku.inventory
  }
}

// 数量变化事件
const num = ref(1)
const changeNum = (val => {

})

const goods = useGoods()
provide('goods',goods)


</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}


.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}

.xtx-button {
  margin-top: 20px;
}
</style>
