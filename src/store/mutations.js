import types from './types'

const mutations = {
  [types.GETUSERINFO](state, data) {
    state.user = data;
    state.menus = data.menus.menus;
  },
  [types.CLEARUSERINFO](state) {
    state.user = null;
    state.menus = []
  },
}

export default mutations
