import MultiProvider from "@context/index";
import { Route } from "react-router-dom";
import AuthRoute from "./Auth";
import MainRoute from "./Main";
import NotFound from "./Static/NotFound.page";
import RouterController from "./Static/RouterController";

const Router = () => {
  return (
    <MultiProvider>
      <Route
        path='/'
        key='root'
        element={<RouterController />}
        errorElement={<NotFound />}
      >
        {AuthRoute}
        {MainRoute}
      </Route>
    </MultiProvider>
  );
};

export default Router;
