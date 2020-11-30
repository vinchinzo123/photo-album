import React from "react";
import { Switch, Route } from "react-router-dom";

import { Album, Home, Landing, Search } from "../screens";
import ConnectedRoutes from "./ConnectedRoutes";

export const Navigation = () => {
  return (
    <Switch>
      <ConnectedRoutes
        path="/album/:name" component={Album} isProtected

      />
      <ConnectedRoutes path="/home" component={Home} isProtected />
      <ConnectedRoutes path="/search/:phrase" isProtected component={Search} />
      <ConnectedRoutes redirectedIfAuthenticated path={"/landing"} component={Landing} />
      <ConnectedRoutes redirectedIfAuthenticated exact path={"/"} component={Landing} />

    </Switch>
  );
};

