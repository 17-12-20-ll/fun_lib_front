<template>
  <div>
    <i class="but" :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click="change"></i>
    <el-menu :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse" :default-active="this.$route.path">
      <el-menu-item index="/config">
        <i class="el-icon-menu"></i>
        <span slot="title">系统配置</span>
      </el-menu-item>
      <el-menu-item index="/admins">
        <i class="el-icon-menu"></i>
        <span slot="title">管理员列表</span>
      </el-menu-item>
      <el-menu-item index="/groups">
        <i class="el-icon-document"></i>
        <span slot="title">会员分类列表</span>
      </el-menu-item>
      <el-menu-item index="users">
        <i class="el-icon-setting"></i>
        <span slot="title">会员列表</span>
      </el-menu-item>
      <el-menu-item index="/one">
        <i class="el-icon-setting"></i>
        <span slot="title">一级资源列表</span>
      </el-menu-item>
      <el-menu-item index="/two">
        <i class="el-icon-setting"></i>
        <span slot="title">二级资源列表</span>
      </el-menu-item>
      <el-menu-item index="/four">
        <i class="el-icon-setting"></i>
        <span slot="title">账号资源列表</span>
      </el-menu-item>
      <el-menu-item index="/three">
        <i class="el-icon-setting"></i>
        <span slot="title">资源入口列表</span>
      </el-menu-item>
      <el-menu-item index="/tradetype">
        <i class="el-icon-setting"></i>
        <span slot="title">充值类型列表</span>
      </el-menu-item>
      <el-menu-item index="/cardtrade">
        <i class="el-icon-setting"></i>
        <span slot="title">卡密充值列表</span>
      </el-menu-item>
      <el-menu-item index="/adminlog">
        <i class="el-icon-setting"></i>
        <span slot="title">管理员登陆日志</span>
      </el-menu-item>
      <el-menu-item index="/financialmanager">
        <i class="el-icon-setting"></i>
        <span slot="title">财务管理</span>
      </el-menu-item>
      <el-menu-item index="/useroperation">
        <i class="el-icon-setting"></i>
        <span slot="title">会员行为监控</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    change () {
      this.isCollapse = !this.isCollapse
    }

  }
}
</script>

<style scoped>
  .but {
    font-size: 20px;
    margin-left: 21px;
  }
</style>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
