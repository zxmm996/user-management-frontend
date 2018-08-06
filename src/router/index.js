import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout';
import NotFound from '../components/Layout/NotFound';
import Login from '../components/Login/Login';
import UserPage from '../views/User';
import OrganizationPage from '../views/Organization';
import RolePage from '../views/Role';

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
        },
        {
          path: '/organization',
          component: OrganizationPage,
        },
        {
          path: '/role',
          component: RolePage,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '*',
      component: NotFound,
    }
  ]
})
