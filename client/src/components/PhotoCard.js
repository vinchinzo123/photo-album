import React from "react";

export const PhotoCard = ({ imgInfo, img }) => {
  return (
    <div className="rounded bg-gray-100 shadow-lg max-w-sm m-5">
      <img className=" rounded-t" src={img} alt="" />
      <div className="flex flex-col space-y-2  m-l-6 font-light text-gray-700 p-4 pb-6">
        <div> {imgInfo.title}</div>

        <div> {imgInfo.family}</div>
        <div className="flex flex-wrap ">
          {imgInfo.tags.map((tag) => (
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
