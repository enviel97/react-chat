import PageLoading from "@components/Loading/PageLoading";
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
  );
};

export default Router;
