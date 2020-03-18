import * as ajax from '@/api'

const state = {
  trade_types: [],
  trade_cards: [],
  trade_card_count: 0
}
const mutations = {
  RECEIVE_TRADE_TYPES (state, data) {
    state.trade_types = data
  },
  RECEIVE_TRADE_CARDS (state, data) {
    state.trade_cards = data
  },
  RECEIVE_TRADE_CARD_COUNT (state, data) {
    state.trade_card_count = data
  },
}
const actions = {
  action_get_trade_types ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getTradeType()
      if (res === null) return
      commit('RECEIVE_TRADE_TYPES', res.data)
      resolve() // 接口请求完成
    })
  },
  action_get_trade_cards ({ commit }, p) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getCardTradeData(p)
      if (res === null) return
      commit('RECEIVE_TRADE_CARDS', res.data)
      resolve() // 接口请求完成
    })
  },
  action_get_trade_card_count ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getCardTradeCount()
      if (res === null) return
      commit('RECEIVE_TRADE_CARD_COUNT', res.count)
      resolve() // 接口请求完成
    })
  }
}
export default {
  state,
  mutations,
  actions,
}
