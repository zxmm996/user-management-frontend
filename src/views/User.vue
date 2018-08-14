<template>
  <a-layout>
      <a-layout-sider class="sider">
        <org-tree
          :treeList="orgList"
          @addOrg="addOrg"
          @editOrg="editOrg"
          @deleteOrg="deleteOrg"
          @getUserList="getUserList"
        />
        <org-modal
          v-if="visible"
          :type="type"
          :visible="visible"
          :orgName="orgName"
          @cancel="cancelHandler"
          @confirm="confirmHandler"
        />
      </a-layout-sider>
      <a-layout-content class="content">
        <div class="btns clearfix">
          <a-button
            type="danger"
            :disabled="selectedUsers.length === 0"
            class="deleteBtn"
            @click="deleteUsers"
          >
            删除用户
          </a-button>
          <a-button
            type="primary"
            class="addBtn"
            @click="addUserClick"
          >
            添加用户
          </a-button>
        </div>
        <user-list
          :userList="userList"
          :page="page"
          :pageSize="pageSize"
          :total="total"
          :selectedUsers="selectedUsers"
          @changePage="changePageHandler"
          @editUser="editUser"
          @deleteUser="deleteUser"
          @onChangeSelect="onChangeSelect"
        />
        <user-modal
          v-if="userModalVisible"
          :treeList="orgList"
          :type="type"
          :visible="userModalVisible"
          :userInfo="userInfo"
          @userModalConfirm="userModalConfirmHandler"
          @userModalCancel="userModalCancelHandler"
        />
      </a-layout-content>
    </a-layout>
</template>
<script>
import Vue from 'vue';
import { Layout, Button } from 'ant-design-vue';
import OrgTree from '../components/User/OrgTree';
import OrgModal from '../components/User/OpreatOrgModal';
import UserList from '../components/User/UserList';
import UserModal from '../components/User/UserModal';

Vue.component(Layout.name, Layout);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Button.name, Button);

export default {
  components: {
    OrgTree,
    OrgModal,
    UserList,
    UserModal,
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
    userList() {
      return this.$store.state.userList;
    },
    userModalVisible() {
      return this.$store.state.userModalVisible;
    },
    page() {
      return this.$store.state.page;
    },
    pageSize() {
      return this.$store.state.pageSize;
    },
    total() {
      return this.$store.state.total;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    selectedUsers() {
      return this.$store.state.selectedUsers;
    }
  },
  methods: {
    // 添加机构
    addOrg(orgId, level) {
      this.$store.commit('changeState', {
        visible: true,
        type: 'add',
        orgName: '',
        orgId,
        level,
      });
    },
    // 修改机构
    editOrg(orgId) {
      this.$store.dispatch('getOrgInfo', {
        orgId,
      });
    },
    // 删除机构
    deleteOrg(orgId) {
      this.$store.dispatch('deleteOrg', {
        orgId,
      });
    },
    // 机构弹窗取消
    cancelHandler() {
      this.$store.commit('changeState', {
        visible: false,
      })
    },
    // 机构弹窗确认
    confirmHandler(name) {
      if (this.type === 'add') {
        this.$store.dispatch('addOrg', {
          orgName: name,
        })
      } else {
        this.$store.dispatch('updateOrg', {
          orgName: name,
        })
      }
    },
    // 点击添加用户按钮
    addUserClick() {
      this.$store.commit('changeState', {
        userModalVisible: true,
        type: 'add',
      });
    },
    // 用户弹窗确认
    userModalConfirmHandler(values) {
      if (this.type === 'add') {
        this.$store.dispatch('addUser', values);
      } else {
        this.$store.dispatch('updateUser', values);
      }
    },
    // 用户弹窗取消
    userModalCancelHandler() {
      this.$store.commit('changeState', {
        userModalVisible: false,
      })
    },
    // 分页
    changePageHandler(pageNum) {
      this.$store.commit('changeState', {
        page: pageNum,
        selectedUsers: [],
      });
      this.$store.dispatch('getUserList');
    },
    // 点击编辑用户按钮
    editUser(userId) {
      this.$store.dispatch('getUserInfo', {
        userId,
      });
    },
    // 删除单个用户
    deleteUser(userId) {
      this.$store.dispatch('deleteUser', {
        userId,
      });
    },
    // 获取用户列表
    getUserList(orgId) {
      this.$store.commit('changeState', {
        page: 1,
        orgId,
      });
      this.$store.dispatch('getUserList');
    },
    // 复选用户
    onChangeSelect(selectedRows) {
       this.$store.commit('changeState', {
        selectedUsers: selectedRows.map(item => item._id),
      });
    },
    // 复选人员删除
    deleteUsers() {
      this.$store.dispatch('deleteUsers');
    },
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
  .sider {
    flex: none!important;
    max-width: 300px!important;
    width: 300px!important;
  }
  .content {
    padding: 0 10px;

    .btns {
      margin-bottom: 10px;

      .addBtn {
        float: right;
        margin-right: 10px;
      }
      .deleteBtn {
        float: right;
      }
    }
  }
  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }
</style>

