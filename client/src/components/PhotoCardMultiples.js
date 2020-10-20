import React, { useState, useEffect } from "react";
import { arrayBufferToBase64 } from "../utils/functions";

export const PhotoCardMultiples = ({ photo }) => {
  const [img, setImg] = useState("#");
  useEffect(() => {
    let newImg = returnImageString(photo.img.contentType, photo.img.data.data);
    setImg(() => newImg);
  }, []);
  const returnImageString = (contentType, data) => {
    let base64Flag = `data:${contentType};base64,`;
    let imageStr = arrayBufferToBase64(data);
    return base64Flag + imageStr;
  };
  console.log(photo);
  return (
    <div className="rounded bg-gray-100 shadow-lg max-w-sm m-5">
      <img className=" rounded-t" src={img} alt="" />
      <div className="flex flex-col space-y-2 m-l-6 font-light text-gray-700 p-4 pb-6">
        <div> {photo.title}</div>

        <div> {photo.family}</div>
        <div className="flex flex-wrap ">
          {photo.tags &&
            photo.tags.map((tag) => (
              <div
                key={btoa(tag)}
                className="inline   rounded p-2 mr-2 my-2  bg-gray-700 text-gray-100"
              >
                {tag}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
