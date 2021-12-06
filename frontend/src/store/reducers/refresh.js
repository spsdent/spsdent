import { REFRESH_APP } from '../actions/types'

const initialState = { isRefresh: false }

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case REFRESH_APP:
      return { isRefresh: !state.isRefresh }

    default:
      return state
  }
}
