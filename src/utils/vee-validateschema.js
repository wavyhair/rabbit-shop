/*
 * @path: src/utils
 * @Autor:jiea
 * @LastEditors: chenjie
 * Date: 2022-05-08 20:56
 * @LastEditTime: 2022-05-27 21:27:31
 * IDE:WebStorm
 * @Description: ...
 */
// 定义校验规则提供给vee-validate组件使用
import { userCheckAccount } from '@/api/user'

export default {
  //  用户名
  account (value) {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) {
      return '用户名为字母开头并且6-20个字符'
    }
    return true
  },
  //  密码
  password (value) {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    return true
  },
  //  手机号
  mobile (value) {
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
    return true
  },
  //  验证码
  code (value) {
    if (!value) return '请输入验证码'
    if (!/^\d{6}$/.test(value)) return '验证码是6个数字'
    return true
  },
  //  用户协议是否勾选
  isAgree (value) {
    if (!value) return '请勾选同意用户协议'
    return true
  },
  // 服务端校验用户名
  async accountApi (value) {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) {
      return '用户名为字母开头并且6-20个字符'
    }
    // 服务端校验
    const { result } = await userCheckAccount(value)
    if (result.valid) return '用户名已经存在'
    return true
  },
  // 重复密码校验
  rePassword (value, { form }) {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    // 校验密码是否一致
    if (value !== form.password) return '两次密码输入不一致'
    return true
  }
}
