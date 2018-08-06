import Vuex from 'vuex';
import Vue from 'vue'
import { message } from 'ant-design-vue'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: null,
    isLogin: false,
    isRemember: false,
  },
  mutations: {
  },
  actions: {
    login(store, { username, password, remember, router}) {
      if (username === 'admin' && password === 'admin') {
        router.push('/home');
        if (remember) {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          localStorage.setItem('remember', '1');
        } else {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
          localStorage.removeItem('remember');
        }
      } else {
        message.error('用户名密码错误', 1);
      }
    }
  },
});
export default store;
