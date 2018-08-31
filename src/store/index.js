import Vuex from 'vuex';
import Vue from 'vue';
import { message } from 'ant-design-vue';
import axios from 'axios';
import config from '../utils/config.js';
import {
  login,      // 登录
  getOrgTree, // 获取机构树
  getUserList,    // 获取人员
} from '../services/app.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loginUserInfo: null,
    // 网络状态 true-正常 false-断网
    networkStatus: true,
    userInfo: null,
    isLogin: false,
    isRemember: false,
    orgList: [],
    type: 'add',
    visible: false,
    orgId: '',
    orgName: '',
    level: 0,
    userList: [],
    userModalVisible: false,
    page: 1,
    pageSize: 5,
    total: 0,
    userId: '',
    // 复选的用户
    selectedUsers: [],
  },
  mutations: {
    // 改变state
    changeState(state, payload) {
      for (var key in payload) {
        state[key] = payload[key];
      }
    },
  },
  actions: {
    login(store, { username, password, remember, router}) {
      this._vm.$http.login({
        userName: username,
        password: password,
      })
      .then(function(data){
        if (data.code === 1 && data.result) {
          const redirect = router.currentRoute.query.redirect;
          if (redirect) {
            router.push(redirect);
          } else {
            router.push('/');
          }
          if (remember) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('remember', '1');
          } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            localStorage.removeItem('remember');
          }
          store.commit('changeState', {
            loginUserInfo: data.result,
          })
          localStorage.setItem('userInfo', data.result);
        } else {
          message.error('账号密码错误', 1);
        }
      })
    },
    // 获取机构树
    getOrgList(store) {
      this._vm.$http.getOrgTree()
      .then(function(data){
        if (data.code === 1 && data.result) {
          store.commit('changeState', {
            orgList: data.result,
          })
        }
      });
    },
    addOrg(store, { orgName }) {
      this._vm.$http.addOrg({
        orgName,
        orgType: '1',
        level: store.state.level,
        pId: store.state.orgId,
      }).then(function(data){
        store.commit('changeState', {
          visible: false,
        });
        if (data.code === 1 && data.result) {
          message.success('添加成功', 1);
          store.dispatch('getOrgList');
        } else {
          message.error('添加失败', 1);
        }
      });
    },
    getOrgInfo(store, { orgId }) {
      store.commit('changeState', {
        orgId,
        type: 'edit',
      });
      this._vm.$http.getOrgInfo({
        orgId,
      }).then(data => {
        if (data.code === 1 && data.result) {
          store.commit('changeState', {
            orgName: data.result.orgName,
            visible: true,
          })
        }
      })
    },
    updateOrg(store, { orgName }) {
      this._vm.$http.updateOrg({
        orgName,
        orgId: store.state.orgId,
      })
      .then(function(data){
        store.commit('changeState', {
          visible: false,
        });
        if (data.code === 1 && data.result) {
          message.success('修改成功', 1);
          store.dispatch('getOrgList');
        } else {
          message.error('修改失败', 1);
        }
      });
    },
    // 删除机构
    deleteOrg(store, { orgId }) {
      this._vm.$http.deleteOrg({
        orgId,
      }).then(data => {
        if (data.code === 1 && data.result) {
          message.success('删除成功', 1);
          store.dispatch('getOrgList');
        } else if (data.result === false) {
          message.error('该机构下有子机构，不可删除', 1);
        } else {
          message.error('删除失败', 1);
        }
      })
    },
    // 获取用户
    getUserList(store) {
     this._vm.$http.getUserList({
        orgId: store.state.orgId,
        page: store.state.page,
        pageSize: store.state.pageSize,
      }).then((data) => {
        let result = [];
        let total = 0;
        if (data.code == 1 && data.result && data.result.length > 0) {
          result = data.result;
          total = data.total;
        }
        store.commit('changeState', {
          userList: result,
          total: total,
        })
      })
    },
    // 添加用户
    addUser(store, payload) {
      const {
        userName,
        userGender,
        userBirthday,
        userNum,
        userPwd,
        userOrgId,
        userPhoneNum,
      } = payload;
      this._vm.$http.addUser({
        userName,
        userGender,
        userBirthday,
        userNum,
        userPwd,
        userOrgId,
        userPhoneNum,
      }).then(data => {
        if (data.code === 1 && data.result) {
          message.success('添加用户成功', 1);
          store.commit('changeState', {
            userModalVisible: false,
          })
          store.dispatch('getUserList');
        } else {
          message.error('添加用户失败', 1);
        }
      })
    },
    // 获取用户信息
    getUserInfo(store, { userId }) {
      store.commit('changeState', {
        userId,
        type: 'edit',
      });
      this._vm.$http.getUserInfo({
        userId,
      }).then(data => {
        if (data.code === 1 && data.result) {
          store.commit('changeState', {
            userInfo: data.result,
            userModalVisible: true,
          })
        }
      })
    },
    // 修改用户
    updateUser(store, payload) {
      const {
        userName,
        userGender,
        userBirthday,
        userNum,
        userPwd,
        userOrgId,
        userPhoneNum,
      } = payload;
      this._vm.$http.updateUser({
        userId: store.state.userId,
        userName,
        userGender,
        userBirthday,
        userNum,
        userPwd,
        userOrgId,
        userPhoneNum,
    }).then(function(data){
        store.commit('changeState', {
          userModalVisible: false,
        });
        if (data.code === 1 && data.result) {
          message.success('修改成功', 1);
          store.dispatch('getUserList');
        } else {
          message.error('修改失败', 1);
        }
      });
    },
    // 删除单个用户
    deleteUser(store, { userId }) {
      this._vm.$http.deleteUser({
        userId,
      }).then(data => {
        if (data.code === 1 && data.result) {
          message.success('删除成功', 1);
          store.dispatch('getUserList');
        } else {
          message.error('删除失败', 1);
        }
      })
    },
    // 复选人员删除
    deleteUsers(store) {
      const selectedUsers = store.state.selectedUsers;
      this._vm.$http.deleteUsers({
        userIds: selectedUsers.join(';'),
      }).then(data => {
        if (data.code === 1 && data.result) {
          message.success('删除成功', 1);
          store.dispatch('getUserList');
          store.commit('changeState', {
            selectedUsers: [],
          });
        } else {
          message.error('删除失败', 1);
        }
      })
    }
  },
});
export default store;
