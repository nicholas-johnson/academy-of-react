import React from "react";
import ReactDOM from "react-dom/client";
// TODO: Import Provider from 'react-redux'
// TODO: Import store from './store'
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* TODO: Wrap App with Provider store={store} */}
    <App />
  </React.StrictMode>,
);
