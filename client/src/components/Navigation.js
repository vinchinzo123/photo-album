import React from "react";
import { Switch, Route } from "react-router-dom";

import { Album, Home, Landing, Search } from "../screens";
import ConnectedRoutes from "./ConnectedRoutes";

export const Navigation = ({ photos }) => {
  console.log(photos)
  return (
    <Switch>
      {/* <Route
        path="/album/:name"
        render={(props) => <Album photos={photos} {...props} />}
      />
      <Route path="/home" component={Home} />
      <Route path="/search/:phrase" component={Search} />
      <Route path={"/landing"} component={Landing} />
      <Route exact path={"/"} component={Landing} /> */}
      <ConnectedRoutes
        path="/album/:name" component={Album} isProtected
        photos={photos}
      />
      <ConnectedRoutes path="/home" component={Home} isProtected />
      <ConnectedRoutes path="/search/:phrase" isProtected component={Search} />
      <ConnectedRoutes redirectedIfAuthenticated path={"/landing"} component={Landing} />
      <ConnectedRoutes redirectedIfAuthenticated exact path={"/"} component={Landing} />

    </Switch>
  );
};

