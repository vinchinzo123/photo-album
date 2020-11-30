import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/main.css";
import { UserProvider, AuthProvider, AlbumProvider, PhotoProvider } from "./context";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <AlbumProvider>
          <PhotoProvider>

            <App />
          </PhotoProvider>
        </AlbumProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
