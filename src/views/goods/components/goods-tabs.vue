/*
 * @Author: jiea
 * @Date: 2022-05-01 17:45:14
 * @LastEditors: jiea
 * @LastEditTime: 2022-05-01 17:47:18
 * @Description: desc
 */
/*
* @Description: file content
* @path: src/views/goods/components
* @Autor:Huhuuuu
* @LastEditors: Huhuuuu
* Date: 2022-04-24 20:17
* Update: 2022-04-24 20:17
* IDE:WebStorm
*/

<template>
  <div class="goods-tabs">
    <nav>
      <a :class="{active:activeName==='detali'}" @click="clickTab('detali')" href="javascript:;">商品详情</a>
      <a :class="{active:activeName==='comment'}" @click="clickTab('comment')"
         href="javascript:;">商品评价<span>({{goods.commentCount}})</span></a>
    </nav>
    <!-- 切换内容的地方 -->
    <component v-if="goods" :is="'goods-'+activeName" :goods="goods"/>
  </div>
</template>


<script>
import GoodsDetali from "./goods-detail"
import GoodsComment from "./goods-comment"
export default {
  components: {
    GoodsDetali,
    GoodsComment
  },
}
</script>


<script setup>
import { ref,inject } from "vue"
const activeName = ref("detali")
const clickTab = (name => {
  activeName.value = name
})
const goods = inject('goods')
</script>


<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }

      &:first-child {
        border-right: 1px solid #f5f5f5;
      }

      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
