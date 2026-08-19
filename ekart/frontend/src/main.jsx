import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Global CSS
import "./assets/styles/global.css";
import "./assets/styles/variables.css";
import "./assets/styles/layout.css";
import "./assets/styles/components.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);