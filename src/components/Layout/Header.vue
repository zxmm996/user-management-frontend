<template>
  <div class="header">
      <div class="header-content">
        <div>
          <img src="../../assets/logo.png" alt="">
          <span>{{title}}</span>
        </div>
        <div class="avatar">
          <a-avatar size="large" style="backgroundColor:#87d068" icon="user" />
          <a-dropdown>
            <a class="ant-dropdown-link" href="#">
              管理员<a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">退出登录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Avatar, Menu, Dropdown } from 'ant-design-vue';

Vue.component(Avatar.name, Avatar);
Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Dropdown.name, Dropdown);

export default {
  data() {
    return {
      title: "User Management"
    }
  }
}
</script>
<style lang="less" scoped>
 .header {
    height: 80px;
    line-height: 80px;
    background: #fff;

    .header-content {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        width: 60px;
        height: auto;;
        margin-left: 60px;
      }
      span {
        font-size: 20px;
        font-weight: bold;
        margin-left: 20px;
      }
      
      .avatar {
        display: flex;
        align-items: center;
      }
    }
  }
</style>


