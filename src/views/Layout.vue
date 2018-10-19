<template>
  <div>
    <Header></Header>
    <div class="content">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import Header from '../components/Layout/Header';
  import Footer from '../components/Layout/Footer';
  export default {
    components: {
      Header,
      Footer,
    }
  }
</script>
<style lang="less" scoped>
  .content {
    width: 1200px;
    margin: 10px auto 0;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
  }
</style>

