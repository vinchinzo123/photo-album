import React, { createContext, useReducer, useEffect } from 'react'
import { PhotoReducer } from '../reducers'

export const PhotoContext = createContext()

export const ACTIONS = {
  GET_ALL_PHOTOS: 'get-all-photos',
  GET_ALBUM_PHOTOS: 'get-album-photos',
  GET_PHOTO: 'get-photo',
  ADD_PHOTO: 'add-photo',
  REMOVE_PHOTO: 'remove-photo',
  UPDATE_PHOTO: 'update-photo',
  PHOTO_LOGOUT: 'logout-photo'
}

function init(initialState) {
  try {
    return JSON.parse(localStorage.getItem('photoState'))
  } catch {
    return initialState
  }
}


export const PhotoProvider = ({ children }) => {

  const [state, dispatch] = useReducer(
    PhotoReducer, [], init)

  useEffect(() => {
    localStorage.setItem("photoState", JSON.stringify(state))
  }, [state])

  return (
    <PhotoContext.Provider value={[state, dispatch]}>
      {children}
    </PhotoContext.Provider>
  )
}