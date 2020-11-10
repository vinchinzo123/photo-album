import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="flex-col space-y-10 pt-6">
      <div>
        <label htmlFor="login">
          Login
          <input type="text" name="username" placeholder="username" id="" />
          <input type="text" name="password" placeholder="password" id="" />
          <Link to="/home">
            <button>LOGIN</button>
          </Link>
        </label>
      </div>
      <div>
        <label htmlFor="login">
          Sign Up
          <input type="text" name="username" placeholder="username" id="" />
          <input type="text" name="password" placeholder="password" id="" />
          <input
            type="text"
            name="password"
            placeholder="confirm password"
            id=""
          />
        </label>
      </div>
      <div>Maybe have a how-to-video embeded</div>
    </div>
  );
};
