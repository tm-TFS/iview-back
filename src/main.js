// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(VueRouter);



// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
