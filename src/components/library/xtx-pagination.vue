/*
* @Author: jiea
* @Date: 2022-05-03 11:43:33
* @LastEditors: jiea
* @LastEditTime: 2022-05-03 21:27:16
* @Description: desc
*/

<template>
  <div class="xtx-pagination">
    <a
        v-if="myCurrentPage > 1"
        @click="changePage(myCurrentPage - 1)"
        href="javascript:;"
    >上一页</a
    >
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a
        v-for="i in pager.btnArr"
        @click="changePage(i)"
        :key="i"
        href="javascript:;"
        :class="{ active: i === myCurrentPage }"
    >{{ i }}</a
    >
    <span v-if="pager.end < pager.pageCount">...</span>
    <a
        v-if="myCurrentPage < pager.pageCount"
        @click="changePage(myCurrentPage + 1)"
        href="javascript:;"
    >下一页</a
    >
    <a v-else href="javascript:;" class="disabled">下一页</a>
  </div>
</template>
<script>
export default {
  name: 'XtxPagination'
}
</script>
<script setup>
import { computed, ref, watch } from 'vue'
// eslint-disable-next-line no-undef
const emits = defineEmits(['current-change'])
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  total: {
    type: Number,
    default: 100
  },
  pageSize: {
    type: Number,
    default: 10
  },
  currentPage: {
    type: Number,
    default: 1
  }
})

//  需要数据
// 1.约定按钮的个数 5 个 如果是动态的需要设置成响应式数据
const count = 5
// 2.当前显示的页码
const myCurrentPage = ref(10)
// 3.总页数 = 总条数 / 每一页条数 向上取整
const myTotal = ref(100)
const myPageSize = ref(10)
// 其他数据（总页数，其实按钮，结束按钮，按钮数组） 依赖上面的数据得到
// eslint-disable-next-line no-unused-vars
const pager = computed(() => {
  //  总页数
  const pageCount = Math.ceil(myTotal.value / myPageSize.value)
  //  按钮个数和当前页码=> 结束按钮 按钮数组
  // 1.理想情况下
  const offset = Math.floor(count / 2)
  // 起始页码
  let start = myCurrentPage.value - offset
  // 结束页码
  let end = start + count - 1
  //  2.如果起始页码小于 0 需要处理
  if (start < 1) {
    start = 1
    // 如果结束页码大于总页数就等于总页数 否则才等于计算结果
    end = start + count - 1 > pageCount ? pageCount : start + count - 1
  }
  //  3. 如果结束页码大于总页数也需要处理
  if (end > pageCount) {
    end = pageCount
    start = end - count + 1 < 1 ? 1 : end - count + 1
  }
  //  按钮数组
  const btnArr = []
  for (let i = start; i <= end; i++) {
    btnArr.push(i)
  }
  return { pageCount, btnArr, start, end }
})
// 监听 props 的变化 更新组件的数据
watch(props, () => {
  myTotal.value = props.total
  myPageSize.value = props.pageSize
  myCurrentPage.value = props.currentPage
}, { immediate: true })
// 切换分页方法
const changePage = (page) => {
  myCurrentPage.value = page
  //  通知父组件
  emits('current-change', page)
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;

  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;

    &:hover {
      color: @xtxColor;
    }

    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;

      &:hover {
        color: #333;
      }
    }
  }

  > span {
    margin-right: 10px;
  }
}
</style>
