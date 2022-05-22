import request from '@/utils/request'

/**
 *
 * @param {String} id - 商品 id
 * @returns
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}
