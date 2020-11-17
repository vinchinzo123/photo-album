import React, {createContext, useReducer, useEffect} from 'react'
import {UserReducer} from '../reducers'

export const UserContext = createContext()

export const ACTIONS = {
  CREATE_USER: 'create-user',
  GET_USER: 'get-user',
  UPDATE_USER: 'update-user',
  DELETE_USER: 'delete-user'
}

function init(initialState) {
  try{
    return JSON.parse(localStorage.getItem('userState'))
  } catch{
    return initialState
  }
}


export const UserProvider = ({children}) => {

  const [state, dispatch] = useReducer(UserReducer, {}, init)

  useEffect(() => {
    localStorage.setItem('userState', JSON.stringify(state))
    
  }, [state])

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}