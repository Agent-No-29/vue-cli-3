import Vue from 'vue'
import store from '../store'

/**
 * 输入框获取焦点指令
 */
Vue.directive('focus', {
  //只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  bind(el, binding, vnode, oldVnode) {

  },
  //被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  inserted(el, binding, vnode, oldVnode) {
    el.focus();
  },
  //所在组件的 VNode 更新时调用
  update(el, binding, vnode, oldVnode) {

  },
  //指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  componentUpdated(el, binding, vnode, oldVnode) {

  },
  //只调用一次，指令与元素解绑时调用。
  unbind(el, binding, vnode, oldVnode) {

  }
})

/**
 *滚动条
 */
Vue.directive('scroll', {
  inserted: function (el, binding) {
    $(el).mCustomScrollbar({
      theme: "minimal-dark",
      axis: "yx",
      scrollButtons: {
        enable: true,
      },
      mouseWheel: {
        preventDefault: true
      },
      alwaysTriggerOffsets: false
    });
  }
})

/**
 *按钮权限验证指令
 */
Vue.directive('permission', {
  inserted:function(el, binding) {
    var perms = store.getters.perms;
    if (!perms['"' + binding.value + '"'] && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
});
