<template>
  <div id="app">
    <el-container>
      <el-header>
        <!-- 导航条 -->
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="/cart">LookUp配置</el-menu-item>
          <el-submenu index="4">
            <template slot="title">权限设置</template>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/user">用户管理</el-menu-item>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/tenant">租户管理</el-menu-item>
          </el-submenu>
          <font size="8" color="white">深圳大数据治理平台</font>
          <!-- <el-avatar icon="el-icon-user-solid"></el-avatar> -->
          
          <!-- <el-submenu index="3">
            <template slot="title">个人中心</template>
            <el-menu-item index="/login">登录</el-menu-item>
            <el-menu-item index="/register">注册</el-menu-item>
          </el-submenu>
          <el-menu-item index="/cart">
           购物车
          </el-menu-item> -->
        </el-menu>
        
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
         2022/11/22测试
      </el-footer>
    </el-container>
  </div>
</template>
 
<script>
export default {
}
</script>
 
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
  }
  /* .el-avatar {
  margin-right: 0;
  padding: 0;
  width: 40px;
  justify-content: space-around;
} */
</style>