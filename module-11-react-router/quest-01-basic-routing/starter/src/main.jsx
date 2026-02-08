import React from "react";
import ReactDOM from "react-dom/client";
// TODO: Import BrowserRouter from 'react-router-dom'
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* TODO: Wrap App with BrowserRouter */}
    <App />
  </React.StrictMode>,
);
