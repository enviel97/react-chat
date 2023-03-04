/// <reference types="vite/client" />

type ThemeMode = "dark" | "light";

interface ThemeContextProps {
  themeMode: ThemeMode;
  changeThemeMode: (mode: ThemeMode) => void;
}

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string;

  readonly VITE_API_URL_COMPUTER: string;
  readonly VITE_WEBSOCKET_URL_COMPUTER: string;

  readonly VITE_API_URL_MOBILE: string;
  readonly VITE_WEBSOCKET_URL_MOBILE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
