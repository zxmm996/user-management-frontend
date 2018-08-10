<template>
  <a-layout>
      <a-layout-sider class="sider">
        <org-tree :treeList="orgList" @addOrg="addOrg" @editOrg="editOrg" @deleteOrg="deleteOrg" ></org-tree>
        <org-modal
          :type="type"
          :visible="visible"
          :orgName="orgName"
          @setModalVisible="setModalVisibleHandler"
          @confirm="confirmHandler"
        />
      </a-layout-sider>
      <a-layout-content class="content">Content</a-layout-content>
    </a-layout>
</template>
<script>
import Vue from 'vue';
import { Layout } from 'ant-design-vue';
import OrgTree from '../components/Organization/OrgTree';
import OrgModal from '../components/Organization/OpreatOrgModal';

Vue.component(Layout.name, Layout);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Layout.Content.name, Layout.Content);

export default {
  components: {
    OrgTree,
    OrgModal,
  },
  computed: {
    orgList() {
      return this.$store.state.orgList;
    },
    type() {
      return this.$store.state.type;
    },
    visible() {
      return this.$store.state.visible;
    },
    orgName() {
      return this.$store.state.orgName;
    },
  },
  methods: {
    addOrg(orgId, level) {
      this.$store.commit('addOrg', {
        orgId,
        level,
      });
    },
    editOrg(orgId) {
      this.$store.dispatch('getOrgInfo', {
        orgId,
      });
    },
    deleteOrg(orgId) {
      this.$store.dispatch('deleteOrg', {
        orgId,
      });
    },
    setModalVisibleHandler(value) {
      this.$store.commit('changeState', {
        type: 'visible',
        value,
      })
    },
    confirmHandler(name) {
      if (this.type === 'add') {
        this.$store.dispatch('addOrg', {
          orgName: name,
        })
      } else {
        this.$store.dispatch('editOrg', {
          orgName: name,
        })
      }
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

