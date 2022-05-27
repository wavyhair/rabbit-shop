<!--
 * @Author: chenjie
 * @Date: 2022-05-23 20:00:03
 * @LastEditors: chenjie
 * @LastEditTime: 2022-05-26 22:51:30
 * @FilePath: \rabbit-shop\src\views\login\components\callback-bind.vue
 * @Description: 绑定手机页面
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
-->
<template>
  <Form ref="formCom" :validation-schema="mySchema" v-slot="{ errors }" autocomplete="off" class="xtx-form">
    <div class="user-info">
      <img :src="avatar" alt="头像" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field v-model="form.mobile" name="mobile" class="input" :class="{ err: errors.mobile }" type="text"
          placeholder="绑定的手机号" />
      </div>
      <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field v-model="form.code" name="code" class="input" :class="{ err: errors.code }" type="text"
          placeholder="短信验证码" />
        <span class="code" @click="send">{{ time === 0 ? '发送验证码' : time }}</span>
      </div>
      <div v-if="errors.code" class="error">{{ errors.code }}</div>
    </div>
    <a href="javascript:;" class="submit" @click="submit">立即绑定</a>
  </Form>
</template>

<script setup>
import QC from 'qc'
import { ref, reactive, onUnmounted } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validateschema'
import { useIntervalFn } from '@vueuse/core'
import Message from '@/components/library/message'
import { userQQBindlogin, userQQBindCode } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()

/**
 * 准备信息 unionId(openId) qq 头像 昵称
 * 完成表单校验
 * 发送验证码（校验，定义api，调用，完成倒计时）
 * 进行绑定（绑定成功就是登录成功）
 */
const props = defineProps({
  unionId: {
    type: String,
    default: ''
  }
})
const nickname = ref(null)
const avatar = ref(null)

if (QC.Login.check()) {
  QC.api('get_user_info').success(res => {
    nickname.value = res.data.nickname
    avatar.value = res.data.figureurl_1
  })
}

// 表单数据对象
const form = reactive({
  mobile: null,
  code: null
})
// 校验规则对象
const mySchema = {
  mobile: schema.mobile,
  code: schema.code
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
const formCom = ref(null)
// 发送验证码
const send = async () => {
  const valid = await mySchema.mobile(form.mobile)
  if (valid === true) {
    // 通过
    // 没有倒计时才可以发送验证码
    if (time.value === 0) {
      userQQBindCode(form.mobile).then(() => {
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
    userQQBindlogin({
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
        text: 'QQ绑定成功'
      })
      router.push(store.state.user.redirectUrl)
    }).catch(() => {
      Message({
        type: 'error',
        text: '绑定失败'
      })
    })
  }
}
</script>

<style scoped lang='less'>
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;

  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }

  p {
    padding-left: 10px;
  }
}

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
