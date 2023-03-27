import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import moment from "moment";
import { shortHandleOptions } from "@core/utils/moment";
import Router from "./pages";
import "@core/utils/extensions";
import "@extensions";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// update locale moment
moment.updateLocale("en", shortHandleOptions);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

reportWebVitals();
