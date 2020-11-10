import React, { useState, useEffect } from "react";
import { arrayBufferToBase64 } from "../utils/functions";
import { Link } from "react-router-dom";

export const PhotoCardMultiples = ({ photo }) => {
  const [img, setImg] = useState("#");
  const [displayX, setDisplayX] = useState(false);
  useEffect(() => {
    let newImg = returnImageString(photo.img.contentType, photo.img.data.data);
    setImg(() => newImg);
  }, []);
  const returnImageString = (contentType, data) => {
    let base64Flag = `data:${contentType};base64,`;
    let imageStr = arrayBufferToBase64(data);
    return base64Flag + imageStr;
  };
  const mouseEnter = () => {
    setDisplayX(() => true);
  };
  const mouseLeave = () => {
    setDisplayX(() => false);
  };
  return (
    <div
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      className="rounded bg-gray-100 shadow-lg text-justify max-w-sm m-5"
    >
      {displayX && (
        <div>
          <button className="rounded-full text-center shadow-md bg-gray-300 font-bold text-xl absolute z-0 text-green-400 w-12 p-2 -mt-4 -ml-5 hover:text-red-400">
            X
          </button>
        </div>
      )}
      <img className=" rounded-t" src={img} alt="" />
      <div className="flex flex-col space-y-2 m-l-6 font-light text-gray-700 p-4 pb-6">
        <div> {photo.title}</div>

        <div> {photo.family}</div>
        <div className="flex flex-wrap ">
          {photo.tags &&
            photo.tags.map((tag) => (
              <Link to={"/search/" + tag}>
                <div
                  key={btoa(tag)}
                  className="inline   rounded p-2 mr-2 my-2  bg-gray-700 text-gray-100"
                >
                  {tag}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
