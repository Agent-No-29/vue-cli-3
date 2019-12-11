import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login.vue'),
      beforeEnter:(to,from,next) => {
        sessionStorage.clear();
        next();
      }
    },
    {
      path: '/',
      name: 'site-frame',
      component:  () => import(/* webpackChunkName: "site-frame" */ './views/site-frame.vue'),
      children: [
        /*demo*/
        {
          path: '/page-one',
          name: 'page-one',
          component:()=>import(/*webpackChunkName: "page-one" */'./views/page-one/index.vue'),
        },
        /*antv-g6-demo*/
        {
          path: '/tool-demo/antv-g6-demo',
          name: 'antv-g6-demo',
          component:()=>import(/*webpackChunkName: "antv-g6-demo" */'./views/tool-demo/antv-g6-demo.vue'),
        },
        /*vue-demo*/
        {
          path: '/vue-demo',
          name: 'vue-demo',
          component:()=>import(/*webpackChunkName: "vue-demo" */'./views/vue-demo/index.vue'),
        },
        {
          path: '/',
          name: 'null',
        },
        /*默认路由页*/
        {
          path: '*',
          name: 'comming-soon',
          component:()=>import(/*webpackChunkName: "comming-soon" */'./components/comming-soon.vue'),
        },
      ]
    }
  ]
})
