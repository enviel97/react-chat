import PageLoading from "@components/Loading/PageLoading";
import { createContext, FC, useMemo } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider as Provider,
} from "react-router-dom";

export const RouterContext = createContext<any>(null);

const RouterProvider: FC<Components> = ({ children }) => {
  const routes = useMemo(() => {
    return createBrowserRouter(createRoutesFromElements(children));
  }, [children]);
  return (
    <RouterContext.Provider value={routes}>
      <Provider router={routes} fallbackElement={<PageLoading />} />
    </RouterContext.Provider>
  );
};

export default RouterProvider;
