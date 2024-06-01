import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style/main.css";
// import "antd/dist/antd.min.css";

import "./i18n.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
