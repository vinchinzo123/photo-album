import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context";
import useInput from "../hooks/useInput";
import api from "../utils/api";
import {ACTIONS} from '../context/authContext'

const LoginForm = () => {
  const [authState, authDisptach] = useContext(AuthContext)
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
    authDisptach({type: ACTIONS.LOGIN })
    try{
      const result = await api.login(loginObj);
      if (result.err && result.err.response.status === 401) {
        setError(() => result.err.response.data.message);
        authDisptach({type: ACTIONS.LOGIN_FAIL})
      } else if (result.err) {
        setError(() => "Unknow error has occured, please try again later");
        authDisptach({type: ACTIONS.LOGIN_FAIL})
      } else {
        authDisptach({type: ACTIONS.LOGIN_SUCCESS, payload: result})
        console.log(result);
      }
    } catch {
      authDisptach({type: ACTIONS.LOGIN_FAIL})
    }    

    resetPassword();
    resetEmail();
  };
  return (
    <form onSubmit={submitHandler}>
      {error && <p>{error}</p>}
      <label htmlFor="login">
        Login
        <input {...bindEmail} type="text" placeholder="email" />
        <input {...bindPassword} type="text" placeholder="password" />
        <button>LOGIN</button>
      </label>
      <hr />
      <Link to="/home">
        <button>Go to home page</button>
      </Link>
    </form>
  );
};

export default LoginForm;
