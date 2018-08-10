<template>
  <div>
    org
  </div>
</template>
<script>
import Vue from 'vue';
import { Menu } from 'ant-design-vue';

Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Menu.SubMenu.name, Menu.SubMenu);
export default {
  props: {
    treeList: {
      type: Array,
      required: true,
    }
  },
  created() {
    this.$store.dispatch('getOrgList');
  },
}
</script>
<style lang="less" scoped>

</style>


