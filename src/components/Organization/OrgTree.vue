<script>
  import Vue from 'vue';
  import { Menu, Icon, Modal } from 'ant-design-vue';

  Vue.component(Icon.name, Icon);
  Vue.component(Menu.name, Menu);
  Vue.component(Menu.Item.name, Menu.Item);
  Vue.component(Menu.SubMenu.name, Menu.SubMenu);

  export default {
    name: 'OrgTree',
    props: {
      treeList: {
        type: Array,
        required: true,
      }
    },
    methods: {
      // 添加机构
      addOrg(orgId, level) {
        this.$emit('addOrg', orgId, level);
      },
      // 修改机构
      editOrg(orgId) {
        this.$emit('editOrg', orgId);
      },
      // 删除机构
      deleteOrg(orgId) {
        Modal.confirm({
          title: '确认删除？',
          onOk: () => {
            this.$emit('deleteOrg', orgId);
          },
          okText: '是',
          cancelText: '否',
        })
      },
    },
    render() {
      const getOrgComponent = (treeData) => {
        return treeData.map(item => {
          if (item.children.length > 0) {
            return (
              <a-sub-menu key={item._id} class="submenu">
                <span slot="title">
                  <span>{item.orgName}</span>
                  <a-icon onClick={() => this.addOrg(item._id, item.level)} type="plus-square-o" class="plus" />
                  <a-icon onClick={() => this.editOrg(item._id)} type="edit" class="edit" />
                  <a-icon onClick={() => this.deleteOrg(item._id)}  type="delete" class="delete" />
                </span>
                {getOrgComponent(item.children)}
              </a-sub-menu>
            )
          } else {
            return (
              <a-menu-item key={item._id} class="menuitem">
                {item.orgName}
                <a-icon onClick={() => this.addOrg(item._id, item.level)} type="plus-square-o" class="plus" />
                <a-icon onClick={() => this.editOrg(item._id)} type="edit" class="edit" />
                <a-icon onClick={() => this.deleteOrg(item._id)}  type="delete" class="delete" />
              </a-menu-item>
            )
          }
        })
      }
      return (
        <a-menu
            style="width: 300px"
            mode="inline"
          >
          {getOrgComponent(this.treeList)}
        </a-menu>
      )
    }
  }
</script>
<style lang="less" scoped>
  .submenu, menuitem {
    position: relative;
  }
  .submenu > div:hover > span > i {
    display: block;
  }
  .menuitem:hover > i {
    display: block;
  }
  .plus {
    display: none;
    position: absolute;
    right: 22px;
    top: 12px;
  }
  .edit {
    display: none;
    position: absolute;
    right: 44px;
    top: 12px;
  }
  .delete {
    display: none;
    position: absolute;
    right: 66px;
    top: 12px;
  }

</style>


