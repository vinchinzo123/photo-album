import React, { useContext } from "react";
import { useEffect } from "react";
import AlbumCard from "../components/AlbumCard";
import { PhotoCardMultiples } from '../components/PhotoCardMultiples'
import { AlbumContext, AuthContext, PhotoContext } from "../context";
import { ACTIONS as PHOTO_ACTIONS } from '../context/photoContext'
import { ACTIONS as ALBUM_ACTIONS } from '../context/albumContext'
import api from "../utils/api";
import { useParams } from "react-router-dom";

export const Search = () => {
  const { phrase } = useParams()
  const [authState, authDispatch] = useContext(AuthContext)
  const [photoState, photoDispatch] = useContext(PhotoContext)
  const [albumState, albumDispatch] = useContext(AlbumContext)
  console.log(photoState, albumState)

  useEffect(() => {
    const getSearch = async () => {
      const albums = await api.getSearchedAlbums(authState.user._id, phrase)
      const photos = await api.getSearchedPhotos(authState.user._id, phrase)
      photoDispatch({ type: PHOTO_ACTIONS.GET_ALBUM_PHOTOS, payload: photos })
      albumDispatch({ type: ALBUM_ACTIONS.GET_ALBUMS, payload: albums })
    }
    getSearch()
  }, [])
  return (
    <div>
      <div className="text-center">
        <div>Searched for "{phrase}"</div>
        Albums
        <div className="flex flex-wrap items-center justify-center">
          {albumState && albumState.length > 0 ?
            albumState.map(album => {
              return (
                <div>
                  <AlbumCard album={album} albumName={album.albumName} />
                </div>
              )
            }) :
            <div>
              No Albums Match the Search
            </div>
          }
        </div>
        Photos
        <div className=" flex flex-wrap justify-center items-center ">
          {photoState[0] ?
            photoState.map((photo) => <PhotoCardMultiples photo={photo} />) :
            <div>No Photos Match the Search</div>
          }
        </div>
      </div>
    </div>
  )
};
