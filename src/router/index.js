import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../pages/Layout';
import NotFound from '../components/common/NotFound';
import LoginPage from '../pages/login/index.vue';
import UserPage from '../pages/user/index.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      redirect: '/user',
      children: [
        {
          path: '/user',
          component: UserPage,
          meta: { requireAuth: true },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '*',
      component: NotFound,
    }
  ]
})
