<template>
  <a-table
    :columns="columns"
    :rowKey="(record, index) => index"
    :dataSource="userList"
    :pagination="{
      current: page,
      pageSize: pageSize,
      onChange: onChangePage,
      total: total,
    }"
  >
    <span slot="order" slot-scope="text, record, index">
      {{pageSize * (page - 1) + index + 1}}
    </span>
    <span slot="operate" slot-scope="text, record">
      <a-icon type="edit" class="edit" @click="() => editUser(record._id)"></a-icon>
      <a-icon type="delete" class="delete" @click="() => deleteUser(record._id)"></a-icon>
    </span>
  </a-table>
</template>
<script>
import Vue from 'vue';
import { Table, Icon, Modal } from 'ant-design-vue';

Vue.component(Table.name, Table);
Vue.component(Icon.name, Icon);
const columns =[{
    title: '序号',
    dataIndex: 'order',
    scopedSlots: { customRender: 'order' },
  }, {
    title: '姓名',
    dataIndex: 'userName',
  }, {
    title: '编号',
    dataIndex: 'userNum',
  }, {
    title: '性别',
    dataIndex: 'userGender',
    customRender(text) {
      return text === 1 ? '男' : '女';
    },
  }, {
    title: '生日',
    dataIndex: 'userBirthday',
  }, {
    title: '所属机构',
    dataIndex: 'userOrgName',
  }, {
    title: '手机',
    dataIndex: 'userPhoneNum',
  }, {
    title: '操作',
    dataIndex: 'operate',
    scopedSlots: { customRender: 'operate' },
  }]
export default {
  data: () => {
    return {
      columns,
    };
  },
  props: {
    userList: {
      type: Array,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      reqired: true,
    },
    total: {
      type: Number,
      reqired: true,
    },
  },
  methods: {
    onChangePage(pageNum) {
      this.$emit('changePage', pageNum);
    },
    editUser(userId) {
      this.$emit('editUser', userId);
    },
    deleteUser(userId) {
      Modal.confirm({
        title: '确认删除？',
        onOk: () => {
          this.$emit('deleteUser', userId);
        },
        okText: '是',
        cancelText: '否',
      })
    },
  },
  created() {
    this.$store.dispatch('getUserList')
  },
}
</script>
<style lang="less" scoped>
  .edit {
    cursor: pointer;
    margin-right: 10px;
    font-size: 18px;

    &:hover {
      color: #1890ff;
    }
  }
  .delete {
    cursor: pointer;
    font-size: 18px;

    &:hover {
      color: #1890ff;
    }
  }
</style>


