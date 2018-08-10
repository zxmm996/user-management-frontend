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
  },
  mutations: {
    changeState(state, payload) {
      state[payload.type] = payload.value;
    }
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
  },
});
export default store;
