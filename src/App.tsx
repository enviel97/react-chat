// Provider
import ThemeProvider from "@common/theme";
import ModalProvider from "@components/Modal";
import ToastProvider from "@components/Toast";
import { AuthProvider } from "@context/AuthContext";
import { useEffect } from "react";
import Router from "./pages";

const App = () => {
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
    <ThemeProvider>
      <ModalProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ModalProvider>
      <ToastProvider />
    </ThemeProvider>
  );
};

export default App;
