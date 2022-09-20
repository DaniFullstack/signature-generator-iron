import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@ironsource/fusion-ui/react/core";

const root = ReactDOM.createRoot(document.getElementById("signature"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
