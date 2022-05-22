/*
 * @Author: jiea
 * @Date: 2022-05-22 18:37:48
 * @LastEditors: jiea
 * @LastEditTime: 2022-05-22 18:37:48
 * @Description: desc
 */
/*
 * @Description: file content
 * @path: src\components\library\xtx-numbox.vue
 * @Autor:jie
 * @LastEditors: jie
 * @Time: 2022-04-23 16:21:52
 */
<template>
    <div class="xtx-numbox">
        <div class="label">{{label}}</div>
        <div class="numbox">
            <a href="javascript:;" @click="changeNum(-1)">-</a>
            <input type="text" readonly :value="modelValue">
            <a href="javascript:;" @click="changeNum(1)">+</a>
        </div>
    </div>
</template>
<script>
export default {
  name: 'XtxNumbox'
}
</script>
<script setup>
import { useVModel } from '@vueuse/core'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: {
    type: String
  },
  modelValue: {
    type: Number,
    default: 1
  },
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 100
  }
})
const emits = defineEmits(['change'])
const num = useVModel(props, 'modelValue', emits)
// 加减按钮事件
const changeNum = val => {
  const newValue = num.value + val
  if (newValue < props.min || newValue > props.max) return
  num.value = newValue
  emits('change', newValue)
}

</script>
<style scoped lang="less">
.xtx-numbox {
    display: flex;
    align-items: center;

    .label {
        width: 60px;
        color: #999;
        padding-left: 10px;
    }

    .numbox {
        width: 120px;
        height: 30px;
        border: 1px solid #e4e4e4;
        display: flex;

        >a {
            width: 29px;
            line-height: 28px;
            text-align: center;
            background: #f8f8f8;
            font-size: 16px;
            color: #666;

            &:first-of-type {
                border-right: 1px solid #e4e4e4;
            }

            &:last-of-type {
                border-left: 1px solid #e4e4e4;
            }
        }

        >input {
            width: 60px;
            padding: 0 5px;
            text-align: center;
            color: #666;
        }
    }
}
</style>
