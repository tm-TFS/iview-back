import axios from './api_config'
import iview from 'iview';

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

      console.log('response == ' + JSON.stringify(response));
      //未登录 或者 登录过期
      if (response.data.status === 401) {
        clearCookie('token');
        window.location.pathname = '/login';
        reject(response.data.msg);
        return;
      }
      if(response.data.status !== 1){
        reject(response.data.msg);
        return;
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
  window.localStorage.getItem(name);
}

export default {
  fetchPost,
  fetchGet,
  clearCookie,
  setCookie,
  getCookie
}
