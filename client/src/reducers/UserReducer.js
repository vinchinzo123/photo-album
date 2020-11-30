import { ACTIONS } from '../context/userContext'

export const UserReducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case ACTIONS.CREATE_USER:
      return { ...state }
    case ACTIONS.DELETE_USER:
      return { ...state }
    case ACTIONS.UPDATE_USER:
      return payload
    case ACTIONS.GET_USER:
      return payload
    case ACTIONS.USER_LOGOUT:
      return {}
    default:
      return state
  }
}