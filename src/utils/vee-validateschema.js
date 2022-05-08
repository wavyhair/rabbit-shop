/*
 * @path: src/utils
 * @Autor:jiea
 * @LastEditors: Huhuuuu
 * Date: 2022-05-08 20:56
 * @LastEditTime: 2022-05-08 20:56
 * IDE:WebStorm
 * @Description: ...
 */
// 定义校验规则提供给vee-validate组件使用
export default {
  //  用户名
  account (value) {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '用户名为字母开头并且6-20个字符'
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
  }
}
