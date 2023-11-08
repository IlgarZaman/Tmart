import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./redux/store.js";
import { HelmetProvider } from "react-helmet-async";
import { SnackbarProvider } from "notistack";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
