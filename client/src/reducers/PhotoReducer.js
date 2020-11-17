import {ACTIONS} from '../context/photoContext'

export const PhotoReducer = (state, action) => {
  const {payload } = action
  console.log(action)
  switch (action.type) {
    case ACTIONS.ADD_PHOTO :
      return [...state, payload.photo]
      case ACTIONS.REMOVE_PHOTO :
        return state.filter(photo => photo.id !== payload.id)
      case ACTIONS.UPDATE_PHOTO :
        return state.map(album => album.id === payload.album.id ? payload.album : album)
      case ACTIONS.GET_ALL_PHOTOS :
        return payload.photos
      case ACTIONS.GET_PHOTO :
      return payload.photo
    case ACTIONS.GET_ALBUM_PHOTOS :
      return payload.photos
    default:
      return state
  }
}