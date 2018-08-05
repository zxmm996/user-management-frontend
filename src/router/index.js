import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout';
import Login from '../views/Login';
import HomePage from '../views/HomePage';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: Layout,
      children: [
        {
          path: '',
          component: HomePage,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ]
})
