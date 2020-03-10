import * as ajax from '@/api'

const state = {
  one_src: [],// 一级资源列表
  one_src_count: 0,// 一级资源总数
  two_src: [],// 二级资源列表
  two_src_count: 0,// 二级资源总条数
  three_src: [],// 二级资源列表
  three_src_count: 0,// 二级资源总条数
  four_src: [], // 账号资源列表
  four_src_count: 0,// 账号资源总条数
}
const mutations = {
  RECEIVE_ONE_SRC (state, data) {
    state.one_src = data
  },
  RECEIVE_ONE_SRC_COUNT (state, count) {
    state.one_src_count = count
  },
  RECEIVE_TWO_SRC (state, data) {
    state.two_src = data
  },
  RECEIVE_TWO_SRC_COUNT (state, count) {
    state.two_src_count = count
  },
  UPDATE_TWO_SRC (state, data) {
    state.two_src = state.two_src.map(t => {
      return t.id === data.id ? data : t
    })
  },
  RECEIVE_THREE_SRC (state, data) {
    state.three_src = data
  },
  RECEIVE_THREE_SRC_COUNT (state, data) {
    state.three_src_count = data
  },
  RECEIVE_FOUR_SRC (state, data) {
    state.four_src = data
  },
  RECEIVE_FOUR_SRC_COUNT (state, count) {
    state.four_src_count = count
  },
  UPDATE_FOUR_SRC (state, data) {
    state.four_src = state.four_src.map(t => {
      return t.id === data.id ? data : t
    })
  },
}

const actions = {
  action_get_one_src ({ commit }, n, p) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getOneSrcPage(n, p)
      if (res === null) return
      commit('RECEIVE_ONE_SRC', res.data)
      resolve() // 接口请求完成
    })
  },
  action_get_one_src_count ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getOneSrcCount()
      if (res === null) return
      commit('RECEIVE_ONE_SRC_COUNT', res.count)
      resolve() // 接口请求完成
    })
  },
  action_get_two_src ({ commit }, n, p) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getTwoSrcPage(n, p)
      if (res === null) return
      commit('RECEIVE_TWO_SRC', res.data)
      resolve() // 接口请求完成
    })
  },
  action_get_two_src_count ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getTwoSrcCount()
      if (res === null) return
      commit('RECEIVE_TWO_SRC_COUNT', res.count)
      resolve() // 接口请求完成
    })
  },
  action_get_three_src ({ commit }, n, p) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getThreeSrcPage(n, p)
      if (res === null) return
      commit('RECEIVE_THREE_SRC', res.data)
      resolve() // 接口请求完成
    })
  },
  action_get_three_src_count ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getThreeSrcCount()
      if (res === null) return
      commit('RECEIVE_THREE_SRC_COUNT', res.count)
      resolve() // 接口请求完成
    })
  },
  action_get_four_src ({ commit }, n, p) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getFourSrcPage(n, p)
      if (res === null) return
      commit('RECEIVE_FOUR_SRC', res.data)
      resolve() // 接口请求完成
    })
  },
  action_get_four_src_count ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getFourSrcCount()
      if (res === null) return
      commit('RECEIVE_FOUR_SRC_COUNT', res.count)
      resolve() // 接口请求完成
    })
  },

}
export default {
  state,
  mutations,
  actions,
}
