import ReactDOM from "react-dom/client";
import React from "react";

import { App } from "./app";
import "./index.css";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
