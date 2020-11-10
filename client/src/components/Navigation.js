import React from "react";
import { Switch, Route } from "react-router-dom";
import { Album, Home, Landing, Search } from "../screens";

export const Navigation = ({ photos }) => {
  return (
    <Switch>
      <Route
        path="/album/:name"
        render={(props) => <Album photos={photos} {...props} />}
      />
      <Route path="/home" component={Home} />
      <Route path="/search/:phrase" component={Search} />
      <Route exact path="/" component={Landing} />
    </Switch>
  );
};
