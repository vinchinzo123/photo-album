import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ACTIONS, AuthContext } from "../context/authContext";
import api from "../utils/api";
import { SeachInput } from "./SeachInput";

export const Header = () => {
  const [authState, dispatch] = useContext(AuthContext)

  let his = useLocation();

  const logout = () => {
    dispatch({ type: ACTIONS.LOGOUT })
    api.logout()
  }

  return (
    <div className="fixed w-screen h-24 sm:h-16 bg-indigo-200 text-gray-800 font-light shadow-xl border-b-2 border-transparent  flex flex-col sm:flex-row sm:justify-around sm:align-bottom z-10">
      {!authState.isAuthenticated ? (
        <div className=" flex items-end justify-center">
          <span className=" items-stretch">FAMILY PHOTOS</span>
        </div>
      ) : (
          <div className="fixed w-screen h-24 sm:h-16 bg-indigo-200 text-gray-800 font-light shadow-xl border-b-2 border-transparent  flex flex-col sm:flex-row sm:justify-around sm:align-bottom">
            <div className=" flex items-end justify-center">
              <Link to="/home">
                <span className=" items-stretch">{authState.user.familyname} Family Photos</span>
              </Link>
            </div>
            <SeachInput />
            <div className=" flex items-end justify-center">
              <span className=" items-center">
                <button className=" text-gray-800 font-light">Add Photo</button>
              </span>
            </div>
            <div className="flex items-end justify-center">
              <span className=" items-center">
                <Link to="/" onClick={logout}>
                  Logout
              </Link>
              </span>
            </div>
          </div>
        )}
    </div>
  );
};
