/*
 * @Author: chenjie
 * @Date: 2022-05-02 15:55:59
 * @LastEditors: chenjie
 * @LastEditTime: 2022-05-22 16:57:48
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
      }
    }
  },
  mutations: {
    // 修改用户信息
    setUser (state, payload) {
      state.profile = payload
    }
  }
}
