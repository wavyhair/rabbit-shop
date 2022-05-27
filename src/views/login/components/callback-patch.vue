<!--
 * @Author: chenjie
 * @Date: 2022-05-23 20:00:30
 * @LastEditors: chenjie
 * @LastEditTime: 2022-05-27 21:46:19
 * @FilePath: \rabbit-shop\src\views\login\components\callback-patch.vue
 * @Description: 完善信息页面
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
-->
<template>
  <Form ref="formCom" :validation-schema="mySchema" v-slot="{ errors }" class="xtx-form" autocomplete="off">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field v-model="form.account" :class="{ err: errors.account }" class="input" type="text" name="account"
          placeholder="请输入用户名" />
      </div>
      <div v-if="errors.account" class="error">{{ errors.account }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field v-model="form.mobile" :class="{ err: errors.mobile }" class="input" type="text" name="mobile"
          placeholder="请输入手机号" />
      </div>
      <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field v-model="form.code" :class="{ err: errors.code }" class="input" type="text" name="code"
          placeholder="请输入验证码" />
        <span class="code" @click="send">{{ time === 0 ? '发送验证码' : time }}</span>
      </div>
      <div v-if="errors.code" class="error">{{ errors.code }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field v-model="form.password" :class="{ err: errors.password }" class="input" type="password" name="password"
          placeholder="请输入密码" />
      </div>
      <div v-if="errors.password" class="error">{{ errors.password }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field v-model="form.rePassword" :class="{ err: errors.rePassword }" class="input" type="password"
          name="rePassword" placeholder="请确认密码" />
      </div>
      <div v-if="errors.rePassword" class="error">{{ errors.rePassword }}</div>
    </div>
    <a href="javascript:;" class="submit" @click="submit">立即提交</a>
  </Form>
</template>

<script setup>
import { Form, Field } from 'vee-validate'
import { reactive, ref, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import schema from '@/utils/vee-validateschema'
import Message from '@/components/library/message'
import { useIntervalFn } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { userQQPatchCode, userQQPatchLogin } from '@/api/user'
const props = defineProps({
  unionId: {
    type: String,
    default: ''
  }
})
const router = useRouter()
const store = useStore()
const form = reactive({
  account: null,
  mobile: null,
  code: null,
  password: null,
  rePassword: null
})
const formCom = ref(null)
// 校验规则对象
const mySchema = {
  account: schema.account,
  mobile: schema.mobile,
  code: schema.code,
  password: schema.password,
  rePassword: schema.rePassword
}
// 发送验证码
/**
 * pause 暂停 resume 开启
 * useIntervalFn（回调函数，执行间隔，是否立即开启）
 *  */
const time = ref(0)
const { pause, resume } = useIntervalFn(() => {
  time.value--
  if (time.value <= 0) {
    pause()
  }
}, 1000, false)
onUnmounted(() => {
  pause()
})
// 发送验证码
const send = async () => {
  const valid = await mySchema.mobile(form.mobile)
  if (valid === true) {
    // 通过
    // 没有倒计时才可以发送验证码
    if (time.value === 0) {
      userQQPatchCode(form.mobile).then(() => {
        Message({
          type: 'success',
          text: '发送成功'
        })
        time.value = 60
        resume()
      }).catch(() => {
        Message({
          type: 'error',
          text: '手机号不存在'
        })
      })
    }
  } else {
    // 校验失败 使用 vee 的错误函数显示错误信息 setFieldError(字段，错误信息)
    formCom.value.setFieldError('mobile', valid)
  }
}
// 立即绑定
const submit = async () => {
  const isok = await formCom.value.validate()
  if (isok) {
    userQQPatchLogin({
      unionId: props.unionId,
      ...form
    }).then(data => {
      const {
        id,
        account,
        nickname,
        avatar,
        token,
        mobile
      } = data.result
      store.commit('user/setUser', {
        id,
        account,
        nickname,
        avatar,
        token,
        mobile
      })
      Message({
        type: 'success',
        text: 'QQ完善信息成功'
      })
      router.push(store.state.user.redirectUrl)
    }).catch(() => {
      Message({
        type: 'error',
        text: 'QQ完善信息失败'
      })
    })
  }
}
</script>

<style scoped lang='less'>
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;

  &:hover {
    cursor: pointer;
  }
}
</style>
