/*
 * @Author: jiea
 * @Date: 2022-05-22 18:34:09
 * @LastEditors: jiea
 * @LastEditTime: 2022-05-22 18:34:19
 * @Description: desc
 */
<template>
  <RouterLink :to="`/product/${goods.id}`" class='goods-item'>
    <img :src="goods.picture" alt="">
    <p class="name ellipsis">{{goods.name}}</p>
    <p class="desc ellipsis">{{goods.tag}}</p>
    <p class="price">&yen;{{goods.price}}</p>
  </RouterLink>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  goods: {
    type: Object,
    default: () => {}
  }
})
</script>

<style scoped lang="less">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  .hoverShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: @priceColor;
    font-size: 20px;
  }
}

</style>
