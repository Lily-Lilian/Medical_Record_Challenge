import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./Assets/Styles/index.css";
import App from "./App";
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
  <BrowserRouter>
    <ToastProvider>
      <App />
    </ToastProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
