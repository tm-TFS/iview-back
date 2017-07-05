import axios from 'axios'
// settings
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://192.168.1.3';

export function clearCookie(name) {
  window.localStorage.removeItem(name);
}

export function setCookie(name, value) {
  window.localStorage.setItem(name, value);
}

export function getCookie(name) {
  window.localStorage.getItem(name);
}

//post 请求
export function fetchPost (url, params = {}) {
  let token = getCookie('token'); //h5 的浏览器缓存
  if(token){
    params.token = token;
  }
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      if (res.status === 401) {
        clearCookie('token');
        window.location.pathname = '/login'
      }
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export function fetchGet (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(res => {
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}
export default {
  fetchPost,
  fetchGet,
  clearCookie,
  setCookie
}
