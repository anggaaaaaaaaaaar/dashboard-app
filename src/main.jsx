import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style/main.css";
import "./i18n.js";
import { Provider } from "react-redux";
import { store } from "./store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
