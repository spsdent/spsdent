import { REFRESH_APP } from '../actions/types'

const initialState = {
  isRefresh: false,
}

const refreshReducer = function (state = initialState, action) {
  const { type } = action

  switch (type) {
    case REFRESH_APP:
      return {
        ...state,
        isRefresh: !state.isRefresh,
      }
    default:
      return state
  }
}

export default refreshReducer
