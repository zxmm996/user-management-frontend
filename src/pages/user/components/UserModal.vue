<script>
import Vue from 'vue';
import moment from 'moment';
import { Modal, Input, Form, Radio, DatePicker, TreeSelect } from 'ant-design-vue';

Vue.component(Modal.name, Modal);
Vue.component(Input.name, Input);
Vue.component(Form.name, Form);
Vue.component(Form.Item.name, Form.Item);
Vue.component(Radio.name, Radio);
Vue.component(Radio.Group.name, Radio.Group);
Vue.component(DatePicker.name, DatePicker);
Vue.component(TreeSelect.name, TreeSelect);
Vue.component(TreeSelect.TreeNode.name, TreeSelect.TreeNode);


export default {
  computed: {
    title() {
      return this.type === 'add' ? '添加用户' : '修改用户';
    },
  },
  props: {
    treeList: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    userInfo: {
      type: Object,
    }
  },
  methods: {
    confirmHandler(e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$emit('userModalConfirm', {
              ...values,
              userBirthday: values.userBirthday.format('YYYY-MM-DD'),
            });
          }
        })
    },
    cancelHandler() {
      this.$emit('userModalCancel');
    }
  },
  render() {
    const getTreeNodes = (treeData) => {
      return treeData.map(item => {
        if (item.children.length > 0) {
          return (
            <a-tree-select-node value={item._id} title={item.orgName} key={item._id}>
              {getTreeNodes(item.children)}
            </a-tree-select-node>
          )
        } else {
          return (
            <a-tree-select-node value={item._id} title={item.orgName} key={item._id} />
          )
        }
      })
    }
    return (
      <a-modal
        width="400px"
        title={this.title}
        wrapClassName="vertical-center-modal"
        visible={this.visible}
        onOk={this.confirmHandler}
        onCancel={this.cancelHandler}
        okText="确定"
        cancelText="取消"
      >
        <a-form autoFormCreate={(form)=>{this.form = form}}>
          <a-form-item
            label="姓名"
            labelCol={{span: 4}}
            wrapperCol={{span: 18}}
            fieldDecoratorId="userName"
            fieldDecoratorOptions={{
              initialValue: this.type === 'add' ? undefined : this.userInfo.userName,
              rules: [{ required: true, message: '请输入姓名' }]
            }}
          >
            <a-input />
          </a-form-item>
          <a-form-item
            label="性别"
           labelCol={{span: 4}}
            wrapperCol={{span: 18}}
            fieldDecoratorId="userGender"
            fieldDecoratorOptions={{
              initialValue: this.type === 'add' ? undefined : this.userInfo.userGender,
              rules: [{ required: true, message: '请选择性别' }]
            }}
          >
            <a-radio-group>
              <a-radio value={1}>男</a-radio>
              <a-radio value={0}>女</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            label="生日"
            labelCol={{span: 4}}
            wrapperCol={{span: 18}}
            fieldDecoratorId="userBirthday"
             fieldDecoratorOptions={{
              initialValue: this.type === 'add' ? undefined : moment(this.userInfo.userBirthday),
              rules: [{ required: true, message: '请输入手机号码' }]
            }}
          >
            <a-date-picker></a-date-picker>
          </a-form-item>
          <a-form-item
            label="编号"
            labelCol={{span: 4}}
            wrapperCol={{span: 18}}
            fieldDecoratorId="userNum"
            fieldDecoratorOptions={{
              initialValue: this.type === 'add' ? undefined : this.userInfo.userNum,
              rules: [{ required: true, message: '请输入编号' }]
            }}
          >
            <a-input />
          </a-form-item> <a-form-item
            label="机构"
            labelCol={{span: 4}}
            wrapperCol={{span: 18}}
            fieldDecoratorId="userOrgId"
            fieldDecoratorOptions={{
              initialValue: this.type === 'add' ? undefined : this.userInfo.userOrgId,
              rules: [{ required: true, message: '请选择所属机构' }]
            }}
          >
            <a-tree-select
              showSearch
              style={{width: '100%'}}
              dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
              placeholder='Please select'
              allowClear
              treeDefaultExpandAll
            >
              {getTreeNodes(this.treeList)}
            </a-tree-select>
          </a-form-item>
          <a-form-item
            label="密码"
            labelCol={{span: 4}}
            wrapperCol={{span: 18}}
            fieldDecoratorId="userPwd"
            fieldDecoratorOptions={{
              initialValue: this.type === 'add' ? undefined : this.userInfo.userPwd,
              rules: [{ required: true, message: '请输入密码' }]
            }}
          >
            <a-input type="password" autocomplete />
          </a-form-item>
          <a-form-item
            label="手机"
           labelCol={{span: 4}}
            wrapperCol={{span: 18}}
            fieldDecoratorId="userPhoneNum"
             fieldDecoratorOptions={{
              initialValue: this.type === 'add' ? undefined : this.userInfo.userPhoneNum,
              rules: [{ required: true, message: '请输入手机号码' }]
            }}
          >
            <a-input />
          </a-form-item>
        </a-form>
      </a-modal>
    )
  }
}
</script>
<style lang="less" scoped>
.label {
  text-align: right;
  line-height: 32px;
}
/* use css to set position of modal */
.vertical-center-modal {
  text-align: center;
  white-space: nowrap;
}

.vertical-center-modal:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  width: 0;
}

.vertical-center-modal .ant-modal {
  display: inline-block;
  vertical-align: middle;
  top: 0;
  text-align: left;
}
</style>


