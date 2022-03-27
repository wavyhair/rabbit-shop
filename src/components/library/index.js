// 扩展 vue 原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue 2.0 插件写法要素：导出一个对象 有 install 函数，默认传入了 vue 构造函数，vue 基础之上扩展
// vue 3.0 插件写法要素：导出一个对象，有install 函数，默认传入了 app 应用实例， app 基础之上扩展
// import XtxSkeleton from "./xtx-skeleton.vue";
// import XtxCarousel from "./xtx-carousel.vue";
// import XtxMore from "./xtx-more.vue";
// import XtxBread from "./xtx-bread.vue";
// import XtxBreadItem from "./xtx-bread-item.vue";
import defaultImg from "@/assets/images/200.png";

// 批量注册组件流程
/**
 * 使用 `require` 提供的函数  `context` 加载某一个目录下的所有 `.vue` 后缀的文件
 * 然后 `context` 函数会返回一个导入函数 `importFn`
 * 它有一个属性 `keys()` 获取所有文件路径
 * 通过文件路径数组，通过遍历数组，再使用 `importFn` 根据路径导入组件对象
 * 遍历的同时进行全局注册即可
 *
 * context(目录路径、是否加载子目录、加载文件的匹配正则)
 */
 const importFn = require.context('./',false,/\.vue$/)
export default {
  install(app) {
    // 根据 keys 批量注册
    importFn.keys().forEach(path=>{
      // 导入组件 default 是每一个组件
      const component = importFn(path).default
      // 进行注册
      app.component(component.name,component)
    })
    // 在 app 上进行扩展，app 提供 component  directive
    // 如果要挂载原型   app.config.globalProperties.$http 方式
    // app.component(XtxSkeleton.name, XtxSkeleton);
    // app.component(XtxCarousel.name, XtxCarousel);
    // app.component(XtxMore.name, XtxMore);
    // app.component(XtxBread.name, XtxBread);
    // app.component(XtxBreadItem.name, XtxBreadItem);
    // 定义指令
    defineDirective(app);
  }
};
const defineDirective = app => {
  // 原理：先存储图片地址不能在 src 上，当图片进去可视区，将你存储图片地址设置给图片元素即可。
  app.directive("lazy", {
    // vue2.0 监听使用指令的 DOM 是否创建好 钩子函数是:interted
    // vue3.0 的指令拥有的钩子函数和组件的一样 使用指令的 DOM 是否创建好 钩子函数 mounted
    mounted(el, binding) {
      // 创建一个观察对象 来观察当前使用指令的元素
      const obsever = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 进去可视区之后先停止观察
            obsever.unobserve(el);
            // 把指令的值设置给 el 的 src 属性  binding.value 就是指令的值
            // 处理图片加载失败 onerror 图片加载失败的时间  onload 图片加载成功
            el.onerror = () => {
              el.src = defaultImg;
            };
            el.src = binding.value;
          }
        },
        {
          // 相交值
          threshold: 0
        }
      );
      // 开启观察
      obsever.observe(el);
    }
  });
};
