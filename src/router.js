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
