import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import SystemConfig from '@/views/SystemConfig.vue'
import AdminList from '@/views/AdminList.vue'
import UserList from '@/views/UserList.vue'
import GroupList from '@/views/GroupList.vue'
import OneSrcList from '@/views/OneSrcList.vue'
import TwoSrcList from '@/views/TwoSrcList.vue'
import ThreeSrcList from '@/views/ThreeSrcList.vue'
import FourSrcList from '@/views/FourSrcList.vue'
import TradeTypeList from '@/views/TradeTypeList.vue'
import CardTradeList from '@/views/CardTradeList.vue'
import AdminLog from '@/views/AdminLog.vue'
import FinancialManager from '@/views/FinancialManager.vue'
import UserOperation from '@/views/UserOperation.vue'

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
  },
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
      title: '一级资源分类'
    }
  },
  {
    path: '/two',
    name: 'two',
    component: TwoSrcList,
    meta: {
      title: '二级资源分类'
    }
  },
  {
    path: '/three',
    name: 'three',
    component: ThreeSrcList,
    meta: {
      title: '资源列表入口'
    }
  },
  {
    path: '/four',
    name: 'four',
    component: FourSrcList,
    meta: {
      title: '账号信息管理'
    }
  },
  {
    path: '/tradetype',
    name: 'tradetype',
    component: TradeTypeList,
    meta: {
      title: '充值类型列表'
    }
  },
  {
    path: '/cardtrade',
    name: 'cardtrade',
    component: CardTradeList,
    meta: {
      title: '卡密充值列表'
    }
  },
  {
    path: '/adminlog',
    name: 'adminlog',
    component: AdminLog,
    meta: {
      title: '管理员登陆日志'
    }
  },
  {
    path: '/financialmanager',
    name: 'financialmanager',
    component: FinancialManager,
    meta: {
      title: '财务管理'
    }
  },
  {
    path: '/useroperation',
    name: 'useroperation',
    component: UserOperation,
    meta: {
      title: '会员行为监控'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes: routes,
})

export default router
