import axios from './../api'

// 登录
const login = data => {
  return axios({
    url: '/login',
    method: 'post',
    data
  });
};

// 退出
const logout = params => {
  return axios({
    url: '/logout',
    method: 'get',
  });
};

export default {
  login,
  logout,
};