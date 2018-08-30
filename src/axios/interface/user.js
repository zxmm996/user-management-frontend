import axios from './../api'

// 分页获取人员
const getUserList = params => {
  return axios({
    url: '/getUserListByPage',
    method: 'get',
    params
  });
};

// 新增人员
const addUser = data => {
  return axios({
    url: '/addUser',
    method: 'post',
    data,
  });
};

// 获取用户信息
const getUserInfo = params => {
  return axios({
    url: '/getUserInfoById',
    method: 'get',
    params,
  });
};

// 更新用户信息
const updateUser = data => {
  return axios({
    url: '/updateUser',
    method: 'post',
    data,
  });
};

// 删除用户（单个）
const deleteUser = params => {
  return axios({
    url: '/deleteUser',
    method: 'get',
    params,
  });
};

// 删除用户（多个）
const deleteUsers = params => {
  return axios({
    url: '/deleteUsers',
    method: 'get',
    params,
  });
};

export default {
  getUserList,
  addUser,
  getUserInfo,
  updateUser,
  deleteUser,
  deleteUsers,
};

