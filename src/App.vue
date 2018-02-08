<template>
  <div id="app">
    <el-container>
      <el-header height="64px">
        <header-ly></header-ly>
      </el-header>
      <!-- 中间主要区域容器 -->
      <el-main>
        <!-- 添加一个element-ui内置的过渡动画 -->
        <transition name="el-zoom-in-center">
          <!-- 通过路由渲染不同内容的页面 -->
          <router-view/>
        </transition>
      </el-main>

      <el-footer class="footer">
        <footer-ly></footer-ly>
      </el-footer>

    </el-container>

  </div>
</template>

<script>
//导入组件
import HeaderLy from '@/components/header'
import FooterLy from '@/components/footer'
export default {
  name: "App",
  components:{
    HeaderLy,
    FooterLy
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header {
  position:absolute;
  top:0;
  left:0;
  right:0;
  z-index:1;
}
.el-main {
  padding-top:64px;

}
.el-footer {
  padding:0;
}


</style>
