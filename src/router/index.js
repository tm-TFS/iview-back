/*
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
*/

import Home from '@/components/Home';

const routers = [{
  path: '/',
  meta: {
    title: ''
  },
  component: Home
}];
export default routers;
