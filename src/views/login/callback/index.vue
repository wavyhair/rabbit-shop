<!--
 * @Author: chenjie
 * @Date: 2022-05-23 19:59:13
 * @LastEditors: chenjie
 * @LastEditTime: 2022-05-26 22:52:55
 * @FilePath: \rabbit-shop\src\views\login\callback\index.vue
 * @Description: 联合登录页面
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
-->
<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a @click="hasAccount = true" :class="{ active: hasAccount }" href="javascript:;">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount = false" :class="{ active: !hasAccount }" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :unionId="unionId" :nickname="nickname" :avatar="avatar" />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch :unionId="unionId" />
    </div>
  </section>
  <LoginFooter />
</template>

<script setup>
import { ref } from 'vue'
import LoginHeader from '../components/login-header'
import LoginFooter from '../components/login-footer'
import CallbackBind from '../components/callback-bind'
import CallbackPatch from '../components/callback-patch'
import QC from 'qc'
import { userQQLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Message from '@/components/library/message'
const hasAccount = ref(true)
const nickname = ref(null)
const avatar = ref(null)
const isBind = ref(true)
const store = useStore()
const unionId = ref(null)
// QC.Login.check() 为 true 说明已经登录
if (QC.Login.check()) {
  // openId qq 唯一标识
  QC.Login.getMe(openId => {
    userQQLogin(openId).then(data => {
      /**
       * 登录成功 res.result 为用户信息
       * 1.存储用户信息
       * 2.跳转到来源也或者首页
       * 3。成功提示
       */
      unionId.value = openId
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
      const router = useRouter()
      router.push(store.state.user.redirectUrl)
      Message({
        type: 'success',
        text: 'QQ登陆成功'
      })
    }).catch(() => {
      // 登录失败说明没有当前 qq 没有和小兔仙绑定过(有账号未绑定QQ,没有账号未绑定QQ)
      isBind.value = false
    })
  })
}

</script>

<style scoped lang='less'>
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;

  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;

    .loading {
      height: 100%;
      background: #fff url('../../../assets/images/load.gif') no-repeat center / 100px 100px;
    }
  }
}

.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;

  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;

    i {
      font-size: 22px;
      vertical-align: middle;
    }

    span {
      vertical-align: middle;
      margin-left: 4px;
    }

    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}

.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
