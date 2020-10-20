export default (state, action) => {
  switch (action.type) {
    case "GET_ALL_PHOTOS":
      return {
        ...state,
        photos: action.payload,
      };
    default:
      return state;
  }
};
