<template>
  <div class="container">
    <LoginLayout></LoginLayout>
  </div>
</template>
<script>
  import LoginLayout from '../components/Login/LoginLayout.vue';
  export default {
    components: {
      LoginLayout,
    }
  }
</script>

<style lang="less" scoped>
  .container {
    h1 {
      font-size: 20px;
    }
  }
</style>

