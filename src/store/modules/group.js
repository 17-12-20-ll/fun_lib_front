import * as ajax from '@/api'
import da from "element-ui/src/locale/lang/da";

const state = {
  groups: [],
  inputGroupName: ''
};
const mutations = {

  receiveGroups(state, data) {
    state.groups = data
  },
  setInputGroupName(state, data) {
    state.inputGroupName = data
  }

};
const actions = {
  getGroups({commit}) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getGroupsApi();
      if (res === null) return;
      commit('receiveGroups', res.data);
      resolve() // 接口请求完成
    })
  },
  query({commit},query) {
    return new Promise(async (resolve, reject) => {
      const res = await ajax.getGroupsApi(query);
      if (res === null) return;
      commit('receiveGroups', res.data);
      resolve() // 接口请求完成
    })
  },
};
export default {
  state,
  mutations,
  actions,
}
