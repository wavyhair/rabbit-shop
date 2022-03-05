<template>
  <div class="home-banner">
    <XtxCarousel :sliders="sliders" auto-play />
  </div>
</template>

<script setup>
import {  ref, onBeforeMount, onMounted } from "vue";
import { findBanner } from "@/api/home";
    const sliders = ref([]);
    // 获取轮播图数据
    findBanner().then(data => {
      sliders.value = data.result;
    });
    onBeforeMount(() => {});
    onMounted(() => {});
   
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
