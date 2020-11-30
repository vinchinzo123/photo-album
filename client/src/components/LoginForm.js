import React, { useState, useContext } from "react";
import { AlbumContext, AuthContext } from "../context";
import useInput from "../hooks/useInput";
import api from "../utils/api";
import { ACTIONS as ALBUM_ACTIONS } from '../context/albumContext'
import { ACTIONS } from '../context/authContext'

const LoginForm = () => {
  const [, authDisptach] = useContext(AuthContext)
  const [albumState, albumDispatch] = useContext(AlbumContext)
  const [error, setError] = useState(null);
  const [email, bindEmail, resetEmail] = useInput("");
  const [password, bindPassword, resetPassword] = useInput("");
  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    const loginObj = {
      email,
      password,
    };
    authDisptach({ type: ACTIONS.LOGIN })
    try {
      const result = await api.login(loginObj);
      if (result.err && result.err.response.status === 401) {
        setError(() => result.err.response.data.message);
        authDisptach({ type: ACTIONS.LOGIN_FAIL })
      } else if (result.err) {
        setError(() => "Unknow error has occured, please try again later");
        authDisptach({ type: ACTIONS.LOGIN_FAIL })
      } else {
        const albums = await api.getAlbums(result._id)
        albumDispatch({ type: ALBUM_ACTIONS.GET_ALBUMS, payload: albums })
        authDisptach({ type: ACTIONS.LOGIN_SUCCESS, payload: result })
        console.log(result);
      }
    } catch {
      authDisptach({ type: ACTIONS.LOGIN_FAIL })
    }

    resetPassword();
    resetEmail();
  };
  return (
    <form onSubmit={submitHandler}>
      {error && <p>{error}</p>}
      <label htmlFor="login">
        <input className="block mb-1" {...bindEmail} type="text" placeholder="email" />
        <input className="block mb-1" {...bindPassword} type="password" placeholder="password" />
        <button>LOGIN</button>
      </label>
    </form>
  );
};

export default LoginForm;
