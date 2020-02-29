import * as ajax from '@/api'

const state = {
  one_src: [],// 一级资源列表
}
const mutations = {
  RECEIVE_ONE_SRC (state, data) {
    state.one_src = data
  },
}

const actions = {
  action_get_one_src ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getOneSrc()
      if (res === null) return
      commit('RECEIVE_ONE_SRC', res.data)
      resolve() // 接口请求完成
    })
  }
}
export default {
  state,
  mutations,
  actions,
}
