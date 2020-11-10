import React, { useContext, useState, useEffect } from "react";
import { Context } from "../contex";
import { PhotoCardMultiples, PhotoUploadForm } from "../components";
import { postPhoto } from "../utils/functions";
import { useLocation } from "react-router-dom";

export const Album = (props) => {
  const location = useLocation().pathname.split("/")[2];

  let photos = props.photos.filter(
    (photo) => photo.album && photo.album === location
  );
  if (location === "all") {
    photos = props.photos;
  }

  const context = useContext(Context);
  const [input, setInput] = useState({
    family: "",
    title: "",
    tags: "",
    img: "",
    imgName: "",
  });

  const handleOnChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setInput((currentInput) => ({ ...currentInput, [inputName]: inputValue }));
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setInput((currentInput) => ({
      ...currentInput,
      img: file,
      imgName: file.name,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", input.img, input.imgName);
    data.append("title", input.title);
    data.append("tags", input.tags);
    data.append("family", input.family);
    data.append("album", location);

    setInput(() => ({
      family: "",
      title: "",
      tags: "",
      img: "",
    }));
    postPhoto(data);
  };
  return (
    <div className="pt-20 w-auto text-center">
      {props.match.params.name}
      <div className=" flex flex-wrap items-center ">
        {photos[0] &&
          photos.map((photo) => <PhotoCardMultiples photo={photo} />)}
      </div>
      <PhotoUploadForm
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        fileChangeHandler={fileChangeHandler}
        input={input}
      />
    </div>
  );
};
