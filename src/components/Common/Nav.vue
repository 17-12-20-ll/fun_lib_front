<template>
  <div>
    <i class="but" :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click="change"></i>
    <el-menu :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse">
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
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">会员列表</span>
      </el-menu-item>
      <el-menu-item index="/one">
        <i class="el-icon-setting"></i>
        <span slot="title">大资源分类</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span slot="title">资源列表</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: true
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
