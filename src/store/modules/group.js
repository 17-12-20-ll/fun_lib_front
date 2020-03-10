import * as ajax from '@/api'

const state = {
  groups: [],
}
const mutations = {
  receiveGroups (state, data) {
    state.groups = data
  },
}
const actions = {
  getGroups ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getGroupsApi()
      if (res === null) return
      commit('receiveGroups', res.data)
      resolve() // 接口请求完成
    })
  },
  query ({ commit }, query) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getGroupsApi(query)
      if (res === null) return
      commit('receiveGroups', res.data)
      resolve() // 接口请求完成
    })
  },
}
export default {
  state,
  mutations,
  actions,
}
