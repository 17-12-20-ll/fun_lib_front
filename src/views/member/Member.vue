<template>
  <div class="member">
    <div class="member-sidebar">
      <Nav />
    </div>
    <div class="member-app-main">
      <Appmain/>
    </div>
  </div>
</template>

<script>
import Appmain from '@/components/Common/Appmain'
import Nav from '@/components/Common/Nav'
export default {
  name: 'member',
  components: {
    Appmain,
    Nav
  }
}
</script>
<style lang="scss" scoped>
.member {
  display: flex;
  flex-direction: row;
  &-sidebar {
    height: calc(100vh - 60px);
    width: 180px;
    padding: 20px 0;
    box-sizing: border-box;
    border-right: solid 1px #e6e6e6;
    background-color: rgb(63,63,63);
  }
  &-app-main {
    flex: 1;
  }
}
</style>
<style scoped>
.member >>> .el-input {
  width: 300px;
}
.member >>> .el-input-group__prepend {
  height: 31.5px;
}
.member >>> .el-table th {
  background-color: rgb(242,242,242);
}
.member >>> .el-button--mini {
  padding: 7px 18px;
  font-size: 13px;
}
.member >>> .el-button--small {
  padding: 10px 18px;
  font-size: 13px;
}
</style>
