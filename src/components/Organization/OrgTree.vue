<script>
import Vue from 'vue';
import { Menu } from 'ant-design-vue';

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
  render() {
    const getOrgComponent = (treeData) => {
      return treeData.map(item => {
        if (item.children.length > 0) {
          return (
            <a-sub-menu key={item._id} title={item.orgName}>
              {getOrgComponent(item.children)}
            </a-sub-menu>
          )
        } else {
          return (
            <a-menu-item key={item._id}>{item.orgName}</a-menu-item>
          )
        }
      })
    }
    return (
      <a-menu
          style="width: 256px"
          mode="inline"
        >
        {getOrgComponent(this.treeList)}
      </a-menu>
    )
  }
}
</script>
<style lang="less" scoped>

</style>


