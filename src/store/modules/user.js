/*
 * @Author: chenjie
 * @Date: 2022-05-02 15:55:59
 * @LastEditors: chenjie
 * @LastEditTime: 2022-05-25 20:09:19
 * @FilePath: \rabbit-shop\src\store\modules\user.js
 * @Description:
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
// 用户信息模块
export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      },
      // 登录后回调的路径
      redirectUrl: '/'
    }
  },
  mutations: {
    // 修改用户信息
    setUser (state, payload) {
      state.profile = payload
    },
    // 修改回调地址
    setRedirectUrl (state, url) {
      state.redirectUrl = url
    }
  }
}
