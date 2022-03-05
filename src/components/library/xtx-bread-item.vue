<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>
<script setup>
const props = defineProps({
    // 路径
    to: {
        type: [String, Object],
         default: () => ''
    }
})
</script>
