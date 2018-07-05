import * as types from './mutation-types'

const mutation = {
  [types.SET_USERINFO](state, userinfo) {
    state.userinfo = userinfo;
  },
  [types.SET_NAVBARS](state, navbars) {
    state.navbars = navbars;
  },
  [types.SET_SHORTCUT](state, shortcut) {
    state.shortcut = shortcut;
  },
  [types.SET_WORKTOTAL](state, workTotal) {
    state.workTotal = workTotal;
  },
  [types.SET_MSGTOTAL](state, msgTotal) {
    state.msgTotal = msgTotal;
  },
};
export default mutation;
