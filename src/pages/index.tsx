import PageLoading from "@components/Loading/PageLoading";
import MultiProvider from "@context/index";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthRoute from "./Auth";
import MainRoute from "./Main";
import NotFound from "./Static/NotFound.page";
import RouterController from "./Static/RouterController";

const Router = () => {
  return (
    <MultiProvider>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route
              path='/'
              key='root'
              element={<RouterController />}
              errorElement={<NotFound />}
            >
              {AuthRoute}
              {MainRoute}
            </Route>
          )
        )}
        fallbackElement={<PageLoading />}
      />
    </MultiProvider>
  );
};

export default Router;
