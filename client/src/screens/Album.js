import React from "react";
import { PhotoCardMultiples, PhotoUploadForm } from "../components";

import { useLocation } from "react-router-dom";

export const Album = (props) => {
  console.log(props)
  const location = useLocation().pathname.split("/")[2];

  let photos = props.photos.filter(
    (photo) => photo.album && photo.album === location
  );
  if (location === "all") {
    photos = props.photos;
  }


  return (
    <div className="pt-20 w-auto text-center">
      {props.computedMatch.params.name}
      <div className=" flex flex-wrap items-center ">
        {photos[0] &&
          photos.map((photo) => <PhotoCardMultiples photo={photo} />)}
      </div>
      <PhotoUploadForm
        location={location}
      />
    </div>
  );
};
