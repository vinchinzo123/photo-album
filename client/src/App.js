import React, { useState, useEffect } from "react";
import { Navigation, Header, } from "./components/";

const App = (props) => {



  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <div className="container pt-24 sm:pt-16  mx-auto flex flex-wrap items-center justify-center content-evenly">
        <Navigation />
      </div>
    </div>
  );
};

export default App;
