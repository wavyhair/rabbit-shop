/*
 * @Author: jiea
 * @Date: 2022-05-22 18:38:06
 * @LastEditors: jiea
 * @LastEditTime: 2022-05-22 18:41:09
 * @Description: desc
 */
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{ active }">
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span
          class="ellipsis"
          @click="changeItem(item)"
          v-for="item in currList"
          :key="item.code"
        >{{ item.name }}</span>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'XtxCity'
}
</script>
<script setup>
import { ref, computed, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
defineProps({
  fullLocation: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['change'])
//  控制展开收起，默认收起
const active = ref(false)
const openDialog = () => {
  active.value = true
  open()
}
const closeDialog = () => {
  active.value = false
}
// 切换展开收起
const toggleDialog = () => {
  if (active.value) closeDialog()
  else openDialog()
}
// 点击其他位置隐藏
const target = ref(null)
onClickOutside(target, () => {
  closeDialog()
})

// 获取城市数据
// 阿里云提供的接口地址 https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
// 打开城市列表的时候，做内存中缓存
const getCityData = () => {
  return new Promise((resolve, reject) => {
    // 有缓存
    if (window.cityData) {
      resolve(window.cityData)
    } else {
      // 无缓存
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        window.cityData = res.data
        resolve(window.cityData)
      })
    }
  })
}
// 获取城市数据，显示当前地方列表
const loading = ref(false)
const visible = ref(false)
const cityData = ref([])
const open = () => {
  visible.value = true
  loading.value = true
  // 获取数据
  getCityData().then(res => {
    cityData.value = res
    loading.value = false
  })
  // 清空结果
  for (const key in changeResult) {
    changeResult[key] = ''
  }
}

// 定义计算属性
const currList = computed(() => {
  // 省份
  let currList = cityData.value
  // 城市
  if (changeResult.provinceCode) {
    currList = currList.find(p => p.code === changeResult.provinceCode).areaList
  }
  // 地区
  if (changeResult.cityCode) {
    currList = currList.find(c => c.code === changeResult.cityCode).areaList
  }
  return currList
})

const changeResult = reactive({
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  countyCode: '',
  countyName: '',
  fullLocation: ''
})
const changeItem = (item) => {
  // 省份
  if (item.level === 0) {
    changeResult.provinceCode = item.code
    changeResult.provinceName = item.name
  }
  // 市
  if (item.level === 1) {
    changeResult.cityCode = item.code
    changeResult.cityName = item.name
  }
  // 区
  if (item.level === 2) {
    changeResult.countyCode = item.code
    changeResult.countyName = item.name
    changeResult.fullLocation = `${changeResult.provinceName}${changeResult.cityName}${changeResult.countyName}`
    closeDialog()
    emits('change', changeResult)
  }
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .option {
    // 省略...
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
