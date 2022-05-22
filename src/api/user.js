/*
 * @path: src/api
 * @Autor:jiea
 * @LastEditors: chenjie
 * Date: 2022-05-22 08:35
 * @LastEditTime: 2022-05-22 16:25:21
 * IDE:WebStorm
 * @Description: ...
 */
import request from '@/utils/request'

/**
 * 短信登录
 * @param {String} account - 用户名
 * @param {String} password - 密码
 * @returns {Promise}
 */
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}
/**
 * @description: 发送验证码
 * @param {Number} mobile - 手机号
 * @param {Number} code - 验证码 默认 123456
 * @return {Promise}
 */
export const userMobileLoginMsg = (mobile) => {
  return request('/login/code', 'get', { mobile })
}

/**
 * @description: 验证码登录
 * @param {*} mobile - 手机号
 * @param {*} code - 验证码
 * @return {Promise}
 */
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', { mobile, code })
}
