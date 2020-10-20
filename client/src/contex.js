import AppReducer from "./AppReducer";
import api from "./utils/api";
import React, { useState, useEffect, createContext, useReducer } from "react";

const initialState = {
  photos: [],
  loading: false,
  photoFetched: true,
};
export const Context = createContext(initialState);

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //ACTIONS
  const getAllPhotos = async () => {
    const payload = await api.getPhotos();
    dispatch({ type: "GET_ALL_PHOTOS", payload });
  };

  const postPhoto = async (photoObj) => {
    const payload = await api.postPhoto(photoObj);
    dispatch({ type: "POST_PHOTO", payload });
  };

  return (
    <Context.Provider
      value={{
        photos: state.photos,
        loading: state.loading,
        photoFetched: state.loading,
        getAllPhotos,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const Consumer = Context.Consumer;
