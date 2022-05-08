/*
 * @Author: jiea
 * @Date: 2022-05-07 21:00:20
 * @LastEditors: jiea
 * @LastEditTime: 2022-05-07 21:00:20
 * @Description: desc
 */
/*
* @Description: file content
* @path: src/views/goods/components
* @Autor:Huhuuuu
* @LastEditors: Huhuuuu
* Date: 2022-04-24 22:03
* Update: 2022-04-24 22:03
* IDE:WebStorm
*/

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div v-if="goodsList">
      <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { findHotGoods } from '@/api/goods'
import GoodsItem from '@/views/category/components/goods-item'
const props = defineProps({
  type: {
    type: Number,
    default: 1
  },
  goodsId: {
    type: String
  }
})
// 标题
const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
const title = computed(() => {
  return titleObj[props.type]
})
// 商品列表
const goodsList = ref([])
findHotGoods({ id: props.goodsId, type: props.type }).then(data => {
  goodsList.value = data.result.map(item => {
    item.tag = item.desc
    return item
  })
})
</script>

<style lang="less" scoped>
.goods-hot {
h3 {
  height: 70px;
  background: @helpColor;
  color: #fff;
  font-size: 18px;
  line-height: 70px;
  padding-left: 25px;
  margin-bottom: 10px;
  font-weight: normal;
}
::v-deep .goods-item {
  background: #fff;
  width: 100%;
  margin-bottom: 10px;
img {
  width: 200px;
  height: 200px;
}
p {
  margin: 0 10px;
}
&:hover {
   transform: none;
   box-shadow: none;
 }
}
}
</style>
