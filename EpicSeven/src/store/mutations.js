import * as types from './types'

export default {
  [types.SET_NAME](state, { name }) {
    state.name = name
  }
}
