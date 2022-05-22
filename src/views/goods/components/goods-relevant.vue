/*
 * @Author: jiea
 * @Date: 2022-05-22 18:30:07
 * @LastEditors: jiea
 * @LastEditTime: 2022-05-22 18:30:07
 * @Description: desc
 */
/*
* @Description: file content
* @path: src\views\goods\components\goods-relevant.vue
* @Autor:jie
* @LastEditors: jie
* @Time: 2022-04-23 20:15:23
*/
<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{ goodsId ? "同类商品推荐" : "猜你喜欢" }}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel  :sliders="sliders" auto-play />
  </div>
</template>

<script setup>
import { findRelGoods } from '@/api/goods'
import { ref } from 'vue'
import XtxCarousel from '@/components/library/xtx-carousel'

const props = defineProps({
  goodsId: {
    type: String,
    default: undefined
  }
})
// 根据 id 查找数据
const useRelGoodsDate = id => {
  const sliders = ref([])
  findRelGoods(id).then(data => {
    //  每页四条
    const size = 4
    const total = Math.ceil(data.result.length / size)
    for (let i = 0; i < total; i++) {
      sliders.value.push(data.result.slice(i * size, (i + 1) * size))
    }
  })
  return sliders
}
const sliders = useRelGoodsDate(props.goodsId)
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;

  :deep(.xtx-carousel) {
    height: 380px;
    .carousel {
      &-indicator {
        bottom: 30px;
        span {
          &.active {
            background: @xtxColor;
          }
        }
      }
      &-btn {
        top: 110px;
        opacity: 1;
        background: rgba(0,0,0,0);
        color: #ddd;
        i {
          font-size: 30px;
        }
      }
    }
  }

  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;

    .title {
      font-size: 20px;
      padding-left: 10px;
    }

    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);

      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}
</style>
