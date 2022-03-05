<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑  s -->
      <XtxBread>
        <XtxBreadItem :to="{path:'/'}">首页</XtxBreadItem>
        <XtxBreadItem to="/category/100500">电器</XtxBreadItem>
        <XtxBreadItem>空调</XtxBreadItem>
      </XtxBread>
      <!-- 面包屑  e -->

    </div>
  </div>
</template>
<script>
import XtxBreadItem from "@/components/library/xtx-bread-item.vue";

export default {
  name: "TopCategory",
  components: {XtxBreadItem}
}
</script>
<style scoped lang="less"></style>
