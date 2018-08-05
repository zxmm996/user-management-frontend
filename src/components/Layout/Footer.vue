<template>
  <div class="footer">
    {{footerText}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      footerText: "Powered By Zxmm"
    }
  }
}
</script>
<style lang="less" scoped>
  .footer {
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
</style>


