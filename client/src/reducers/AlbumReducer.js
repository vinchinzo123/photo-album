import {ACTIONS} from '../context/albumContext'

export const AlbumReducer = (state, action) => {
  const {payload } = action
  console.log(action)
  switch (action.type) {
    case ACTIONS.ADD_ALBUM :
      return [...state, payload.album]
    case ACTIONS.GET_ALBUMS:
      return payload.albums
    case ACTIONS.REMOVE_ALBUM:
      return state.filter(album => album.id !== payload.id)
    case ACTIONS.UPDATE_ALBUM:
      return state.map(album => album.id === payload.album.id ? payload.album : album)
    default:
      return state
  }
}