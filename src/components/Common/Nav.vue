<template>
  <div class="nav_wrap">
    <!-- <i class="but" :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click="change"></i> -->
    <el-menu :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            :collapse="isCollapse"
            :default-active="this.$route.path">
      <el-menu-item index="/member/config">
        <i class="el-icon-menu"></i>
        <span slot="title">系统配置</span>
      </el-menu-item>
      <el-menu-item index="/member/admins">
        <i class="el-icon-menu"></i>
        <span slot="title">管理员列表</span>
      </el-menu-item>
      <el-menu-item index="/member/groups">
        <i class="el-icon-document"></i>
        <span slot="title">会员分类列表</span>
      </el-menu-item>
      <el-menu-item index="/member/users">
        <i class="el-icon-setting"></i>
        <span slot="title">会员列表</span>
      </el-menu-item>
      <el-menu-item index="/member/one">
        <i class="el-icon-setting"></i>
        <span slot="title">一级资源列表</span>
      </el-menu-item>
      <el-menu-item index="/member/two">
        <i class="el-icon-setting"></i>
        <span slot="title">二级资源列表</span>
      </el-menu-item>
      <el-menu-item index="/member/three">
        <i class="el-icon-setting"></i>
        <span slot="title">资源入口列表</span>
      </el-menu-item>
      <el-menu-item index="/member/four">
        <i class="el-icon-setting"></i>
        <span slot="title">账号资源列表</span>
      </el-menu-item>
      <el-menu-item index="/member/tradetype">
        <i class="el-icon-setting"></i>
        <span slot="title">充值类型列表</span>
      </el-menu-item>
      <el-menu-item index="/member/cardtrade">
        <i class="el-icon-setting"></i>
        <span slot="title">卡密充值列表</span>
      </el-menu-item>
      <el-menu-item index="/member/adminlog">
        <i class="el-icon-setting"></i>
        <span slot="title">管理员登陆日志</span>
      </el-menu-item>
      <el-menu-item index="/member/financialmanager">
        <i class="el-icon-setting"></i>
        <span slot="title">财务管理</span>
      </el-menu-item>
      <el-menu-item index="/member/useroperation">
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
.nav_wrap {
}
  .but {
    font-size: 20px;
    margin-left: 21px;
  }
  .nav_wrap >>> .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 179px;
    min-height: 400px;
    background-color: rgb(63,63,63);
  }
  .nav_wrap >>> .el-menu-item {
    color: #fff;
  }
  .nav_wrap >>> .el-menu-item i {
    color: rgba(255,255,255,.8);
  }
  .nav_wrap >>> .el-menu-item:hover {
    background-color: rgba(99,185,190,.6);
  }
  .nav_wrap >>> .el-menu-item.is-active {
    background-color: rgb(100, 190, 195);
  }
</style>

