<template>
  <div class="normal">
    <Header></Header>
    <div class="content">
      <div class="form">
        <a-form :autoFormCreate="(form)=>{this.form = form}">
          <h3>用户登录</h3>
          <a-form-item
            fieldDecoratorId="username"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名' }]}"
          >
            <a-input size="large">
              <a-icon slot="prefix" type="user" size="large" />
            </a-input>
          </a-form-item>
          <a-form-item
            fieldDecoratorId="password"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码' }]}"
          >
            <a-input size="large">
              <a-icon slot="prefix" type="lock" size="large" />
            </a-input>
          </a-form-item>
          <a-form-item fieldDecoratorId="remember">
            <a-checkbox>记住密码</a-checkbox>
          </a-form-item>
          <a-button class="login-btn" type="primary" size="large" @click="handleSubmit">登录</a-button>
        </a-form>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { Icon, Button, Input, Form, Checkbox } from 'ant-design-vue';
  import Header from '../Layout/Header';
  import Footer from '../Layout/Footer';

  Vue.component(Icon.name, Icon);
  Vue.component(Button.name, Button);
  Vue.component(Input.name, Input);
  Vue.component(Form.name, Form);
  Vue.component(Form.Item.name, Form.Item);
  Vue.component(Checkbox.name, Checkbox);

  export default {
    components: {
      Header,
      Footer,
    },
    methods: {
      handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const { username, password, remember } = values;
          if (username === 'admin' && password === 'admin') {
            this.$router.push('/home');
          }
        }
      })
    },
    }
  }
</script>
<style lang="less" scoped>
  .content {
    height: 540px;
    background: url(../../assets/login-banner.jpg) no-repeat center center;
    background-size: cover;
    position: relative;

    .form {
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 388px;
      height: 366px;
      background: rgba(255, 255, 255, .65);
      position: absolute;
      left: 50%;
      top: 100px;
      margin-left: 100px;
      padding: 30px;
      h3 {
        font-size: 16px;
        font-weight: bold;
        height: 50px;
        line-height: 40px;
        text-align: center;
      }
      .login-btn {
        width: 100%;
      }
    }
  }
</style>

