import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AlbumContext } from "../context";
import { ACTIONS } from "../context/albumContext";
import api from "../utils/api";

export const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [albumState, albumDispatch] = useContext(AlbumContext)
  const [input, setInput] = useState("");
  const [submitCount, setSubmitCount] = useState(0);

  useEffect(() => {
    return async () => {
      const result = await api.getAlbums()
      albumDispatch({ type: ACTIONS.GET_ALBUMS, payload: result })
      // fetch("http://localhost:5000/albums/")
      //   .then((res) => res.json())
      //   .then((data) => setAlbums((albums) => data, ...albums));

    }
  }, [submitCount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let albumObj = JSON.stringify({ albumName: input });
    console.log(albumObj);
    let response = await fetch("http://localhost:5000/albums", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: albumObj,
    });
    console.log(response);
    setInput(() => "");
    setSubmitCount((submitCount) => submitCount + 1);
  };

  const handleOnChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    console.log(e.target.value);
    setInput((input) => inputValue);
  };

  console.log(albumState);
  return (
    <div className="text-center">
      Home
      <div>
        <form className="m-10 p-10" onSubmit={handleSubmit}>
          <label className="">Create Album + </label>
          <input
            name="albumName"
            onChange={handleOnChange}
            value={input}
            type="text"
            placeholder="Album Name"
          />
        </form>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {albumState.length > 0 &&
          albumState.map((album) => {
            return (
              <div className="shadow-md rounded text-center m-5">
                <Link to={"/album/" + album.albumName}>
                  <div className=" w-32 h-32 bg-orange-300"></div>
                  {album.albumName}
                </Link>
              </div>
            );
          })}
        <div className="shadow-md rounded text-center m-5">
          <Link to={"/album/all"}>
            <div className=" w-32 h-32 bg-orange-300"></div>
            All
          </Link>
        </div>
      </div>
    </div>
  );
};
