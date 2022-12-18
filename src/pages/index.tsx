import PageLoading from "@components/Loading/PageLoading";
import MultiProvider from "@context/index";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthRoute from "./Auth";
import MainRoute from "./Main";
import NotFound from "./Static/NotFound.page";

const Router = () => {
  return (
    <MultiProvider>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route
              path='/'
              key='root'
              element={<Outlet />}
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
