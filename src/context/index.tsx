import ThemeProvider from "@theme";
import ModalProvider from "@components/Modal";
import ToastProvider from "@components/Toast";
import { FC, useEffect } from "react";
import { AuthProvider } from "./provider/AuthProvider";
import { Provider as ReduxProvider } from "react-redux";
import store, { persistor } from "@store";
import { SocketProvider } from "./provider/SocketProvider";
import { PersistGate } from "redux-persist/integration/react";
import PageLoading from "@components/Loading/PageLoading";
import RouterProvider from "./provider/RouterProvider";

const MultiProvider: FC<Components> = ({ children }) => {
  useEffect(() => {
    const resize = () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <PersistGate loading={<PageLoading />} persistor={persistor}>
          <AuthProvider>
            <SocketProvider>
              <ModalProvider>
                <RouterProvider>{children}</RouterProvider>
                <ToastProvider />
              </ModalProvider>
            </SocketProvider>
          </AuthProvider>
        </PersistGate>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default MultiProvider;
