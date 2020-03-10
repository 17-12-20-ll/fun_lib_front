import * as ajax from '@/api'

const state = {
  users: [],
  user_count: 0
}
const mutations = {
  RECEIVE_USER (state, data) {
    state.users = data
  },
  RECEIVE_USER_COUNT (state, data) {
    state.user_count = data
  },
  UPDATE_USER (state, data) {
    state.users = state.users.map(t => {
      return t.id === data.id ? data : t
    })
  }
}
const actions = {
  action_get_user ({ commit }, n, p) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getUsers(n, p)
      if (res === null) return
      commit('RECEIVE_USER', res.data)
      resolve() // 接口请求完成
    })
  },
  action_get_user_count ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getUserCount()
      if (res === null) return
      commit('RECEIVE_USER_COUNT', res.count)
      resolve() // 接口请求完成
    })
  },
}
export default {
  state,
  mutations,
  actions,
}
