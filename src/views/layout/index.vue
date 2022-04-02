<!-- 主页面 -->
<template>
  <el-container>
    <el-aside width="200px">
      <!-- 侧边栏组件 -->
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-main>
        <!-- 设置子路由的出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//引入侧边栏组件
import AppAside from './compoents/AppAside'
//引入头部组件
import AppHeader from './compoents/AppHeader'
export default {
  name: "LayoutIndex",
  components:{
    AppAside,
    AppHeader
  }
};
</script>

<style lang="scss">
  .el-container {
    height: 100vh;
    min-width: 980px;
  }

  .el-header {
    background-color: #fff;
  }

  .el-aside {
  }

  .el-main {
  }
</style>
