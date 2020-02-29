import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import admin from './modules/admin'
import src from './modules/src'
import groups from './modules/group'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin,
    src,
    groups
  },
  getters
})
