import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ArtistProvider } from "./context/artContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ArtistProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ArtistProvider>
);
