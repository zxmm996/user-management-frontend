<template>
  <a-layout>
      <a-layout-sider class="sider">
        <org-tree :treeList="orgList"></org-tree>
      </a-layout-sider>
      <a-layout-content class="content">Content</a-layout-content>
    </a-layout>
</template>
<script>
import Vue from 'vue';
import { Layout } from 'ant-design-vue';
import OrgTree from '../components/Organization/OrgTree';

Vue.component(Layout.name, Layout);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Layout.Content.name, Layout.Content);

export default {
  components: {
    OrgTree,
  },
  computed: {
    orgList() {
      return this.$store.state.orgList;
    }
  },
  created() {
    this.$store.dispatch('getOrgList');
  }
}
</script>
<style lang="less" scoped>
  .sider, .content {
    min-height: 400px;
    background: #fff;
  }
</style>

