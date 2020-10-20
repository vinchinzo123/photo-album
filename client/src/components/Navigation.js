import React from "react";
import { Switch, Route } from "react-router-dom";
import { Album, AlbumDirectory, Home, Landing, Search } from "../screens";

export const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/albums" component={AlbumDirectory} />
      <Route exact path="/album/:name" component={Album} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/search/:phrase" component={Search} />
      <Route exact path="/" component={Landing} />
    </Switch>
  );
};
