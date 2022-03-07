<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li v-for="i in list" :key="i.id" @mousemove="show(i)" @mouseleave="hide(i)">
      <router-link :to="`/category/${i.id}`" @click="hide(i)">{{ i.name }}</router-link>
      <div class="layer" :class="{open:i.open}">
        <ul>
          <li v-for="sub in i.children" :key="sub.id">
            <router-link :to="`/category/sub/${sub.id}`" @click="hide(i)">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
    const store = useStore();
    // 获取一级分类
    const list = computed(() => {
      return store.state.category.list;
    });
    // 显示二级分类
    const show = item=>{store.commit('category/show',item)}
    // 隐藏二级分类
    const hide = item=>{store.commit('category/hide',item)}

    // 
</script>

<style scoped lang="less">
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      // > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  &.open{
    height: 132px;
    opacity: 1;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
