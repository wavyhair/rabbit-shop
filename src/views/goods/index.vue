<template>
    <div class="xtx-goods-page" >
        <div class="container">
            <!-- 面包屑 s -->
            <XtxBread>
                <XtxBreadItem to="/">首页</XtxBreadItem>
                <XtxBreadItem v-if="goods" :to="'/category/'+goods.categories[1].id">{{goods.categories[1].name}}</XtxBreadItem>
                <XtxBreadItem v-if="goods" :to="'/category/sub/'+goods.categories[0].id">{{goods.categories[0].name}}</XtxBreadItem>
                <XtxBreadItem v-if="goods" >{{goods.name}}</XtxBreadItem>
            </XtxBread>
            <!-- 面包屑 e -->
            <!-- 商品信息 s -->
            <div class="goods-info" v-if="goods">
                <div class="media">
                    <GoodsImage :images="goods.mainPictures" />
                    <GoodsSales/>
                </div>
                <div class="spec">
                    <GoodsName :goods="goods"/>
                </div>
            </div>
            <!-- 商品信息 e -->
            <!-- 商品推荐  s -->
            <GoodsRelevant />
            <!-- 商品推荐  e -->

            <!-- 商品详情 s -->
            <div class="goods-footer">
                <div class="goods-article">
                    <!-- 商品+评价 -->
                    <div class="goods-tabs"></div>
                    <!-- 注意事项 -->
                    <div class="goods-warn"></div>
                </div>
                <!-- 24热榜+专题推荐 -->
                <div class="goods-aside"></div>
            </div>
            <!-- 商品详情 e -->
        </div>
    </div>
</template>

<script setup>
import GoodsRelevant from './components/goods-relevant'
import XtxBreadItem from "@/components/library/xtx-bread-item.vue"

import { findGoods } from '@/api/product';
import { ref, nextTick,watch } from 'vue';
import { useRoute } from 'vue-router';
import GoodsImage from './components/goods-image.vue';
import GoodsName from './components/goods-name.vue';
import GoodsSales from './components/goods-sales.vue';
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
                })
            })
        }
    }, { immediate: true })
    return goods
}
const goods = useGoods()


</script>

<style scoped lang='less'>
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
.goods-tabs {
    min-height: 600px;
    background: #fff;
}
.goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
}
</style>