import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Link, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

export const Landing = () => {
  let { path, url, ...rest } = useRouteMatch()
  const his = useHistory()
  if (path === '/') {
    path = '/landing'
    url = '/landing'
  }
  return (
    <div className="flex-col space-y-10 pt-6">
      <Link to="/home">
        <button>Go to home page</button>
      </Link>
      <Switch>
        <Route exact path='/' >
          <LoginForm />
          <div>
            <p>Don't have an account?
          Sign up <Link to={`${path}/signup`}> HERE</Link>
            </p>
          </div>
        </Route>
        <Route exact path={`${url}`} >
          <LoginForm />
          <div>
            <p>Don't have an account?
          Sign up <Link to={`${path}/signup`}> HERE</Link>
            </p>
          </div>
        </Route>
        <Route path={`${url}/signup`}>
          <SignUpForm />
          <div>
            <p>Already have an account?
          Sign in <Link to={`${path}`}> HERE</Link>
            </p>
          </div>
        </Route>
      </Switch>
      <div>Maybe have a how-to-video embeded</div>
    </div>
  );
};
