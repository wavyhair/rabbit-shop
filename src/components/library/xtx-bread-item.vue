/*
 * @Author: jiea
 * @Date: 2022-05-22 18:38:33
 * @LastEditors: jiea
 * @LastEditTime: 2022-05-22 18:41:37
 * @Description: desc
 */
<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>
<script setup>
defineProps({
  // 路径
  to: {
    type: [String, Object],
    default: () => ''
  }
})
</script>
