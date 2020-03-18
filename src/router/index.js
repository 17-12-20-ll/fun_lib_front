import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home.vue'
import Member from '@/views/member/Member.vue'
import Login from '@/views/member/user/Login.vue'
import Website from '../views/Website/WebsiteIndex.vue'
import Site from '../views/SiteAdmin/SiteIndex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    // redirect: '/home/dashboard',
    meta: {
      title: '首页-崇研科技'
    },
  },
  // 会员管理
  {
    path: '/member',
    name: 'member',
    component: Member,
    redirect: '/member/config',
    meta: {
      title: '用户-崇研科技'
    },
    children: [
      {
        path: '/member/config',
        name: 'config',
        component: () => import('@/views/member/admin/SystemConfig'),
        meta: {
          title: '系统配置'
        }
      },
      {
        path: '/member/admins',
        name: 'admins',
        component: () => import('@/views/member/admin/AdminList'),
        meta: {
          title: '管理员列表'
        }
      },
      {
        path: '/member/groups',
        name: 'groups',
        component: () => import('@/views/member/user/GroupList'),
        meta: {
          title: '会员分类列表'
        }
      },
      {
        path: '/member/users',
        name: 'users',
        component: () => import('@/views/member/user/UserList'),
        meta: {
          title: '会员列表'
        }
      },
      {
        path: '/member/one',
        name: 'one',
        component: () => import('@/views/member/src/OneSrcList'),
        meta: {
          title: '一级资源分类'
        }
      },
      {
        path: '/member/two',
        name: 'two',
        component: () => import('@/views/member/src/TwoSrcList'),
        meta: {
          title: '二级资源分类'
        }
      },
      {
        path: '/member/three',
        name: 'three',
        component: () => import('@/views/member/src/ThreeSrcList'),
        meta: {
          title: '资源列表入口'
        }
      },
      {
        path: '/member/four',
        name: 'four',
        component: () => import('@/views/member/src/FourSrcList'),
        meta: {
          title: '账号信息管理'
        }
      },
      {
        path: '/member/tradetype',
        name: 'tradetype',
        component: () => import('@/views/member/trade/TradeTypeList.vue'),
        meta: {
          title: '交易类型管理'
        }
      },
      {
        path: '/member/cardtrade',
        name: 'cardtrade',
        component: () => import('@/views/member/trade/CardTradeList.vue'),
        meta: {
          title: '交易卡密管理'
        }
      },
      {
        path: '/member/adminlog',
        name: 'adminlog',
        component: () => import('@/views/member/admin/AdminLog.vue'),
        meta: {
          title: '交易卡密管理'
        }
      },
      {
        path: '/member/financialmanager',
        name: 'financialmanager',
        component: () => import('@/views/member/admin/FinancialManager.vue'),
        meta: {
          title: '财务管理'
        }
      },
      {
        path: '/member/useroperation',
        name: 'useroperation',
        component: () => import('@/views/member/user/UserOperation.vue'),
        meta: {
          title: '用户行为监控'
        }
      },
    ]
  },
  // 网站管理
  {
    path: '/website',
    name: 'website',
    component: Website,
    meta: {
      title: '网站管理'
    },
  },
  {
    path: '/site',
    name: 'site',
    component: Site,
    meta: {
      title: '站点管理'
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes,
})

export default router
