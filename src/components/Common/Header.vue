<template>
  <div class="header_wrap">
    <ul class="header_wrap_list">
      <router-link to="/" tag="li">首页</router-link>
      <router-link to="/member" tag="li">会员数据</router-link>
      <router-link to="/website" tag="li">网站管理</router-link>
      <router-link to="/site" tag="li">站点管理</router-link>
    </ul>
    <div class="header_wrap_user">
      <span>用户名 ：{{admin_info.login_name}}</span>
      |
      <span>级别 ：{{admin_info.level===1?'管理员':'成员'}}</span>
      |
      <span class="exit" @click="exit">退出</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {}
  },
  computed: {
    admin_info () {
      return this.$store.getters.admin_info
    }
  },
  methods: {
    exit () {
      //退出管理员
      localStorage.removeItem('token')
      this.$router.go(0)
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin flex_wrap {
  display: flex;
  justify-content: space-between;
  line-height: 60px;

}
.header_wrap {
  font-size: 14px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0 50px 0 20px;
  height: 60px;
  background-color: rgb(100, 190, 195);
  
  &_list {
    width: 16%;
    padding: 0 20px;
    @include flex_wrap;
  }
  &_user {
    @include flex_wrap;
    // width: 12%;
    span {
      padding: 0 15px;
    }
  }
}
</style>
