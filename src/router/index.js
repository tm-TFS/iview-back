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
import User from '@/components/User';
import Order from '@/components/Order';

const routers = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/user',
    name: 'user',
    component: User
  }
];
export default routers;
