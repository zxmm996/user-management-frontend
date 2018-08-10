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
  },
  mutations: {
    changeState(state, payload) {
      state[payload.type] = payload.value;
    },
    addOrg(state, payload) {
      state.visible = true;
      state.type = 'add';
      state.orgName = '';
      state.orgId = payload.orgId;
    },
    editOrg() {
      state.visible = true;
      state.type = 'edit';
      state.orgId = payload.orgId;
    },
    deleteOrg() {
      state.orgId = payload.orgId;
    },
    getOrgInfoSuccess(state, { orgName }) {
      state.orgName = orgName;
      state.visible = true;
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
            type: 'userInfo',
            value: data.result,
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
        console.log('data=', data);
        if (data.code === 1 && data.result) {
          store.commit('changeState', {
            type: 'orgList',
            value: data.result,
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
          type: 'visible',
          value: false,
        })
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
        type: 'orgId',
        value: orgId,
      });
      store.commit('changeState', {
        type: 'type',
        value: 'edit',
      });
      axios.get('http://localhost:3000/getOrgInfoById', {
        params: {
          orgId,
        },
      }).then(res => {
        const { data } = res;

        if (data.code === 1 && data.result) {
          store.commit('getOrgInfoSuccess', {
            orgName: data.result.orgName,
          })
        }
      })
    },
    editOrg(store, { orgName }) {
      axios.post('http://localhost:3000/updateOrganization', {
        orgName,
        orgId: store.state.orgId,
      })
      .then(function(res){
        const { data } = res;
        store.commit('changeState', {
          type: 'visible',
          value: false,
        })
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
    }
  },
});
export default store;
