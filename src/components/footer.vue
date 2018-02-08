<template>
  <el-row class="footer">
    <el-col :span="4">
      <img src="../assets/logo.png" alt="">
    </el-col>
    <el-col :span="20">
      <p class="copy">Copyright © 2015-2017.哈哈网络科技有限公司.All Rights Reserved.</p>
      <p class="beian">ICP备案号：蜀ICP备17008055号</p>
    </el-col>
  </el-row>
</template>
<script>
  export default {

  }
</script>
<style scoped>
  .footer {
    background:#eee;
  }
  img {
    width:80px;
    height:80px;
    margin:40px 0;
  }
  p {
    margin:50px 10px;
    color:#666;
  }
</style>
