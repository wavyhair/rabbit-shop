/*
 * @path: src/api
 * @Autor:jiea
 * @LastEditors: chenjie
 * Date: 2022-05-22 08:35
 * @LastEditTime: 2022-05-27 21:38:35
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
  return request('/login', 'post', {
    account,
    password
  })
}
/**
 * @description: 发送验证码
 * @param {Number} mobile - 手机号
 * @param {Number} code - 验证码 默认 123456
 * @return {Promise}
 */
export const userMobileLoginMsg = mobile => {
  return request('/login/code', 'get', { mobile })
}

/**
 * @description: 验证码登录
 * @param {*} mobile - 手机号
 * @param {*} code - 验证码
 * @return {Promise}
 */
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', {
    mobile,
    code
  })
}

/**
 * @description: qq登录接口
 * @param {String} unionID qq唯一标识 openId
 * @param {Number} source 客户端类型 1 为 pc 端
 * @return {Promise}
 */
export const userQQLogin = (unionID, source = 1) => {
  return request('/login/social', 'post', {
    unionID,
    source
  })
}

/**
 * @description: 获取 qq 绑定的短信验证码
 * @param {*} mobile 手机号
 * @return {Promise}
 */
export const userQQBindCode = mobile => {
  return request('/login/social/code', 'get', { mobile })
}

/**
 * @description: qq登录-绑定账号
 * @param {String} unionId qq 唯一表示 openId
 * @param {Number} mobile 手机号
 * @param {Number} code 验证码
 * @return {Promise}
 */
export const userQQBindlogin = ({ unionId, mobile, code }) => {
  return request('/login/social/bind', 'post', {
    unionId,
    mobile,
    code
  })
}

/**
 * @description: 校验账号是否存在
 * @param account 账号
 * @returns {Promise}
 */
export const userCheckAccount = account => {
  return request('/register/check', 'get', { account })
}

/**
 * 获取QQ完善信息的时候短信验证码
 * @param {String} mobile - 手机号
 * @returns {Promise}
 */
export const userQQPatchCode = (mobile) => {
  return request('/register/code', 'get', { mobile })
}

/**
 * QQ登录-完善信息
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @param {String} account - 帐号
 * @param {String} password - 密码
 * @returns {Promise}
 */
export const userQQPatchLogin = ({ unionId, mobile, code, account, password }) => {
  return request(`/login/social/${unionId}/complement`, 'post', { unionId, mobile, code, account, password })
}
