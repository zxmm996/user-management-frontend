<template>
  <div class="container">
    <ul class="menus clearfix">
      <li :class="activeMenu === 'user' ? 'active' : ''" @click="changeMenu('user')">user</li>
      <li :class="activeMenu === 'organization' ? 'active' : ''" @click="changeMenu('organization')">organization</li>
      <li :class="activeMenu === 'role' ? 'active' : ''" @click="changeMenu('role')">role</li>
    </ul>
  </div>
</template>
<script>
import Vue from 'vue';
import { Menu } from 'ant-design-vue';

Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);

export default {
  data() {
    return {
      activeMenu: 'user'
    }
  },
  methods: {
    changeMenu(menu) {
      this.activeMenu = menu;
      this.$router.push(`/${menu}`);
    }
  }
}
</script>
<style lang="less" scoped>
  .clearfix:after {
    display: block;
    clear: both;
    zoom: 1;
  }
  .container {
    background-color: #40a9ff;

    ul {
      list-style: none;
      width: 1200px;
      margin: 0 auto;

      li {
        float: left;
        height: 40px;
        line-height: 40px;
        padding: 0 40px;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
      }
      .active {
        background: #1886e0
      }
    }
  }
</style>


