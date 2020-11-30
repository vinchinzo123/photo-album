import React, { createContext, useReducer, useEffect } from 'react'
import { AlbumReducer } from '../reducers'

export const AlbumContext = createContext()

export const ACTIONS = {
  GET_ALBUMS: 'get-albums',
  ADD_ALBUM: 'add-album',
  REMOVE_ALBUM: 'remove-album',
  UPDATE_ALBUM: 'update-album',
  ALBUM_LOGOUT: 'logout-albums'
}

function init(initialState) {
  try {
    return JSON.parse(localStorage.getItem('albumState'))
  } catch {
    return initialState
  }
}


export const AlbumProvider = ({ children }) => {

  const [state, dispatch] = useReducer(
    AlbumReducer, [], init)

  useEffect(() => {
    localStorage.setItem("albumState", JSON.stringify(state))
  }, [state])

  return (
    <AlbumContext.Provider value={[state, dispatch]}>
      {children}
    </AlbumContext.Provider>
  )
}