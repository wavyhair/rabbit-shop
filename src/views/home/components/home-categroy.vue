<template>
  <div class="home-category" @mouseleave="categoryId=null">
    <!-- 左侧分类 start -->
    <ul class="menu">
      <li :class="{active:categoryId === i.id}" v-for="i in menuList" :key="i.id" @mouseenter="categoryId = i.id">
        <RouterLink :to="`/category/${i.id}`">{{ i.name }}</RouterLink>
        <template v-if="i.children">
          <router-link
            v-for="sub in i.children"
            :key="sub.id"
            :to="`/category/${sub.id}`"
            >{{ sub.name }}</router-link
          >
        </template>
        <!-- 骨架 start -->
        <template v-else>
          <XtxSkeleton width="60px" height="18px" bg="rgba(255,255,255,.2)" style="margin-right:5px" />
          <XtxSkeleton width="50px" height="18px"  bg="rgba(255,255,255,.2)" />
        </template>
        <!-- 骨架 end -->

      </li>
    </ul>
    <!-- 左侧分类 end -->

    <!-- 弹层 start -->
    <div class="layer">
      <h4>
        {{ currCategory && currCategory.id === "brand" ? "品牌" : "分类" }}
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <!-- 商品 start -->
      <ul
        v-if="currCategory && currCategory.goods && currCategory.goods.length"
      >
        <li v-for="i in currCategory.goods" :key="i.id">
          <RouterLink :to="`/category/${i.id}`">
            <img :src="i.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ i.name }}</p>
              <p class="desc ellipsis">{{ i.desc }}</p>
              <p class="price"><i>¥</i>{{ i.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 商品 end -->

      <!-- 品牌 start -->
      <ul v-if="currCategory && currCategory.brands">
        <li class="brand" v-for="i in currCategory.brands" :key="i">
          <RouterLink to="/">
            <img :src="i.picture" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ i.name }}/p>
              </p>
              <p class="name ellipsis">{{ i.desc }}</p>
              <p class="desc ellipsis-2">{{ i.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌 end -->
    </div>
    <!-- 弹层 end -->
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { findBrand } from "@/api/home";
    const store = useStore();
    // 最终使用的数据 = 9 个分类 + 1 个品牌
    const brand = reactive({
      id: "brand",
      name: "品牌",
      children: [{ id: "brand-children", name: "品牌推荐" }],
      // 品牌列表
      brands: []
    });
    const menuList = computed(() => {
      // 得到 9 个分类 且每个一级分类下子分类只有两个
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          goods: item.goods
        };
      });
      list.push(brand);
      return list;
    });

    // 获取弹出层的推荐商品数据
    const categoryId = ref(null);
    const currCategory = computed(() => {
      return menuList.value.find(item => item.id === categoryId.value);
    });

    // 获取品牌数据
    findBrand().then(data => {
      brand.brands = data.result;
    });
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover ,&.active{
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
    // 品牌样式
    li.brand {
      height: 180px;
      a {
        align-items: flex-start;
        img {
          width: 120px;
          height: 160px;
        }
        .info {
          p {
            margin-top: 8px;
          }
          .place {
            color: #999;
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
// 骨架动画
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
