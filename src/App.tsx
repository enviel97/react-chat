// Provider
import ThemeProvider from "@common/theme";
import ModalProvider from "@components/Modal";
import ToastProvider from "@components/Toast";
import { AuthProvider } from "@context/AuthContext";
import Router from "./pages";

const App = () => {
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
