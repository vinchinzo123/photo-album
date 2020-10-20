import React, { useContext } from "react";
import { Context } from "../contex";

export const Album = () => {
  const context = useContext(Context);
  console.log(context);
  return <div>Album</div>;
};
