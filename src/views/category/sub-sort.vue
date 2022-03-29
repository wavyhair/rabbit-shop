<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField === null }"
        @click="changeSort(null)"
        href="javascript:;"
      >默认排序</a>
      <a
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
        href="javascript:;"
      >最新商品</a>
      <a
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
        href="javascript:;"
      >最高人气</a>
      <a
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        href="javascript:;"
      >评论最多</a>
      <a @click="changeSort('price')" href="javascript:;">
        价格排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'asc'
          }"
        />
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'desc'
          }"
        />
      </a>
    </div>
    <div class="check">
      <XtxCheckBox @change="changeCheck" v-model="sortParams.inventory">仅显示有货商品</XtxCheckBox>
      <XtxCheckBox @change="changeCheck" v-model="sortParams.onlyDiscount">仅显示特惠商品</XtxCheckBox>
    </div>
  </div>
</template>
<script setup>
// 1.根据后台需要的参数定义数据对象
// 2.根据数据对象，绑定组件（复选框，排序按钮）
// 3.在操作排序组件的时候，需要反馈给数据对象
// sortField====>publishTime,orderNum,price,evaluateNum
// sortMethod====>asc为正序 desc为倒序
import { reactive } from "vue"
const emits = defineEmits(["filter-change"])
const sortParams = reactive({
  inventory: false, // 库存
  onlyDiscount: false, // 折扣
  sortField: null, // 排序字段
  sortMethod: null // 降序或者升序
})
// 改变排序
const changeSort = sortField => {
  if (sortField === "price") {
    sortParams.sortField = sortField
    if (sortParams.sortMethod === null) {
      //  第一次点击 默认为降序
      sortParams.sortMethod = "desc"
      emits("filter-change", sortParams)
    } else {
      //  直接取反
      sortParams.sortMethod = sortParams.sortMethod === "desc" ? "asc" : "desc"
      emits("filter-change", sortParams)
    }
  } else {
    //  如果排序没有改变直接 return
    if (sortParams.sortField === sortField) return
    sortParams.sortField = sortField
    sortParams.sortMethod = null
    emits("filter-change", sortParams)
  }
}
// 复选框改变
const changeCheck = () => {
  emits("filter-change", sortParams)
}
</script>
<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .sort {
    display: flex;

    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;

      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }

      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;

        &.up {
          top: 3px;
          border-bottom-color: #bbb;

          &.active {
            border-bottom-color: @xtxColor;
          }
        }

        &.down {
          top: 15px;
          border-top-color: #bbb;

          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }

  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
