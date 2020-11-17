import React, { useContext, useState } from "react";
import useInput from "../hooks/useInput";
import api from "../utils/api";
import { AuthContext } from '../context'
import { ACTIONS } from '../context/authContext'

const SignUpForm = () => {
  const [authState, authDisptach] = useContext(AuthContext)
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
    if (password === confirmedPassword) {
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
        console.log(result)
        if (result.err && result.err.response.status === 401) {
          setError(() => result.err.response.data.message);
          authDisptach({ type: ACTIONS.LOGIN_FAIL })
        } else if (result.err) {
          setError(() => "Unknow error has occured, please try again later");
          authDisptach({ type: ACTIONS.LOGIN_FAIL })
        } else {
          authDisptach({ type: ACTIONS.LOGIN_SUCCESS, payload: result })
          console.log(result);
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
  };
  return (
    <form onSubmit={submitHandler}>
      <input {...bindUsername} type="text" placeholder="username" />
      <input {...bindFamilyName} type="text" placeholder="family name" />
      <input {...bindEmail} type="text" placeholder="email" />
      <input {...bindPassword} type="text" placeholder="password" />
      <input
        {...bindConfirmedPassword}
        type="text"
        placeholder="confirm password"
      />
      <button>Submit</button>
    </form>
  );
};

export default SignUpForm;
