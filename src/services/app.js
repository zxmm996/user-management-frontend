import request from '../utils/request.js';
import { baseUrl } from '../utils/config.js';

// 登录
export function login(params) {
  return request.post(`${baseUrl}/login`, params);
}

// 获取组织机构树
export function getOrgTree() {
  return request.get(`${baseUrl}/getOrgTree`);
}

// 获取人员
export function getUserList(params) {
  return request.get(`${baseUrl}/getUserListByPage`, params);
}