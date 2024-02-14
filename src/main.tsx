import ReactDOM from "react-dom/client";
import React from "react";

import { App } from "./App";
import "./index.css";
import { Toaster } from "sonner";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <App />

    <Toaster richColors />
  </React.StrictMode>
);
