import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import admin from './modules/admin'
import src from './modules/src'
import group from './modules/group'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin,
    src,
    group,
    user
  },
  getters
})
