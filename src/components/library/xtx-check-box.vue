/*
 * @Author: jiea
 * @Date: 2022-05-22 18:39:17
 * @LastEditors: jiea
 * @LastEditTime: 2022-05-22 18:39:17
 * @Description: desc
 */
<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script>
export default {
  name: 'XtxCheckBox'
}
</script>
<script setup>
import { useVModel } from '@vueuse/core'
import { defineProps, defineEmits } from 'vue'
const emits = defineEmits(['change'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
// const checked = ref(false);
// 手动实现双向数据绑定
// const changeChecked = () => {
//   checked.value = !checked.value;
//   emits("update:modelValue", checked.value);
// };

// watch(
//   () => props.modelValue,
//   () => {
//     checked.value = props.modelValue;
//   },
//   { immediate: true }
// );
// @vueuse/core 的实现
// 使用useVModel实现双向数据绑定v-model指令
// 1. 使用props接收modelValue
// 2. 使用useVModel来包装props中的modelValue属性数据
// 3. 在使用checked.value就是使用父组件数据
// 4. 在使用checked.value = '数据' 赋值，触发emit('update:modelvalue', '数据')
const checked = useVModel(props, 'modelValue', emits)
const changeChecked = () => {
  const newValue = !checked.value
  // 通知父组件
  checked.value = newValue
  // 让组件支持 change 事件
  emits('change', newValue)
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
