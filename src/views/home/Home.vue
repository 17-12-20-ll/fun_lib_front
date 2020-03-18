<template>
  <div class="home">
    <div class="home-sidebar">
      <Nav />
    </div>
    <div class="home-app-main">
      <Appmain/>
    </div>
  </div>
</template>

<script>
import Appmain from '@/components/Common/Appmain'
import Nav from '@/components/Common/Nav'
export default {
  name: 'Home',
  components: {
    Appmain,
    Nav
  }
}
</script>
<style lang="scss" scoped>
.home {
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
