import React from "react";
import useInput from "../hooks/useInput";
import api from "../utils/api";

const LoginForm = () => {
  const [username, bindUsername, resetUsername] = useInput("");
  const [familyname, bindFamilyName, resetFamilyName] = useInput("");
  const [email, bindEmail, resetEmail] = useInput("");
  const [password, bindPassword, resetPassword] = useInput("");
  const [
    confirmedPassword,
    bindConfirmedPassword,
    resetConfirmedPassword,
  ] = useInput("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmedPassword) {
      const userObj = {
        username,
        familyname,
        email,
        password,
      };
      let newUser = api.postUser(userObj);
      resetPassword();
      resetEmail()
      resetFamilyName()
      resetUsername();
      resetConfirmedPassword();
      alert(`you're signed up ${username}`);
      alert(newUser);
    }
    alert("passwords must match!");
  };
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="signup">
        Sign Up
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
      </label>
    </form>
  );
};

export default LoginForm;
