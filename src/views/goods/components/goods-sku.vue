<!--
 * @Author: chenjie
 * @Date: 2022-04-06 21:44:04
 * @LastEditors: jiea
 * @LastEditTime: 2022-05-22 18:29:11
 * @FilePath: \rabbit-shop\src\views\goods\components\goods-sku.vue
 * @Description:
 *
-->

<template>
    <div class="goods-sku">
        <dl v-for="item in goods.specs" :key="item.id">
            <dt>{{ item.name }}</dt>
            <dd>
                <template v-for="val in item.values" :key="val.name">
                    <img v-if="val.picture" :class="{ selected: val.selected, disabled: val.disabled }"
                        @click="clickSpecs(item, val)" :src="val.picture" :title="val.name" />
                    <span v-else :class="{ selected: val.selected, disabled: val.disabled }"
                        @click="clickSpecs(item, val)">
                        {{
                                val.name
                        }}
                    </span>
                </template>
            </dd>
        </dl>
    </div>
</template>
<script setup>
import getPowerSet from '@/vender/power-set'
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({
      specs: [],
      skus: []
    })
  },
  skuId: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['change'])

const spliter = '☆'
// 根据 skus 数据得到路径字典对象
const pathMap = {}
const getPathMap = skus => {
  skus.forEach(sku => {
    // 1.过滤出有库存有效的 sku
    if (sku.inventory) {
      // 2.得到 sku 属性值数组
      const specs = sku.specs.map(specs => specs.valueName)
      // 3.得到 sku 属性值数组的子集
      const powerSet = getPowerSet(specs)
      // 4. 设置给路径字典对象
      powerSet.forEach(set => {
        const key = set.join(spliter)
        // 如果有 key 就往数组追加
        if (pathMap[key]) pathMap[key].push(sku.id)
        // 如果没有 key 就设置一个数组
        else pathMap[key] = [sku.id]
      })
    }
  })
}
// 获取当前选中值的数组
const getSelectedValues = (specs) => {
  const arr = []
  specs.forEach(item => {
    // 选中的按钮对象
    const seletedVla = item.values.find(val => val.selected)
    arr.push(seletedVla ? seletedVla.name : undefined)
  })
  return arr
}

// 更新按钮禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  // 1.约定每一个按钮的状态由本身的 disabled 数据来控制
  specs.forEach((item, i) => {
    const selectedValues = getSelectedValues(specs)
    item.values.forEach(val => {
      // 2.判断当前是否选中 是选中的话不用判断
      if (val.selected) return
      // 3. 拿当前的值按照顺序套入选中的值数组
      selectedValues[i] = val.name
      // 4.剔除 undefined 数据 按照分隔符拼接 key
      const key = selectedValues.filter(value => value).join(spliter)
      // 拿着 key 去路径字典中查找是否有数据， 有的话可以点击 没有就禁用
      val.disabled = !pathMap[key]
    })
  })
}

const clickSpecs = (item, val) => {
  // 如果按钮是禁用阻止程序运行
  if (val.disabled) return
  if (val.selected) {
    // 如果是选中状态就取消选中
    val.selected = false
  } else {
    // 如果是未选中状态就让其他的未选中 当前的选中
    item.values.forEach(sku => {
      sku.selected = false
    })
    val.selected = true
    updateDisabledStatus(props.goods.specs, pathMap)
    // 触发 change 事件将 sku 数据传递出去
    const selectedArr = getSelectedValues(props.goods.specs).filter(v => v)
    if (selectedArr.length === props.goods.specs.length) {
      const skuIds = pathMap[selectedArr.join(spliter)]
      const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
      // 传递
      emits('change', {
        skuId: sku.id,
        price: sku.price,
        oldOrice: sku.oldOrice,
        inventory: sku.inventory,
        specsText: sku.specs.reduce((p, n) =>
                    `${p} ${n.name}:${n.valueName}`, '').replace(' ', '')
      })
    } else {
      emits('change', {})
    }
  }
}

const initSelectedStatus = (goods, skuId) => {
  const sku = goods.skus.find(sku => sku.id === skuId)
  if (sku) {
    goods.specs.forEach((spec, i) => {
      const value = sku.specs[i].valueName
      spec.values.forEach(val => {
        val.selected = val.name === value
      })
    })
  }
}

// 设置一些没有库存的sku 方便测试功能
props.goods.skus.forEach(item => {
  if (['300411718', '300411719', '300477367', '300477368', '300411723'].includes(item.id)) {
    item.inventory = 0
  }
})
getPathMap(props.goods.skus)

updateDisabledStatus(props.goods.specs, pathMap)
initSelectedStatus(props.goods, props.skuId)

</script>
<style scoped lang="less">
.sku-state-mixin () {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;

    &.selected {
        border-color: @xtxColor;
    }

    &.disabled {
        opacity: 0.6;
        border-style: dashed;
        cursor: not-allowed;
    }
}

.goods-sku {
    padding-left: 10px;
    padding-top: 20px;

    dl {
        display: flex;
        padding-bottom: 20px;
        align-items: center;

        dt {
            width: 50px;
            color: #999;
        }

        dd {
            flex: 1;
            color: #666;

            >img {
                width: 50px;
                height: 50px;
                .sku-state-mixin ();
            }

            >span {
                display: inline-block;
                height: 30px;
                line-height: 28px;
                padding: 0 20px;
                .sku-state-mixin ();
            }
        }
    }
}
</style>
