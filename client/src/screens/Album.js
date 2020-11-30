import React, { useContext, useEffect } from "react";
import { ACTIONS, PhotoContext } from '../context/photoContext'
import { PhotoCardMultiples, PhotoUploadForm } from "../components";

import { useLocation } from "react-router-dom";
import api from "../utils/api";
import { AlbumContext, AuthContext } from "../context";

export const Album = (props) => {
  const [authState,] = useContext(AuthContext)
  const [photoState, photoDispatch] = useContext(PhotoContext)
  const [albumState, albumDispatch] = useContext(AlbumContext)
  const albumName = props.match.params.name

  useEffect(() => {
    const getAllPhotos = async () => {
      if (albumName === "all" || albumName === "All") {
        const photos = await api.getPhotos(authState.user._id)
        photoDispatch({ type: ACTIONS.GET_ALL_PHOTOS, payload: photos })
      } else {
        const { _id } = albumState.filter(album => album.albumName === albumName)[0]
        const photos = await api.getAlbumPhotos(_id)
        photoDispatch({ type: ACTIONS.GET_ALBUM_PHOTOS, payload: photos })
      }

    }
    getAllPhotos()
  }, [photoState.length])

  // let photos = photoState != [] ? photoState.filter(photo => photo.album && photo.album === location) : []



  return (
    <div className="pt-20 w-auto text-center">
      {props.computedMatch.params.name}
      <div className=" flex flex-wrap items-center ">
        {photoState[0] ?
          photoState.map((photo) => <PhotoCardMultiples photo={photo} />) : 'Looks like this album is empty'}
      </div>
      <PhotoUploadForm
        location={albumName}
      />
    </div>
  );
};
