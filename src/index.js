import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'semantic-ui-css/semantic.min.css'

import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
