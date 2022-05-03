/*
 * @Author: jiea
 * @Date: 2022-05-03 08:32:54
 * @LastEditors: jiea
 * @LastEditTime: 2022-05-03 08:32:54
 * @Description: desc
 */
<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a
        @click="toggle(-1)"
        href="javascript:;"
        class="iconfont icon-angle-left prev"
        :class="{ disabled: index === 0 }"
      ></a>
      <a
        @click="toggle(1)"
        href="javascript:;"
        class="iconfont icon-angle-right next"
        :class="{ disabled: index === 1 }"
      ></a>
    </template>
    <div class="box" ref="target">
      <Transition name="fade">
        <ul
          v-if="brands.length"
          class="list"
          :style="{ transform: `translateX(${-index * 1240}px)` }"
        >
          <li v-for="i in brands" :key="i.id">
            <RouterLink  :to="`/category/${i.id}`">
              <img :src="i.picture" alt />
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </Transition>
    </div>
  </HomePanel>
</template>

<script setup>
import HomePanel from './home-panel'
import { findBrand } from '@/api/home'
import { ref } from 'vue'
import { useLazyData } from '@/hooks'
import HomeSkeleton from './home-skeleton.vue'
const { target, result: brands } = useLazyData(() => findBrand(10))
//     // 切换效果
const index = ref(0)
const toggle = step => {
  const newIndex = index.value + step
  if (newIndex < 0 || newIndex > 1) return
  index.value = newIndex
}
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
