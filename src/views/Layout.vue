<template>
  <div>
    <div class="header">header</div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footer">footer</div>
  </div>
</template>
<script>
  export default {

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
  }
</style>

