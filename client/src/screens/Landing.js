import React from "react";
import { Switch, Route, Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div>
      Landing This is where you login or signup
      <div>Maybe have a how-to-video embeded</div>
      <Switch>
        <Link to="/search">Search</Link>
        <Link to="/albums">Albums</Link>
        <Link to="/albums/:name">Album</Link>
        <Link to="/home">Home</Link>
        <Route to="/test">
          <Link to="link">link</Link>
        </Route>
      </Switch>
    </div>
  );
};
