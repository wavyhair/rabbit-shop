<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 s -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{topCategory.name}}</XtxBreadItem>
      </XtxBread>
      <!-- 面包屑 e -->

      <!-- 轮播图 s -->
      <XtxCarousel :sliders="sliders.data"  auto-play style="height:500px"/>
      <!--      轮播图 e -->
      <!-- 所有二级分类 s -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture">
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 所有二级分类 3 -->

      <!-- 不同分类商品 s -->
    </div>
  </div>
</template>
<script setup>
import XtxBreadItem from "@/components/library/xtx-bread-item.vue"
import {useStore} from 'vuex'
import {useRoute}from 'vue-router'
import {computed,reactive} from 'vue'
import { findBanner } from "@/api/home";

// 获取轮播图数据
let sliders = reactive({data:[]});
findBanner().then(data => {
  sliders.data = data.result;
});
// 面包屑加所有分类
const  store = useStore()
const  route = useRoute()
const topCategory = computed(()=>{
  let cate = {}
  const item = store.state.category.list.find(item=>{
    return item.id===route.params.id
  })
  if(item) cate = item
  return cate
})
</script>
<style scoped lang="less">

.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}

</style>
