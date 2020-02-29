import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import SystemConfig from '@/views/SystemConfig.vue'
import AdminList from '@/views/AdminList.vue'
import UserList from '@/views/UserList.vue'
import GroupList from '@/views/GroupList.vue'
import OneSrcList from '@/views/OneSrcList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页-管理后台'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/config',
    name: 'config',
    component: SystemConfig,
    meta: {
      title: '系统配置'
    }
  }
  ,
  {
    path: '/admins',
    name: 'admins',
    component: AdminList,
    meta: {
      title: '管理员列表'
    }
  },
  {
    path: '/groups',
    name: 'groups',
    component: GroupList,
    meta: {
      title: '分组列表'
    }
  },
  {
    path: '/users',
    name: 'users',
    component: UserList,
    meta: {
      title: '会员列表'
    }
  },
  {
    path: '/one',
    name: 'one',
    component: OneSrcList,
    meta: {
      title: '大资源分类'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes,
})

export default router
