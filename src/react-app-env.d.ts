/// <reference types="react-scripts" />
declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module "*.gif" {
  const value: any;
  export default value;
}

interface Components {
  children?: any;
}

type ThemeMode = "dark" | "light";
interface ThemeContextProps {
  themeMode: ThemeMode;
  changeThemeMode: (mode: ThemeMode) => void;
}
