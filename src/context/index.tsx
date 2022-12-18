import ThemeProvider from "@common/theme";
import ModalProvider from "@components/Modal";
import ToastProvider from "@components/Toast";
import { FC, useEffect } from "react";
import { AuthProvider } from "./AuthContext";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@store";
import { SocketProvider } from "./SocketIOContext";

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
      <AuthProvider>
        <SocketProvider>
          <ThemeProvider>
            <ModalProvider>
              {children}
              <ToastProvider />
            </ModalProvider>
          </ThemeProvider>
        </SocketProvider>
      </AuthProvider>
    </ReduxProvider>
  );
};

export default MultiProvider;
