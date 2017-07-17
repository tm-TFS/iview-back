import axios from './api_config'
import router from '../main';
//post 请求
function fetchPost(url, params = {}) {
  //请求加载
  let token = getCookie('token'); //h5 的浏览器缓存
  if (token) {
    params.token = token;
  }
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      params: params
    }).then((response) => {

      //未登录 或者 登录过期
      /*if (response.status === 401) {
        clearCookie('token');
        window.location.pathname = '/login';
        reject(response.data.msg);
        return;
      }*/
      console.log('返回数据 === ');
      console.log(response);

      if(response.data.status !== 1){
        reject(response.data.msg);
        return;
      }


      if(response.data.token){
        setCookie('token',response.data.token);
      }

      resolve(response.data.content);
    })
  })
}

function fetchGet(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(res => {
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

function clearCookie(name) {
  window.localStorage.removeItem(name);
}

function setCookie(name, value) {
  window.localStorage.setItem(name, value);
}

function getCookie(name) {
  //获取缓存时，判断是否登录
  if(name === 'customerInfo' && !window.localStorage.getItem(name)){
    router.replace({
      path: '/login',
      params: {redirect: router.currentRoute.fullPath}
    })
  }
  return window.localStorage.getItem(name);
}

const path = {
  login: 'common/login',
  getServerList: 'common/getServerList',
  getRateList: 'order/getRateList',
  getRateDetail: 'order/getRateDetail',
  getCustomerList: 'Customer/getCustomerList',
  getCustomerDetail: 'Customer/getCustomerDetail',
  getSettlementList: 'Settlement/getSettlementList',
};

export default {
  fetchPost,
  fetchGet,
  clearCookie,
  setCookie,
  getCookie,
  path
}
