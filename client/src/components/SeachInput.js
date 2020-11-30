import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { AlbumContext, AuthContext, PhotoContext } from '../context';
import { ACTIONS as ALBUM_ACTIONS } from '../context/albumContext';
import { ACTIONS as PHOTO_ACTIONS } from '../context/photoContext'
import useInput from '../hooks/useInput';
import api from '../utils/api';

export const SeachInput = () => {
  const [authState,] = useContext(AuthContext)
  const [photoState, photoDispatch] = useContext(PhotoContext)
  const [albumState, albumDispatch] = useContext(AlbumContext)
  const [highlight, setHighlight] = useState(false)
  const [input, bindInput, resetInput] = useInput("")
  const history = useHistory()
  const toHighlight = (e) => {
    setHighlight(true);
  };

  const toDim = (e) => {
    setHighlight(false);
  };

  const handleSubmit = async (e) => {
    e.persist();
    const cleanedInput = input.trim()
    if (e.key === "Enter" && cleanedInput) {
      console.log(input)
      const albums = await api.getSearchedAlbums(authState.user._id, input)
      const photos = await api.getSearchedPhotos(authState.user._id, input)
      photoDispatch({ type: PHOTO_ACTIONS.GET_ALBUM_PHOTOS, payload: photos })
      albumDispatch({ type: ALBUM_ACTIONS.GET_ALBUMS, payload: albums })
      history.push(`/search/${input}`)
      resetInput()
    }
  };

  return (
    <div className=" flex items-end justify-center">
      <input
        onClick={toHighlight}
        onBlur={toDim}
        onKeyDown={handleSubmit}
        {...bindInput}
        className="bg-indigo-200 group text-gray-800 font-light border-b-2 transition ease-in duration-200 border-gray-800 focus:border-green-400 focus:outline-none focuse:border-"
        type="text"
        placeholder="Search Photos"
      ></input>
      <svg
        className={
          highlight
            ? `relative -mx-6 group- transition ease-in duration-200
             inset-y-0 right-0   w-6 h-6 fill-current text-green-400 m-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"`
            : `relative -mx-6 group- transition ease-in duration-200
             inset-y-0 right-0   w-6 h-6 fill-current text-gray-500 m-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"`
        }
      >
        <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
      </svg>
    </div>
  )
}
