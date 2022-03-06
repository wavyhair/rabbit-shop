<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 s -->
      <XtxBread >
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
        <XtxBreadItem :key="topCategory.id">{{ topCategory.name }}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 面包屑 e -->

      <!-- 轮播图 s -->
      <XtxCarousel :sliders="sliders.data" auto-play style="height:500px"/>
      <!--      轮播图 e -->
      <!-- 所有二级分类 s -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture">
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 所有二级分类 e -->
      <!-- 分类关联商品 s  -->
      <div class="ref-goods" v-for="item in subList.data" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore/>
        </div>
        <div class="body">
          <!-- 不同分类商品 s -->
          <GoodsItem v-for="g in item.goods " :key="g.id" :goods="g"/>
          <!-- 不同分类商品 e -->
        </div>
      </div>
      <!-- 分类关联商品 e  -->


    </div>
  </div>
</template>
<script setup>
import XtxBreadItem from "@/components/library/xtx-bread-item.vue"
import GoodsItem from './components/goods-item'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {computed, reactive, watch} from 'vue'
import {findBanner} from "@/api/home"
import {findTopCategory} from "@/api/category"
// 获取轮播图数据
let sliders = reactive({data: []})
findBanner().then(data => {
  sliders.data = data.result
})
// 面包屑加所有分类
const store = useStore()
const route = useRoute()
const topCategory = computed(() => {
  let cate = {}
  const item = store.state.category.list.find(item => {
    return item.id === route.params.id
  })
  if (item) cate = item
  return cate
})
// 推荐商品
const subList = reactive({data:[]})
const getSubList = () => {
  findTopCategory(route.params.id).then(data => {
    subList.data = data.result.children
  })
}
watch(()=>route.params.id,(newId)=>{
  newId&&getSubList()
},{immediate:true})

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

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}

</style>
