import { ACTIONS } from '../context/authContext'

export const AuthReducer = (state, action) => {
  const { payload } = action
  console.log(action)
  switch (action.type) {
    case ACTIONS.LOGIN:
      return ({ ...state, loading: true })
    case ACTIONS.LOGIN_SUCCESS:
      return ({ ...state, loading: false, user: payload.user, isAuthenticated: true })
    case ACTIONS.LOGIN_FAIL:
      return ({ ...state, loading: false, user: {} })
    case ACTIONS.LOGOUT:
      localStorage.removeItem('authState')
      localStorage.removeItem('albumState')
      localStorage.removeItem('userState')
      localStorage.removeItem('photoState')
      return ({ ...state, user: {}, isAuthenticated: false })
    default:
      return state
  }
}