import { ACTIONS } from '../context/photoContext'

export const PhotoReducer = (state, action) => {
  console.log(action)
  const { payload } = action
  switch (action.type) {
    case ACTIONS.ADD_PHOTO:
      return [...state, payload]
    case ACTIONS.PHOTO_LOGOUT:
      return []
    case ACTIONS.REMOVE_PHOTO:
      const newState = state.filter(photo => photo._id !== payload)
      return newState
    case ACTIONS.UPDATE_PHOTO:
      return state.map(photo => photo._id === payload._id ? payload : photo)
    case ACTIONS.GET_ALL_PHOTOS:
      console.log(payload)
      console.log(state.length)
      console.log(payload != state ? 'payload does not equal state' : 'payload matches state')
      return payload != state ? payload : state
    case ACTIONS.GET_PHOTO:
      return payload
    case ACTIONS.GET_ALBUM_PHOTOS:
      return payload
    default:
      return state
  }
}