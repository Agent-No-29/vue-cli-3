import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'

import _ from 'lodash'
import ztree from 'ztree';
import MCustomScrollbar from 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js';

import store from './store/index'
import './utils/filters'
import './utils/directives'
import utils from './utils/util';

import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
import 'ztree/css/zTreeStyle/zTreeStyle.css'
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/reset.css';
import './styles/common.css';

Vue.use(MCustomScrollbar);
Vue.use(ztree);
Vue.use(Element);
Vue.use(_);
Vue.use(utils);

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  next();
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#self-bigapple')
