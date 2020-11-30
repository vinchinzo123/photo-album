import React, {createContext, useReducer, useEffect} from 'react'
import {AuthReducer} from '../reducers'

export const AuthContext = createContext()

export const ACTIONS = {
  LOGIN: 'login',
  LOGIN_SUCCESS: 'login-success',
  LOGIN_FAIL: 'login-fail',
  LOGOUT: 'logout'
}

function init(initialState) {
  try{
    return JSON.parse(localStorage.getItem('authState'))
  } catch{
    return initialState
  }
}

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  error: null
}
export const AuthProvider = ({children}) => {

  const [state, dispatch] = useReducer(
    AuthReducer, initialState, init)

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state))
  }, [state])

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  )
}