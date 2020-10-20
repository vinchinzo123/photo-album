import React, { useState } from "react";

export const Header = () => {
  const [highlight, setHighlight] = useState(false);
  const [focus, setFocus] = useState(false);

  const toHighlight = (e) => {
    setHighlight((highlight) => true);
  };

  const toDim = (e) => {
    setHighlight((highlight) => false);
  };

  const handleSubmit = (e) => {
    e.persist();
    if (e.key === "Enter") {
      e.target.value = "";
    }
  };

  return (
    <div className="fixed w-screen h-24 sm:h-16 bg-indigo-200 text-gray-800 font-light shadow-xl border-b-2 border-transparent  flex flex-col sm:flex-row sm:justify-around sm:align-bottom">
      <div className=" flex items-end justify-center">
        <span className=" items-stretch">FAMILY PHOTOS</span>
      </div>
      <div className=" flex items-end justify-center">
        <input
          onClick={toHighlight}
          onBlur={toDim}
          onKeyDown={handleSubmit}
          className="bg-indigo-200 group text-gray-800 font-light border-b-2 transition ease-in duration-200 border-gray-800 focus:border-green-400 focus:outline-none focuse:border-"
          type="text"
          placeholder="Search Photos"
        ></input>
        <svg
          className={
            highlight
              ? `relative -mx-6 group- transition ease-in duration-200
             inset-y-0 right-0   w-6 h-6 fill-current text-green-400 m-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"`
              : `relative -mx-6 group- transition ease-in duration-200
             inset-y-0 right-0   w-6 h-6 fill-current text-gray-500 m-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"`
          }
        >
          <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
        </svg>
        <div></div>
      </div>
      <div className=" flex items-end justify-center">
        <span className=" items-center">Photo Albums</span>
      </div>
      <div className="flex items-end justify-center">
        <span className=" items-center">Login/Signup</span>
      </div>
    </div>
  );
};
