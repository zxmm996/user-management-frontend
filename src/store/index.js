import Vuex from 'vuex';
import Vue from 'vue'
import { message } from 'ant-design-vue'
import axios from 'axios';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
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
    pageSize: 10,
    total: 0,
    userId: '',
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
      axios.post('http://localhost:3000/login',{
        userName: username,
        password: password,
      })
      .then(function(res){
        const { data } = res;
        if (data.code === 1 && data.result) {
          router.push('/');
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
            userInfo: data.result,
          })
        } else {
          message.error('账号密码错误', 1);
        }
      })
    },
    // 获取机构树
    getOrgList(store) {
      axios.get('http://localhost:3000/getOrgTree')
      .then(function(res){
        const { data } = res;
        if (data.code === 1 && data.result) {
          store.commit('changeState', {
            orgList: data.result,
          })
        }
      });
    },
    addOrg(store, { orgName }) {
      axios.post('http://localhost:3000/addOrganization', {
        orgName,
        orgType: '1',
        level: store.state.level,
        pId: store.state.orgId,
      })
      .then(function(res){
        const { data } = res;
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
      axios.get('http://localhost:3000/getOrgInfoById', {
        params: {
          orgId,
        },
      }).then(res => {
        const { data } = res;

        if (data.code === 1 && data.result) {
          store.commit('changeState', {
            orgName: data.result.orgName,
            visible: true,
          })
        }
      })
    },
    updateOrg(store, { orgName }) {
      axios.post('http://localhost:3000/updateOrganization', {
        orgName,
        orgId: store.state.orgId,
      })
      .then(function(res){
        const { data } = res;
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
      axios.get('http://localhost:3000/deleteOrganization', {
        params: {
          orgId,
        },
      }).then(res => {
        const { data } = res;
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
    getUserList(store) {
      axios.get('http://localhost:3000/getUserListByPage', {
        params: {
          orgId: store.state.orgId,
          page: store.state.page,
          pageSize: store.state.pageSize,
        }
      }).then((res) => {
        const { data } = res;
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
      axios.post('http://localhost:3000/addUser', {
        userName,
        userGender,
        userBirthday,
        userNum,
        userPwd,
        userOrgId,
        userPhoneNum,
      }).then(res => {
        const { data } =res;
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
      axios.get('http://localhost:3000/getUserInfoById', {
        params: {
          userId,
        },
      }).then(res => {
        const { data } = res;
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
      axios.post('http://localhost:3000/updateUser', {
        userId: store.state.userId,
        userName,
        userGender,
        userBirthday,
        userNum,
        userPwd,
        userOrgId,
        userPhoneNum,
    }).then(function(res){
        const { data } = res;
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
    // 删除用户
    deleteUser(store, { userId }) {
      axios.get('http://localhost:3000/deleteUser', {
        params: {
          userId,
        },
      }).then(res => {
        const { data } = res;
        if (data.code === 1 && data.result) {
          message.success('删除成功', 1);
          store.dispatch('getUserList');
        } else {
          message.error('删除失败', 1);
        }
      })
    },
  },
});
export default store;
