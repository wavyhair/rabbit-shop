<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div ref="target" style="position:relative;height:426px;">
      <transition>
        <ul v-if="list.length" ref="pannel" class="goods-list">
          <li v-for="item in list" :key="item.id">
            <RouterLink :to="`/product/${item.id}`">
              <img :src="item.picture" alt />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </transition>
    </div>
  </HomePanel>
</template>

<script setup>
import { findHot } from '@/api/home'
import HomePanel from './home-panel.vue'
import HomeSkeleton from "./home-skeleton.vue";
import { useLazyData } from '@/hooks'
const { target, result: list } = useLazyData(findHot)


</script>
<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>