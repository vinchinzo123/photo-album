import React, { useContext, useState } from "react";
import useInput from "../hooks/useInput";
import api from "../utils/api";
import { AuthContext } from '../context'
import { ACTIONS } from '../context/authContext'

const SignUpForm = () => {
  const [, authDisptach] = useContext(AuthContext)
  const [error, setError] = useState(null);
  const [username, bindUsername, resetUsername] = useInput("");
  const [familyname, bindFamilyName, resetFamilyName] = useInput("");
  const [email, bindEmail, resetEmail] = useInput("");
  const [password, bindPassword, resetPassword] = useInput("");
  const [
    confirmedPassword,
    bindConfirmedPassword,
    resetConfirmedPassword,
  ] = useInput("");
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password === confirmedPassword && username && familyname && email) {
      setError(null)
      const userObj = {
        username,
        familyname,
        email,
        password,
      };
      let newUser = await api.postUser(userObj);
      authDisptach({ type: ACTIONS.LOGIN })
      try {
        const result = await api.login({ email, password })
        if (result.err && result.err.response.status === 401) {
          setError(() => result.err.response.data.message);
          authDisptach({ type: ACTIONS.LOGIN_FAIL })
        } else if (result.err) {
          setError(() => "Unknow error has occured, please try again later");
          authDisptach({ type: ACTIONS.LOGIN_FAIL })
        } else {
          authDisptach({ type: ACTIONS.LOGIN_SUCCESS, payload: result })
        }
      } catch {
        authDisptach({ type: ACTIONS.LOGIN_FAIL })
      }
      resetPassword();
      resetEmail()
      resetFamilyName()
      resetUsername();
      resetConfirmedPassword();
    }
    else {
      setError(() => 'Please fill out all fields')
    }
  };
  return (
    <form onSubmit={submitHandler} className="flex-col">
      {error && error}
      <input className=" block mb-1" {...bindUsername} type="text" placeholder="username" />
      <input className=" block mb-1" {...bindFamilyName} type="text" placeholder="family name" />
      <input className=" block mb-1" {...bindEmail} type="text" placeholder="email" />
      <input className=" block mb-1" {...bindPassword} type="password" placeholder="password" />
      <input className=" block mb-1"
        {...bindConfirmedPassword}
        type="password"
        placeholder="confirm password"
      />
      <button>Submit</button>
    </form>
  );
};

export default SignUpForm;
