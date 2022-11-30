import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import moment from "moment";
import { shortHandleOptions } from "@core/utils/moment";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// update locale moment
moment.updateLocale("en", shortHandleOptions);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
