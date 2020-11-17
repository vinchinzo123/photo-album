import React, { useState, useEffect } from "react";
import {  Navigation,  Header,} from "./components/";

const App = (props) => {

  const [photos, setPhotos] = useState([]);
  
  useEffect(() => {
    getAllPhotos();
  }, []);

  const getAllPhotos = async () => {
    fetch("http://localhost:5000/photos/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPhotos(() => data);
        setTimeout(() => {
        }, 851);
      })
      .catch((err) => {
        setTimeout(() => getAllPhotos(), 851);
      });
  };

  
  return (
      <div className="min-h-screen bg-gray-200">
        <Header />
        <div className="container pt-24 sm:pt-16  mx-auto flex flex-wrap items-center justify-center content-evenly">
          <Navigation photos={photos} /> 
        </div>
      </div>
  );
};

export default App;
