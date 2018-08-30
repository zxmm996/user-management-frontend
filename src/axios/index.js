import apiLogin from './interface/login'
import apiOrganization from './interface/organization'
import apiUser from './interface/user'

const install = Vue => {
  if (install.installed)
    return;
  install.installed = true;

  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        // PS: 这里没有区分命名空间
        return Object.assign({},
          apiLogin,
          apiOrganization,
          apiUser,
        )
        // 如果需要区分命令空间的话可以参考以下写法
        // {
        //      apiLogin,
        //      apiOrganization,
        //      apiUser,
        // }
      }
    }
  })
}

export default install
