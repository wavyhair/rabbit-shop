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
/**
 * 获取热榜商品
 * @param {String} id 商品 id
 * @param {Number} limit 获取条数
 * @param {Number} type 1 代表 24 小时热榜 2 代表周热销榜 3 代表总热销榜
 * @returns {*|AxiosPromise}
 */
export const findHotGoods=(id,type,limit=3)=>{
  return request('/goods/hot','get',{id,type,limit})
}

