/*
 * @Author: jiea
 * @Date: 2022-05-01 12:45:53
 * @LastEditors: jiea
 * @LastEditTime: 2022-05-01 22:55:59
 * @Description: 商品信息接口
 */

import request from '@/utils/request'

/**
 * 获取商品同类推荐 未传入 id 为猜你喜欢
 * @param {String} id 商品 id
 * @param {Number} limit 获取条数
 * @returns {*|AxiosPromise}
 */
export const findRelGoods = (id, limit = 16) => {
  return request('/goods/relevant', 'get', { id, limit })
}
/**
 * 获取热榜商品
 * @param {String} id 商品 id
 * @param {Number} limit 获取条数
 * @param {Number} type 1 代表 24 小时热榜 2 代表周热销榜 3 代表总热销榜
 * @returns {*|AxiosPromise}
 */
export const findHotGoods = (id, type, limit = 3) => {
  return request('/goods/hot', 'get', { id, type, limit })
}

/**
 * 获取商品的评价统计信息
 * @param id 商品 id
 * @returns {*}
 */
export const findCommentInfoByGoods = (id) => {
  // return request(`/goods/${id}/evaluate`)
//  axios 遇见 http https 开头的地址 不会加上基准地址
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

/**
 *
 * @param id 商品 id
 * @param params 评论选项
 * @returns {*}
 */
export const findGoodsCommentList = (id, params) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}
