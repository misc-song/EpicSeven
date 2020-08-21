import * as types from './types'

export default {
  changeNameAction({ commit, state }, { name }) {
    setTimeout(() => {
      commit(types.SET_NAME, { name })
    }, 2000)
  }
}
