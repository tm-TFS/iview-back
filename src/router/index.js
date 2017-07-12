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

import Home from '@/components/order/Home';
import rateDetail from '@/components/order/RateDetail';
import Order from '@/components/order/Order';
import User from '@/components/user/User';
import Login from '@/components/Login';

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
    path: '/home/detail/:id',
    name: 'rateDetail',
    component: rateDetail
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];
export default routers;
