<template>
  <a-modal
    width="400px"
    :title="title"
    wrapClassName="vertical-center-modal"
    :visible="visible"
    @ok="confirmHandler"
    @cancel="cancelHandler"
    okText="确定"
    cancelText="取消"
  >
    <a-form :autoFormCreate="(form)=>{this.form = form}">
      <a-form-item
        label="机构"
        :labelCol="{span: 4}"
        :wrapperCol="{span: 18}"
        fieldDecoratorId="orgName"
        :fieldDecoratorOptions="{
          initialValue: type === 'add' ? '' : orgName,
          rules: [{ required: true, message: '请输入机构名称' }]
        }"
      >
        <a-input />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import Vue from 'vue';
import { Modal, Input, Form, } from 'ant-design-vue';

Vue.component(Modal.name, Modal);
Vue.component(Input.name, Input);
Vue.component(Form.name, Form);
Vue.component(Form.Item.name, Form.Item);

export default {
  computed: {
    title() {
      return this.type === 'add' ? '添加机构' : '修改机构';
    },
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    orgName: {
      type: String,
    },
  },
  methods: {
    confirmHandler(e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$emit('confirm', values.orgName);
          }
        })
    },
    cancelHandler() {
      this.$emit('cancel');
    }
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


