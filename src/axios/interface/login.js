import axios from './../api'

// 登录
const login = data => {
  return axios({
    url: '/login',
    method: 'post',
    data
  });
};

export default {
  login,
};