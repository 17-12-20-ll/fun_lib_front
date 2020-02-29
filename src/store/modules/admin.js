import * as ajax from '@/api'

const state = {
  admin_info: {
    login_name: '',
    level: ''
  },
  isLogin: false,
  admins: [],// 管理员列表
}
const mutations = {
  RECEIVE_INFO (state, data) {
    state.admin_info = data
    state.isLogin = true
  },
  RECEIVE_ADMINS (state, data) {
    state.admins = data
  },
  ADD_ADMIN (state, data) {
    state.admins.push(data)
  }
}
const actions = {
  get_login_info ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getInfo()
      if (res === null) return
      const { login_name, is_admin } = res.data
      commit('RECEIVE_INFO', { login_name, 'level': is_admin })
      resolve() // 接口请求完成
    })
  },
  action_get_admins ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getAdmins()
      if (res === null) return
      commit('RECEIVE_ADMINS', res.data)
      resolve() // 接口请求完成
    })
  }
}
export default {
  state,
  mutations,
  actions,
}
