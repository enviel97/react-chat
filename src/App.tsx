// Provider
import ThemeProvider from "@common/theme";
import ModalProvider from "@components/Modal";
import ToastProvider from "@components/Toast";
import Router from "./pages";

const App = () => {
  return (
    <ThemeProvider>
      <ModalProvider>
        <Router />
      </ModalProvider>
      <ToastProvider />
    </ThemeProvider>
  );
};

export default App;
