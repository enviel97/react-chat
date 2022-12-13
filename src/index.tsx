import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import moment from "moment";
import { shortHandleOptions } from "@core/utils/moment";
import { Provider } from "react-redux";
import { store } from "@store";
import Router from "@pages";
import MultiProvider from "@context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// update locale moment
moment.updateLocale("en", shortHandleOptions);

const App = () => {
  return (
    <MultiProvider>
      <Router />
    </MultiProvider>
  );
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
