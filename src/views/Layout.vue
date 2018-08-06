<template>
  <div>
    <Header></Header>
    <Menus></Menus>
    <div class="content">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import Header from '../components/Layout/Header';
  import Footer from '../components/Layout/Footer';
  import Menus from '../components/Layout/Menus';
  export default {
    components: {
      Header,
      Footer,
      Menus,
    }
  }
</script>
<style lang="less" scoped>
  .header {
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .footer {
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .content {
    min-height: 400px;
    width: 1200px;
    margin: 10px auto 0;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
  }
</style>

