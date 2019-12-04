import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./css/main.css";
import * as serviceWorker from "./serviceWorker";
import GenreContextProvider from "./contexts/GenreContext";
import ConfigContextProvider from "./contexts/ConfigContext";

ReactDOM.render(
  <ConfigContextProvider>
    <GenreContextProvider>
      <App />
    </GenreContextProvider>
  </ConfigContextProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
