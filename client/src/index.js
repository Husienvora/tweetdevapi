import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider } from "./components/context";
import { CookiesProvider } from "react-cookie";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
