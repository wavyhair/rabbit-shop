// 存储的分类数据
import { topCategory } from "@/api/constants";
import { findAllCategory } from "@/api/category";
// 分类模块
export default {
  namespaced: true,
  state: () => {
    return {
      // 分类信息集合
      // 如果是默认空数组的话，会看不见默认的 9 个分类，等数据加载完毕才会看到
      // 所以根据常量数据来生成一个默认的顶级分类数据，不会出现空白（没数据的情况）
      list: topCategory.map(item => ({ name: item }))
    };
  },
  mutations: {
    //设置分类
    setCategory(state, headCategory) {
      state.list = headCategory;
    },
    // 修改当前一级分类下的 open 数据为 true
    show(state, item) {
      const category = state.list.find(category => category.id === item.id);
      category.open = true;
    },
    // 修改当前一级分类下的 open 数据为 false
    hide(state, item) {
      const category = state.list.find(category => category.id === item.id);
      category.open = false;
    }
  },
  // 需要向后台加载数据，所以需要actions函数获取数据
  actions: {
    async getCategory({ commit }) {
      const { result } = await findAllCategory();
      // 给一级分类加上一个控制二级分类显示隐藏的数据 open
      result.forEach(item => {
        item.open = false;
      });
      // 获取数据成功，提交mutations进行数据修改
      commit("setCategory", result);
    }
  }
};
