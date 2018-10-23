import axios from './../request'

// 获取组织机构树
const getOrgTree = params => {
  return axios({
    url: '/getOrgTree',
    method: 'get',
    params,
  });
};

// 新增组织机构
const addOrg = data => {
	return axios({
		url: '/addOrganization',
		method: 'post',
		data,
	});
};

// 获取机构信息
const getOrgInfo = params => {
  return axios({
    url: '/getOrgInfoById',
    method: 'get',
    params,
  });
};

// 更新组织机构
const updateOrg = data => {
	return axios({
		url: '/updateOrganization',
		method: 'post',
		data,
	});
};

// 删除组织机构
const deleteOrg = params => {
  return axios({
    url: '/deleteOrganization',
    method: 'get',
    params,
  });
};

export default {
  getOrgTree,
  addOrg,
  getOrgInfo,
  updateOrg,
  deleteOrg,
};
