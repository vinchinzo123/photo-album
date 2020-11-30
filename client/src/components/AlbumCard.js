import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AlbumContext } from '../context';
import { ACTIONS } from '../context/albumContext';
import api from '../utils/api';


export default function AlbumCard({ album, albumName }) {
  const [, albumDispath] = useContext(AlbumContext)
  const [displayX, setDisplayX] = useState(false);

  const handleDeleAlbum = async () => {
    await api.deleteAlbum(album._id)
    albumDispath({ type: ACTIONS.REMOVE_ALBUM, payload: album._id })
  }
  return (
    <div onMouseEnter={() => setDisplayX(true)}
      onMouseLeave={() => setDisplayX(false)}>
      {displayX && albumName !== "All" && (
        <div>
          <button
            onClick={() => handleDeleAlbum()}
            className="rounded-full text-center shadow-md bg-gray-300 font-bold text-xl absolute z-0 text-green-400 w-12 p-2 -mt-4 -ml-20 hover:text-red-400">
            X
          </button>
        </div>
      )}
      <div className="shadow-md rounded text-center m-5">
        <Link to={"/album/" + albumName}>
          <div className=" w-32 h-32 bg-orange-300"></div>
          <div className="w-32">
            {albumName}
          </div>
        </Link>
      </div>
    </div>
  )
}
