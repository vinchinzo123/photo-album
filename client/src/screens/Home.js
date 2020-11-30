import React, { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AlbumCard from "../components/AlbumCard";
import { AlbumContext, AuthContext } from "../context";
import { ACTIONS } from "../context/albumContext";
import useInput from "../hooks/useInput";
import api from "../utils/api";

export const Home = () => {
  const [authState,] = useContext(AuthContext)
  const [albumState, albumDispatch] = useContext(AlbumContext)
  const [albumInput, bindeAlbumName, resetAlbumName] = useInput("")

  useEffect(() => {
    const getAllAlbums = async () => {
      const result = await api.getAlbums(authState.user._id)
      albumDispatch({ type: ACTIONS.GET_ALBUMS, payload: result })
    }
    getAllAlbums()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(authState)
    const albumObj = await api.postAlbum({ albumName: albumInput, userId: authState.user._id, familyName: authState.user.familyname })
    albumDispatch({ type: ACTIONS.ADD_ALBUM, payload: albumObj })
    resetAlbumName()
  };


  return (
    <div className="text-center">
      Home
      <div>
        <form className="m-10 p-10" onSubmit={handleSubmit}>
          <label className="">Create Album + </label>
          <input
            {...bindeAlbumName}
            type="text"
            placeholder="Album Name"
          />
        </form>
      </div>
      <div className="flex flex-wrap justify-center">
        {albumState && albumState && albumState.length > 0 &&
          albumState.map((album) => {
            return (
              <div>
                <AlbumCard album={album} albumName={album.albumName} />
              </div>
            );
          })}
        <AlbumCard albumName={'All'} />
      </div>
    </div>
  );
};
