<template>
  <div class="fun-header">
    <ul class="fun-header-nav">
      <router-link to="/" tag="li">首页</router-link>
      <router-link to="/news" tag="li">会员数据</router-link>
      <router-link to="/bigdata" tag="li">网站管理</router-link>
      <router-link to="/intelligence" tag="li">站点管理</router-link>
    </ul>
    <div class="fun-header-right">
      <span>用户名:{{admin_info.login_name}}</span>
      |
      <span>级别:{{admin_info.level===1?'管理员':'成员'}}</span>
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
  .fun-header {
    width: 98%;
    height: 100%;
    margin: auto;
    left: 0;
    right: 0;
    display: flex;
    position: relative;

    &-nav {
      width: 60%;
      height: 61px;
      display: flex;
      align-items: center;
      padding-left: 5px;
      font-size: 16px;
      font-weight: 600;

      li {
        margin: 1px 5px;
        padding: 0 2px;
        height: 100%;
        line-height: 68px;

        &:hover {
          cursor: pointer;
          border-bottom: 2px solid #3178e2;
        }
      }
    }

    &-right {
      height: 80px;
      display: flex;
      align-items: flex-end;
      position: absolute;
      font-size: 14px;
      font-weight: 400;
      right: 12%;
      bottom: 10px;

      span {
        margin: 0 7px;
      }

      span:last-child {
        color: blue;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>
