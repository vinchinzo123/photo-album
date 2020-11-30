import { ACTIONS } from '../context/albumContext'

export const AlbumReducer = (state, action) => {
  const { payload } = action
  console.log(action)
  switch (action.type) {
    case ACTIONS.ADD_ALBUM:
      return [...state, payload]
    case ACTIONS.ALBUM_LOGOUT:
      return []
    case ACTIONS.GET_ALBUMS:
      return payload
    case ACTIONS.REMOVE_ALBUM:
      return state.filter(album => album._id !== payload)
    case ACTIONS.UPDATE_ALBUM:
      return state.map(album => album._id === payload._id ? payload : album)
    default:
      return state
  }
}