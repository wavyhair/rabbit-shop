/*
 * @Description: file content
 * @path: src\api\goods.js
 * @Autor:jie
 * @LastEditors: jie
 * @Time: 2022-04-23 20:25:51
 */
import request from "@/utils/request";

/**
 * 获取商品同类推荐 未传入 id 为猜你喜欢
 * @param {String} id 商品 id
 * @param {Number} limit 获取条数
 * @returns {*|AxiosPromise}
 */
export const findRelGoods=(id,limit=16)=>{
  return request('/goods/relevant','get',{id,limit})
}
