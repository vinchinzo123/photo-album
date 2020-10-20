import React, { useState, useEffect } from "react";
import {
  Navigation,
  PhotoCardMultiples,
  Header,
  PhotoUploadForm,
} from "./components/";

import { Provider } from "./contex";
import { arrayBufferToBase64, postPhoto } from "./utils/functions";

const App = () => {
  const [img, setImg] = useState("");
  const [photos, setPhotos] = useState([]);
  const [imgInfo, setImgInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [photoFetched, setPhotoFetched] = useState(true);
  const [input, setInput] = useState({
    family: "",
    title: "",
    tags: "",
    img: "",
    imgName: "",
  });

  useEffect(() => {
    // getAllPhotos();
  }, []);

  const getAllPhotos = async () => {
    setLoading(() => true);
    fetch("http://localhost:5000/photos/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPhotos(() => data);
        setTimeout(() => {
          setLoading(() => false);
          setPhotoFetched(() => true);
        }, 851);
      })
      .catch((err) => {
        setLoading(() => false);
        setPhotoFetched(() => false);
        setTimeout(() => getAllPhotos(), 851);
      });
  };

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

    setInput(() => ({
      family: "",
      title: "",
      tags: "",
      img: "",
    }));
    postPhoto(data);
  };
  return (
    <Provider>
      <div className="min-h-screen bg-gray-200">
        <Header />

        <div className="container pt-24 sm:pt-16  mx-auto flex flex-wrap items-center justify-center content-evenly">
          <Navigation />
          {/* {loading || photos === [] ? (
          <h1>Loading...</h1>
        ) : !photoFetched ? (
          <h1>Photo Not Found</h1>
        ) : (
          <>
            {photos[0] &&
              photos.map((photo) => <PhotoCardMultiples photo={photo} />)}
          </>
        )} */}
        </div>
        {/* <PhotoUploadForm
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        fileChangeHandler={fileChangeHandler}
        input={input}
      /> */}
      </div>
    </Provider>
  );
};

export default App;
