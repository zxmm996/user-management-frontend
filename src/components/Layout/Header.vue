<template>
  <div class="header">
      <div class="header-content">
        <img src="../../assets/logo.png" alt="">
        <span>{{title}}</span>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      title: "User Management"
    }
  }
}
</script>
<style lang="less" scoped>
 .header {
    height: 100px;
    line-height: 100px;

    .header-content {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: auto;;
        margin-left: 60px;
      }
      span {
        font-size: 20px;
        font-weight: bold;
        margin-left: 20px;
      }

    }
  }
</style>


