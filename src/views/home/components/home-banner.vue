<template>
  <div class="home-banner">
    <XtxCarousel :sliders="sliders.data" auto-play />
  </div>
</template>

<script setup>
import {  reactive } from "vue";
import { findBanner } from "@/api/home";
    let sliders = reactive({data:[]});
    // 获取轮播图数据
    findBanner().then(data => {
      sliders.data = data.result;
    });

</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
